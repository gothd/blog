import { SITE_CONFIG } from '@/config/site';
import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import path from 'path';

export interface PostMetadata {
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  category: string; // Agora inferido da pasta, mas mantemos no tipo
  image?: string;

  // Dados de Venda
  price?: string;
  affiliateLink?: string;
  promoLabel?: string; // Para destaques como "43% OFF" ou "Oferta Amazon"
  affiliatePlatform?: string; // 'Amazon', 'Shopee', 'Site Oficial', etc.

  // Dados B2B
  affiliationLink?: string;
  isAuthorProduct?: boolean; // true se for produto seu
  commissionRate?: string;
  affiliationTitle?: string;

  slug: string;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content');

// Helpers de Limpeza de Texto (Strip Markdown) - Mantidos iguais
function stripMarkdown(markdown: string): string {
  if (!markdown) return '';
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/^#+\s+/gm, '')
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`(.+?)`/g, '$1')
    .trim();
}

function getExcerpt(content: string, description: string): string {
  const rawParagraphs = content.split(/\r?\n\s*\r?\n/);
  const firstContentParagraph =
    rawParagraphs.find((p) => {
      const trimmed = p.trim();
      if (!trimmed) return false;
      if (trimmed.startsWith('#')) return false;
      if (trimmed.startsWith('![')) return false;
      if (trimmed.startsWith('<')) return false;
      if (trimmed.startsWith('import') || trimmed.startsWith('export'))
        return false;
      return true;
    }) || '';
  return stripMarkdown(firstContentParagraph) || description;
}

// Helper para obter a data atual ajustada para o Brasil (UTC-3)
function getBrazilDate(): Date {
  const now = new Date();
  // Obtém o timestamp UTC atual e subtrai 3 horas (3 * 60 * 60 * 1000 ms)
  const brazilOffset = 3 * 60 * 60 * 1000;
  return new Date(now.getTime() - brazilOffset);
}

// Função auxiliar para verificar se o post está no período de "Boost"
function isBoosted(post: PostMetadata): boolean {
  // 1. Só impulsiona se for produto do autor
  if (!post.isAuthorProduct) return false;

  // 2. Data do post (assumida como UTC midnight pela string YYYY-MM-DD)
  const lastActiveDate = new Date(post.updatedAt || post.date);

  // 3. Data atual ajustada para o Brasil
  const nowBR = getBrazilDate();

  // 4. Calcula a diferença em milissegundos
  const diffTime = nowBR.getTime() - lastActiveDate.getTime();

  // 5. Converte para dias (arredondando para cima para contar dias parciais como 1 dia)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Debug (Opcional: descomente para ver nos logs da Vercel)
  // console.log(`Post: ${post.title}, Dias: ${diffDays}, Boosted: ${diffDays <= SITE_CONFIG.promotionWindowDays}`);

  return diffDays >= 0 && diffDays <= SITE_CONFIG.promotionWindowDays;
}

// ==========================================================
// NOVA LÓGICA DE BUSCA
// ==========================================================

export function getPostBySlug(slug: string): Post | null {
  // Como agora está em subpastas, não sabemos o caminho exato só pelo slug.
  // Precisamos encontrar o arquivo.
  const files = glob.sync(`${postsDirectory}/**/*.mdx`);
  const postPath = files.find((file) => path.basename(file, '.mdx') === slug);

  if (!postPath) return null;

  const fileContents = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Infere categoria pela pasta pai se não estiver no frontmatter
  const categoryFromFolder = path.basename(path.dirname(postPath));

  return {
    metadata: {
      ...data,
      category: data.category || categoryFromFolder, // Prioridade ao frontmatter, fallback pasta
      slug,
      excerpt: data.description, // No single post usamos description
    } as PostMetadata,
    content,
  };
}

// Agora aceita categoria opcional para filtrar na fonte
export function getAllPosts(category?: string): PostMetadata[] {
  // Se tiver categoria, busca só na pasta específica. Se não, busca em tudo.
  const pattern = category
    ? `${postsDirectory}/${category}/*.mdx`
    : `${postsDirectory}/**/*.mdx`;

  const files = glob.sync(pattern);

  const allPostsData = files.map((filePath) => {
    const slug = path.basename(filePath, '.mdx');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Pega categoria da pasta se necessário
    const categoryFromFolder = path.basename(path.dirname(filePath));
    const finalCategory = data.category || categoryFromFolder;

    return {
      slug,
      ...data,
      category: finalCategory,
      excerpt: getExcerpt(content, data.description),
    } as PostMetadata;
  });

  // NOVA LÓGICA DE ORDENAÇÃO (Weighted Sort)
  return allPostsData.sort((a, b) => {
    const aBoosted = isBoosted(a);
    const bBoosted = isBoosted(b);

    // Regra 1: Se A é impulsionado e B não, A vem primeiro (retorna -1)
    if (aBoosted && !bBoosted) return -1;

    // Regra 2: Se B é impulsionado e A não, B vem primeiro (retorna 1)
    if (!aBoosted && bBoosted) return 1;

    // Regra 3: Se ambos são impulsionados OU ambos são normais,
    // o desempate é a data mais recente (updatedAt ou date)
    const dateA = new Date(a.updatedAt || a.date).getTime();
    const dateB = new Date(b.updatedAt || b.date).getTime();

    return dateB - dateA; // Ordem decrescente (mais novo primeiro)
  });
}
