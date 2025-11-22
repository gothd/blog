import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface PostMetadata {
  title: string;
  description: string;
  excerpt: string;
  date: string;
  category: 'tecnologia' | 'saude' | 'economia' | 'sociedade' | 'cultura';
  image?: string;
  affiliateLink?: string; // Link para COMPRAR
  price?: string;

  // NOVOS CAMPOS PARA PARCEIROS
  affiliationLink?: string; // Link para SE AFILIAR (Revender)
  commissionRate?: string; // Ex: "50%"
  affiliationTitle?: string; // Título personalizado do box de afiliação

  slug: string;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content');

if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

// Função auxiliar para limpar Markdown para texto puro
function stripMarkdown(markdown: string): string {
  if (!markdown) return '';
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove imagens completas
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, mantém texto
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove negrito (**texto**)
    .replace(/(\*|_)(.*?)\1/g, '$2') // Remove itálico (*texto*)
    .replace(/^#+\s+/gm, '') // Remove hashtags de títulos
    .replace(/`{3}[\s\S]*?`{3}/g, '') // Remove blocos de código
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .trim();
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    return {
      metadata: {
        ...data,
        slug,
        // Apenas repassa o description para o single post, o excerpt não é crítico aqui
        excerpt: data.description,
      } as PostMetadata,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): PostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // FIX: Regex robusto para detectar parágrafos em Windows (CRLF) e Unix (LF)
      // Divide onde houver uma linha em branco (duas quebras de linha consecutivas)
      const rawParagraphs = content.split(/\r?\n\s*\r?\n/);

      // Encontra o primeiro parágrafo de TEXTO real
      const firstContentParagraph =
        rawParagraphs.find((p) => {
          const trimmed = p.trim();

          if (!trimmed) return false;
          if (trimmed.startsWith('#')) return false; // Títulos
          if (trimmed.startsWith('![')) return false; // Imagens
          if (trimmed.startsWith('<')) return false; // Componentes JSX
          if (trimmed.startsWith('import')) return false; // Imports MDX
          if (trimmed.startsWith('export')) return false; // Exports MDX

          return true;
        }) || '';

      const excerpt = stripMarkdown(firstContentParagraph) || data.description;

      return {
        slug,
        ...data,
        excerpt,
      } as PostMetadata;
    });

  // Ordena por data (mais recente primeiro)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
