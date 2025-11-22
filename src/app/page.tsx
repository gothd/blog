import { PostCard } from '@/components/ui/PostCard';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      {/* Hero Section / Introdução */}
      <section className="mb-16 max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-hub-dark md:text-5xl">
          Bem-vindo ao Ruan Hub.
        </h1>
        <p className="text-xl leading-relaxed text-hub-gray">
          Seu espaço de descobertas digitais com propósito. Aqui você encontra{' '}
          <strong className="font-medium text-hub-dark">
            achadinhos selecionados
          </strong>
          , produtos digitais e conteúdos organizados por categorias como saúde,
          sociedade, economia, tecnologia e cultura.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-hub-gray">
          Tudo com curadoria pessoal, linguagem acessível e foco em transformar
          experiências reais. Navegue por indicações que fazem sentido para o
          seu dia a dia e explore o varejo que eu acredito.
        </p>
      </section>

      {/* Grid de Produtos/Posts */}
      <section aria-labelledby="products-heading">
        <h2 id="products-heading" className="sr-only">
          Lista de Produtos e Artigos
        </h2>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-hub-gray/30 p-12 text-center">
            <p className="text-hub-gray">
              Nenhum conteúdo encontrado no momento. Volte em breve!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
