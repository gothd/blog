import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

// Definição da Interface do Post (Type Safety)
export interface PostMetadata {
  title: string;
  description: string;
  date: string;
  category: 'tecnologia' | 'saude' | 'economia' | 'sociedade' | 'cultura';
  image?: string;
  affiliateLink?: string; // Link para o produto
  price?: string; // Preço (display)
  slug: string;
}

export interface Post {
  metadata: PostMetadata;
  content: string; // O corpo MDX
}

const postsDirectory = path.join(process.cwd(), 'src/content');

// Garante que a pasta existe
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Separa o frontmatter do conteúdo
    const { data, content } = matter(fileContents);

    return {
      metadata: {
        ...data,
        slug,
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
      const { data } = matter(fileContents);

      return {
        slug,
        ...data,
      } as PostMetadata;
    });

  // Ordena por data (mais recente primeiro)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
