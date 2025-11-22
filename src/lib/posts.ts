import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import path from 'path';

export interface PostMetadata {
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updatedAt?: string; // NOVO CAMPO
  category: string; // Agora inferido da pasta, mas mantemos no tipo
  image?: string;
  price?: string;
  affiliateLink?: string;
  affiliationLink?: string;
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

  // Ordena por updatedAt (se houver) ou date
  return allPostsData.sort((a, b) => {
    const dateA = a.updatedAt || a.date;
    const dateB = b.updatedAt || b.date;
    return dateA < dateB ? 1 : -1;
  });
}
