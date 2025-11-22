import { SearchBar } from '@/components/features/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { PostCard } from '@/components/ui/PostCard';
import { CATEGORIES, CATEGORY_LIST, CategoryId } from '@/config/categories';
import { SITE_CONFIG } from '@/config/site';
import { getAllPosts } from '@/lib/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ pagina?: string }>; // MUDANÇA: pagina
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

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const { pagina } = await searchParams;

  const config = CATEGORIES[category as CategoryId];
  if (!config) notFound();

  // OTIMIZAÇÃO CLEAN CODE:
  // 1. Buscamos TODOS os posts uma única vez (I/O único)
  const allGlobalPosts = getAllPosts();

  // 2. Filtramos em memória (CPU rápida) para obter a lista da categoria
  // Isso garante que 'categoryPosts' é um subconjunto estrito de 'allGlobalPosts'
  const categoryPosts = allGlobalPosts.filter(
    (post) => post.category === category,
  );

  // Paginação (Lógica mantida, agora usando a lista filtrada em memória)
  const currentPage = Number(pagina) || 1;
  const totalPages = Math.ceil(categoryPosts.length / SITE_CONFIG.itemsPerPage);
  const startIndex = (currentPage - 1) * SITE_CONFIG.itemsPerPage;
  const currentPaginatedPosts = categoryPosts.slice(
    startIndex,
    startIndex + SITE_CONFIG.itemsPerPage,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 border-b border-hub-gray/10 pb-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span
            className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${config.colors.light} ${config.colors.text}`}
          >
            Categoria
          </span>
          <h1 className="mb-4 text-4xl font-bold text-hub-dark md:text-5xl">
            {config.label}
          </h1>
          <p className="max-w-xl text-xl text-hub-gray">{config.description}</p>
        </div>

        {/* SearchBar recebe a lista COMPLETA para permitir busca global */}
        <div className="w-full lg:w-auto lg:min-w-[400px]">
          {/* Quando a categoria mudar (ex: de Saúde para Tecnologia) com 'key' prop,
           trate a SearchBar como um componente novo (atualiza o filtro internamente) */}
          <SearchBar
            key={category}
            allPosts={allGlobalPosts}
            currentCategory={category}
          />
        </div>
      </header>

      {/* Grid renderiza apenas os posts da CATEGORIA + Paginação */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentPaginatedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={`/${category}`}
      />
    </div>
  );
}
