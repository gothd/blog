import { MDXComponents } from '@/components/mdx/MDXComponents';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc'; // Importante: /rsc
import Link from 'next/link';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';

interface PageProps {
  params: Promise<{ slug: string }>; // Next.js 15+ params são Promise
}

// 1. Geração de Parâmetros Estáticos (SSG)
// Isso diz ao Next.js quais páginas criar no build time (ex: /blog/pixel-art-pro)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. SEO Dinâmico (Metadata)
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
      publishedTime: post.metadata.date,
      // images: [post.metadata.image], // Futuramente
    },
  };
}

// 3. Componente da Página
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Cores dinâmicas para o badge baseadas na categoria
  const categoryColors = {
    tecnologia: 'text-hub-tech bg-hub-tech/10',
    saude: 'text-hub-health bg-hub-health/10',
    economia: 'text-hub-economy bg-hub-economy/10',
    sociedade: 'text-hub-society bg-hub-society/10',
    cultura: 'text-hub-culture bg-hub-culture/10',
  };

  const badgeClass =
    categoryColors[post.metadata.category] || 'text-hub-gray bg-hub-gray/10';

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      {/* Breadcrumb / Voltar */}
      <Link
        href="/"
        className="group mb-8 flex items-center text-sm font-medium text-hub-gray transition-colors hover:text-hub-dark"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Voltar para o Hub
      </Link>

      {/* Cabeçalho do Post */}
      <header className="mb-10 border-b border-hub-gray/10 pb-10">
        <div className="mb-4 flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${badgeClass}`}
          >
            {post.metadata.category}
          </span>
          <time className="text-sm text-hub-gray">{post.metadata.date}</time>
        </div>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-hub-dark md:text-5xl lg:leading-tight">
          {post.metadata.title}
        </h1>

        <p className="text-xl leading-relaxed text-hub-gray">
          {post.metadata.description}
        </p>
      </header>

      {/* Corpo do MDX Renderizado */}
      <div className="min-h-[200px]">
        <MDXRemote
          source={post.content}
          components={MDXComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      {/* ÁREA DE PRODUTO E AFILIAÇÃO */}
      <div className="mt-16 space-y-8">
        {/* 1. CTA PARA O CLIENTE FINAL (COMPRAR) */}
        {post.metadata.affiliateLink && (
          <div className="rounded-2xl bg-hub-light p-8 text-center shadow-sm border border-hub-gray/10 md:p-12">
            <h3 className="mb-2 text-2xl font-bold text-hub-dark">
              Gostou do conteúdo?
            </h3>
            <p className="mb-6 text-hub-gray">
              Acesse o material completo e aplique esse conhecimento hoje mesmo.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {post.metadata.price && (
                <span className="text-2xl font-bold text-hub-dark">
                  {post.metadata.price}
                </span>
              )}

              <a
                href={post.metadata.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-hub-tech px-8 text-base font-bold text-white shadow-lg shadow-hub-tech/20 transition-all hover:-translate-y-1 hover:bg-hub-tech/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hub-dark focus-visible:ring-offset-2"
              >
                Quero Acessar Agora
              </a>
            </div>

            <p className="mt-4 text-xs text-hub-gray/60">
              * Compra segura e entrega imediata.
            </p>
          </div>
        )}

        {/* 2. CTA AFILIADO */}
        {post.metadata.affiliationLink && (
          <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-hub-gray/30 bg-white p-6 transition-colors hover:border-hub-tech/50 hover:bg-hub-light/50 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-hub-economy/10 px-2 py-1 text-xs font-bold uppercase text-hub-economy">
                    Programa de Parceiros
                  </span>
                  {post.metadata.commissionRate && (
                    <span className="text-xs font-medium text-hub-gray">
                      Comissão de {post.metadata.commissionRate}
                    </span>
                  )}
                </div>

                {/* TÍTULO DINÂMICO OU GENÉRICO */}
                <h4 className="text-lg font-bold text-hub-dark">
                  {post.metadata.affiliationTitle ||
                    'Você é Criador de Conteúdo?'}
                </h4>

                <p className="text-sm text-hub-gray max-w-md">
                  Monetize sua audiência indicando este produto. Torne-se um
                  parceiro oficial e receba
                  {post.metadata.commissionRate
                    ? ` ${post.metadata.commissionRate} `
                    : ' comissão '}
                  por cada venda realizada.
                </p>
              </div>

              <a
                href={post.metadata.affiliationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-hub-gray/20 bg-white px-6 text-sm font-semibold text-hub-dark transition-all hover:border-hub-dark hover:bg-hub-dark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hub-dark focus-visible:ring-offset-2"
              >
                <span>Quero me Afiliar</span>
                {/* Ícone de "Handshake" ou Seta */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
