import { PostMetadata } from '@/lib/posts';
import Link from 'next/link';

interface PostCardProps {
  post: PostMetadata;
}

// Mapeamento de cores para as categorias (usando as classes do nosso Design System)
const CATEGORY_STYLES = {
  tecnologia: 'bg-hub-tech text-white',
  saude: 'bg-hub-health text-white',
  economia: 'bg-hub-economy text-white',
  sociedade: 'bg-hub-society text-white',
  cultura: 'bg-hub-culture text-white',
};

export function PostCard({ post }: PostCardProps) {
  // Fallback para categoria caso venha algo fora do padrão
  const categoryClass =
    CATEGORY_STYLES[post.category] || 'bg-hub-gray text-white';

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-hub-gray/20 bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Área da Imagem (Placeholder por enquanto se não tiver imagem) */}
      <div className="aspect-video w-full bg-hub-light relative">
        {post.image ? (
          // Aqui usaríamos o componente Image do Next.js no futuro
          <div className="h-full w-full object-cover bg-hub-gray/10 flex items-center justify-center text-hub-gray/50">
            {/* Simulação de Imagem */}
            <span className="text-sm">Capa do Produto</span>
          </div>
        ) : (
          <div className="h-full w-full bg-linear-to-br from-hub-light to-hub-gray/20" />
        )}

        {/* Badge de Categoria */}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${categoryClass}`}
        >
          {post.category}
        </span>
      </div>

      {/* Conteúdo do Card */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-bold leading-tight text-hub-dark">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:underline focus:outline-none focus:underline"
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
            // min-h-10 (2.5rem) ou h-12 (3rem) para touch target.
            // Aqui optei por um botão visualmente compacto mas fácil de clicar.
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
