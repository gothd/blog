import { PostCard } from '@/components/ui/PostCard';
import { CATEGORIES, CATEGORY_LIST, CategoryId } from '@/config/categories';
import { getAllPosts } from '@/lib/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

// 1. SSG: Gera estaticamente as páginas /saude, /tecnologia, etc. no build
export async function generateStaticParams() {
  return CATEGORY_LIST.map((cat) => ({
    category: cat.slug,
  }));
}

// 2. SEO Dinâmico
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const config = CATEGORIES[category as CategoryId];

  if (!config) return {};

  return {
    title: config.label,
    description: `Confira os melhores artigos e produtos sobre ${config.label} no Ruan Hub.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Validação: Se não for uma categoria válida, 404 (evita conflito com outras rotas)
  const config = CATEGORIES[category as CategoryId];
  if (!config) {
    notFound();
  }

  // Filtra os posts desta categoria
  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter((post) => post.category === category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      {/* Header da Categoria */}
      <header className="mb-12 border-b border-hub-gray/10 pb-8">
        <span
          className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${config.colors.light} ${config.colors.text}`}
        >
          Categoria
        </span>
        <h1 className="mb-4 text-4xl font-bold text-hub-dark md:text-5xl">
          {config.label}
        </h1>
        <p className="max-w-2xl text-xl text-hub-gray">{config.description}</p>
      </header>

      {/* Grid de Posts */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryPosts.length > 0 ? (
          categoryPosts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="col-span-full text-center text-hub-gray py-12">
            Em breve teremos conteúdos incríveis nesta seção.
          </p>
        )}
      </div>
    </div>
  );
}
