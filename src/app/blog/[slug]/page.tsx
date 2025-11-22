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

      {/* CTA de Afiliação (Se tiver link e preço) */}
      {post.metadata.affiliateLink && (
        <div className="mt-16 rounded-2xl bg-hub-light p-8 text-center md:p-12 border border-hub-gray/10">
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
            * Ao comprar através deste link, você apoia o Ruan Hub a continuar
            criando conteúdo gratuito.
          </p>
        </div>
      )}
    </article>
  );
}
