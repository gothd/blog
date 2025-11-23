'use client';

import React, { useEffect, useState } from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

interface FeedbackWidgetProps {
  slug: string;
}

type FeedbackState =
  | 'idle'
  | 'voted_dislike'
  | 'sending_message'
  | 'sent_message'
  | 'error'
  | 'loading_storage';

const MAX_COMMENT_LENGTH = 255;

function FeedbackWidgetContent({ slug }: FeedbackWidgetProps): React.ReactNode {
  const [state, setState] = useState<FeedbackState>('loading_storage');
  const [message, setMessage] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const isSending = state === 'sending_message';
  const storageKey = `ruanhub_feedback_voted_${slug}`;

  useEffect(() => {
    const hasVoted = localStorage.getItem(storageKey);
    if (hasVoted) {
      // Se já votou, vai para a mensagem genérica final
      setState('sent_message');
    } else {
      setState('idle');
    }
  }, [slug, storageKey]);

  const markAsVotedLocally = () => {
    localStorage.setItem(storageKey, 'true');
  };

  const sendFeedback = async (
    type: 'like' | 'dislike' | 'message',
    text?: string,
    token?: string,
  ) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type, message: text, token }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Falha no envio');
      }
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      setState('error');
      throw error;
    }
  };

  const handleVote = (type: 'like' | 'dislike') => {
    sendFeedback(type)
      .then(() => {
        if (type === 'like') markAsVotedLocally();
      })
      .catch(() => setState('error'));

    if (type === 'like') {
      // Se for like, vai direto para o agradecimento genérico
      setState('sent_message');
    } else {
      // Se for dislike, continua indo para o fluxo de mensagem opcional
      setState('voted_dislike');
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    if (!executeRecaptcha) {
      console.warn('ReCAPTCHA ainda não carregou');
      return;
    }

    setState('sending_message');

    try {
      const token = await executeRecaptcha('submit_feedback');
      await sendFeedback('message', message, token);
      markAsVotedLocally();
      setState('sent_message');
    } catch (e) {
      console.error('Erro no fluxo de mensagem:', e);
      setState('error');
    }
  };

  const handleSkipMessage = () => {
    markAsVotedLocally();
    setState('sent_message');
  };

  // --- RENDERIZAÇÃO (UI) ---

  if (state === 'loading_storage') {
    return null;
  }

  // Estado Inicial (Botões 👍 / 👎)
  if (state === 'idle') {
    return (
      <div className="mt-12 flex flex-col items-center justify-center border-t border-hub-gray/10 pt-8 animate-in fade-in">
        <span className="mb-4 text-sm font-medium text-hub-gray uppercase tracking-wider">
          Este conteúdo foi útil?
        </span>
        <div className="flex gap-4">
          <button
            onClick={() => handleVote('like')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-hub-gray/20 text-2xl transition-all hover:scale-110 hover:border-hub-tech hover:bg-hub-tech/10"
            aria-label="Sim, foi útil"
          >
            👍
          </button>
          <button
            onClick={() => handleVote('dislike')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-hub-gray/20 text-2xl transition-all hover:scale-110 hover:border-hub-economy hover:bg-hub-economy/10"
            aria-label="Não foi útil"
          >
            👎
          </button>
        </div>
      </div>
    );
  }

  // Estado: Votou "Dislike" ou Enviando Mensagem (Textarea opcional)
  if (state === 'voted_dislike' || state === 'sending_message') {
    return (
      <div className="mt-12 border-t border-hub-gray/10 pt-8 animate-in fade-in max-w-md mx-auto">
        <p className="text-sm font-medium text-hub-dark mb-4 text-center">
          Que pena! O que posso melhorar? (Opcional)
        </p>
        <div className="relative">
          <textarea
            className="w-full p-3 rounded-lg border border-hub-gray/20 text-sm text-hub-dark focus:outline-none focus:border-hub-tech disabled:opacity-50 disabled:bg-hub-light"
            rows={3}
            placeholder="Sua opinião é privada e me ajuda muito..."
            value={message}
            maxLength={MAX_COMMENT_LENGTH}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSending}
          />
          <span className="absolute bottom-2 right-2 text-xs text-hub-gray/70 pointer-events-none">
            {message.length}/{MAX_COMMENT_LENGTH}
          </span>
        </div>

        <div className="mt-3 flex justify-end gap-3 items-center">
          <button
            onClick={handleSkipMessage}
            className="text-xs text-hub-gray hover:text-hub-dark underline disabled:opacity-50"
            disabled={isSending}
          >
            Prefiro não dizer
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isSending || !executeRecaptcha}
            className="rounded-lg bg-hub-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-hub-dark/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Enviando...' : 'Enviar Feedback Privado'}
          </button>
        </div>
      </div>
    );
  }

  // Estado: Erro
  if (state === 'error') {
    return (
      <div className="mt-12 flex flex-col items-center justify-center border-t border-hub-gray/10 pt-8 text-center animate-in fade-in text-hub-economy">
        <span className="text-xl mb-2">⚠️</span>
        <p className="text-sm font-medium">Não foi possível enviar.</p>
        <p className="text-xs opacity-80">Tente novamente mais tarde.</p>
      </div>
    );
  }

  // Estado Final Genérico: Mensagem enviada, pulada ou já votado (Like ou Dislike)
  return (
    <div className="mt-12 flex flex-col items-center justify-center border-t border-hub-gray/10 pt-8 text-center animate-in fade-in">
      {/* Mantive o emoji de agradecimento, mas poderia ser um ✨ ou ✅ */}
      <span className="text-xl mb-2">🙏</span>
      <p className="text-sm font-medium text-hub-dark">
        Obrigado pelo feedback!
      </p>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL (Wrapper do Provider) ---
export function FeedbackWidget(props: FeedbackWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'FeedbackWidget: NEXT_PUBLIC_RECAPTCHA_SITE_KEY não está definida. O widget será ocultado.',
      );
    }
    return null;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      <FeedbackWidgetContent {...props} />
    </GoogleReCaptchaProvider>
  );
}
