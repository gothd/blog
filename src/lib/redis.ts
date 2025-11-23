import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error('REDIS_URL não está definida nas variáveis de ambiente.');
}

// Padrão Singleton para evitar múltiplas conexões no hot-reload em desenvolvimento
declare global {
  var _redisClientPromise: Promise<ReturnType<typeof createClient>> | undefined;
}

let clientPromise: Promise<ReturnType<typeof createClient>>;

if (process.env.NODE_ENV === 'production') {
  // Em produção, cria um novo cliente normalmente
  const client = createClient({ url: redisUrl });
  client.on('error', (err) => console.error('Redis Client Error', err));
  clientPromise = client.connect().then(() => client);
} else {
  // Em desenvolvimento, usa a variável global para persistir a conexão
  if (!global._redisClientPromise) {
    const client = createClient({ url: redisUrl });
    client.on('error', (err) => console.error('Redis Client Error', err));
    global._redisClientPromise = client.connect().then(() => client);
  }
  clientPromise = global._redisClientPromise;
}

// Exporta uma função assíncrona para obter o cliente conectado
export async function getRedisClient() {
  return await clientPromise;
}
