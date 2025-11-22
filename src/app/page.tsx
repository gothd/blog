import { SearchBar } from '@/components/features/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { PostCard } from '@/components/ui/PostCard';
import { SITE_CONFIG } from '@/config/site';
import { getAllPosts } from '@/lib/posts';

interface HomeProps {
  searchParams: Promise<{ pagina?: string }>; // MUDANÇA: pagina
}

export default async function Home({ searchParams }: HomeProps) {
  // 1. Resolve os params (Next.js 15+)
  const { pagina } = await searchParams;

  // 2. Busca TUDO (necessário para o SearchBar funcionar globalmente)
  const allPosts = getAllPosts();

  // 3. Lógica de Paginação Server-Side
  const currentPage = Number(pagina) || 1;
  const totalItems = allPosts.length;
  const totalPages = Math.ceil(totalItems / SITE_CONFIG.itemsPerPage);

  const startIndex = (currentPage - 1) * SITE_CONFIG.itemsPerPage;
  const endIndex = startIndex + SITE_CONFIG.itemsPerPage;

  // 4. Cria o Slice apenas para exibição no Grid
  const paginatedPosts = allPosts.slice(startIndex, endIndex);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      {/* Hero Section */}
      <section className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-hub-dark md:text-5xl">
            Bem-vindo ao Ruan Hub.
          </h1>
          <p className="text-xl leading-relaxed text-hub-gray">
            Seu espaço de descobertas digitais com propósito. Curadoria de
            produtos e conteúdos que transformam experiências reais.
          </p>
        </div>

        {/* SearchBar sem categoria (Busca Global) */}
        <div className="w-full lg:w-auto lg:min-w-[400px]">
          <SearchBar allPosts={allPosts} />
        </div>
      </section>

      {/* Grid de Posts */}
      <section>
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Paginação com ?pagina=X */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/"
            />
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-hub-gray">Nenhum post encontrado.</p>
          </div>
        )}
      </section>
    </div>
  );
}
