import { getRedisClient } from '@/lib/redis';
import { NextResponse } from 'next/server';

// Função auxiliar para verificar o token com o Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY não configurada no servidor.');
    return false;
  }

  try {
    // Chama a API de verificação do Google
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const data = await response.json();

    // O Google retorna um 'score' de 0.0 (bot) a 1.0 (humano).
    // 0.5 é um bom limiar padrão.
    if (data.success && data.score >= 0.5) {
      return true; // É humano
    } else {
      console.warn('ReCAPTCHA falhou ou score baixo:', data);
      return false; // É bot
    }
  } catch (error) {
    console.error('Erro ao conectar com Google ReCAPTCHA:', error);
    return false;
  }
}

// --- NOVA FUNÇÃO AUXILIAR DE IP ---
function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown_ip';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Recebe o token do corpo
    const { slug, type, message, token } = body;

    if (!slug || !['like', 'dislike', 'message'].includes(type)) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }

    const redis = await getRedisClient();
    const keyPrefix = `feedback:${slug}`;

    // --- Verificação de IP para Likes/Dislikes ---
    if (type === 'like' || type === 'dislike') {
      const ip = getClientIp(request);

      // Se não conseguiu identificar o IP, permite o voto por segurança,
      // mas loga o ocorrido. (Raro na Vercel)
      if (ip === 'unknown_ip') {
        console.warn(
          'Não foi possível identificar IP do cliente para feedback.',
        );
      } else {
        // Chave de bloqueio única por post e por IP
        const lockKey = `vote_lock:${slug}:${ip}`;

        // Verifica se a chave já existe (se já votou recentemente)
        const alreadyVoted = await redis.exists(lockKey);

        if (alreadyVoted) {
          // Retorna erro 429 (Too Many Requests)
          return NextResponse.json(
            { error: 'Você já votou neste post recentemente.' },
            { status: 429 },
          );
        }

        // Se não votou, cria a trava.
        // 'EX: 86400' define a expiração para 24 horas (em segundos).
        // O valor '1' é irrelevante, só precisamos que a chave exista.
        await redis.set(lockKey, '1', { EX: 86400 });
      }
    }

    if (type === 'like') {
      await redis.incr(`${keyPrefix}:likes`);
    } else if (type === 'dislike') {
      await redis.incr(`${keyPrefix}:dislikes`);
    } else if (type === 'message' && message) {
      // ... (Lógica do reCAPTCHA e salvamento de mensagem) ...
      if (!token)
        return NextResponse.json({ error: 'Token ausente.' }, { status: 400 });
      const isHuman = await verifyRecaptcha(token);
      if (!isHuman)
        return NextResponse.json({ error: 'Bot detectado.' }, { status: 403 });

      const sanitizedMessage = message.trim().slice(0, 255);
      if (sanitizedMessage) {
        const timestamp = new Date().toISOString();
        await redis.rPush(
          `${keyPrefix}:messages`,
          JSON.stringify({
            at: timestamp,
            text: sanitizedMessage,
          }),
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro na API de Feedback:', error);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
