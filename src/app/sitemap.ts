import { CATEGORY_LIST } from '@/config/categories';
import { SITE_CONFIG } from '@/config/site';
import { getAllPosts } from '@/lib/posts';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url; // Usa a variável de ambiente
  const allPosts = getAllPosts();

  // 1. URLs dos Posts (Lógica de updatedAt)
  const postsUrls = allPosts.map((post) => {
    const lastMod = post.updatedAt || post.date;

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(lastMod),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  // 2. URLs das Categorias
  const categoriesUrls = CATEGORY_LIST.map((category) => {
    let lastModifiedDate = new Date(); // Default hoje

    // .find() pega o primeiro (mais recente) e para a execução.
    const latestPost = allPosts.find((p) => p.category === category.slug);

    if (latestPost) {
      const latestPostDate = new Date(latestPost.updatedAt || latestPost.date);
      lastModifiedDate = latestPostDate;
    }

    return {
      url: `${baseUrl}/${category.slug}`,
      lastModified: lastModifiedDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoriesUrls,
    ...postsUrls,
  ];
}
