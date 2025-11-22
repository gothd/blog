import { CATEGORIES, CategoryId } from '@/config/categories';
import { PostMetadata } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
  post: PostMetadata;
}

export function PostCard({ post }: PostCardProps) {
  // Busca a config baseada no slug que vem do frontmatter
  const categoryConfig = CATEGORIES[post.category as CategoryId];

  // Fallback de segurança
  const badgeClass = categoryConfig
    ? `${categoryConfig.colors.bg} text-white`
    : 'bg-hub-gray text-white';

  return (
    <article
      // 1. Adicionado 'group' para disparar as animações dos filhos
      // 2. Adicionado 'duration-300 ease-out' para a subida do card ser suave
      className="group flex flex-col overflow-hidden rounded-xl border border-hub-gray/20 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-hub-light">
        {post.image ? (
          <Image
            src={post.image}
            alt={`Capa do post: ${post.title}`}
            fill
            // 3. O scale agora funciona porque o pai tem 'group'.
            // duration-500 para o zoom ser mais lento que a subida (efeito parallax suave)
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-hub-light to-hub-gray/10 text-hub-gray/40">
            <span className="text-4xl font-bold opacity-20">RH</span>
          </div>
        )}

        {/* Badge de Categoria */}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${badgeClass}`}
        >
          {categoryConfig?.label || post.category}
        </span>
      </div>

      {/* Conteúdo do Card */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-bold leading-tight text-hub-dark">
            <Link
              href={`/blog/${post.slug}`}
              // Adicionado decoration-2 para o sublinhado ficar mais visível no hover
              className="decoration-2 hover:underline focus:outline-none focus:underline"
            >
              {post.title}
            </Link>
          </h3>
          <p className="line-clamp-3 text-sm text-hub-gray">{post.excerpt}</p>
        </div>

        {/* Rodapé do Card: Preço e Ação */}
        <div className="mt-6 flex items-center justify-between border-t border-hub-gray/10 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-hub-gray uppercase">
              Investimento
            </span>
            <span className="text-lg font-bold text-hub-tech">
              {post.price || 'Grátis'}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="flex min-h-10 items-center justify-center rounded-lg bg-hub-dark px-4 text-sm font-medium text-white transition-colors hover:bg-hub-dark/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hub-tech focus-visible:ring-offset-2"
            aria-label={`Ver detalhes sobre ${post.title}`}
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
