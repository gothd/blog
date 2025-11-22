import Image from 'next/image';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

// Tipagem correta: Define que os componentes aceitam props padrão de HTML
type MDXProps<T extends keyof React.JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<T>;

export const MDXComponents = {
  // Títulos
  h1: (props: MDXProps<'h1'>) => (
    <h1
      className="mb-6 mt-8 text-3xl font-bold tracking-tight text-hub-dark md:text-4xl"
      {...props}
    />
  ),
  h2: (props: MDXProps<'h2'>) => (
    <h2
      className="mb-4 mt-8 text-2xl font-bold tracking-tight text-hub-dark border-b border-hub-gray/10 pb-2"
      {...props}
    />
  ),
  h3: (props: MDXProps<'h3'>) => (
    <h3 className="mb-3 mt-6 text-xl font-bold text-hub-dark" {...props} />
  ),

  // Texto
  p: (props: MDXProps<'p'>) => (
    <p
      className="mb-4 leading-relaxed text-hub-gray text-base md:text-lg"
      {...props}
    />
  ),
  strong: (props: MDXProps<'strong'>) => (
    <strong className="font-semibold text-hub-dark" {...props} />
  ),

  // Listas
  ul: (props: MDXProps<'ul'>) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-hub-gray" {...props} />
  ),
  ol: (props: MDXProps<'ol'>) => (
    <ol className="mb-6 ml-6 list-decimal space-y-2 text-hub-gray" {...props} />
  ),
  li: (props: MDXProps<'li'>) => <li className="pl-1" {...props} />,

  // Links
  a: ({ href, ...props }: MDXProps<'a'>) => {
    const isExternal = href?.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={href}
          className="font-medium text-hub-tech underline decoration-hub-tech/30 underline-offset-4 transition-colors hover:text-hub-dark hover:decoration-hub-tech"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }

    return (
      <Link
        href={href || '#'}
        className="font-medium text-hub-tech underline decoration-hub-tech/30 underline-offset-4 transition-colors hover:text-hub-dark hover:decoration-hub-tech"
        {...props}
      />
    );
  },

  // Citações
  blockquote: (props: MDXProps<'blockquote'>) => (
    <blockquote
      className="my-6 border-l-4 border-hub-tech bg-hub-light p-4 italic text-hub-dark rounded-r-lg"
      {...props}
    />
  ),

  // Tabela
  table: (props: MDXProps<'table'>) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-hub-gray/20">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: MDXProps<'thead'>) => (
    <thead className="bg-hub-light text-hub-dark font-bold" {...props} />
  ),
  th: (props: MDXProps<'th'>) => (
    <th
      className="px-4 py-3 border-b border-hub-gray/20 whitespace-nowrap"
      {...props}
    />
  ),
  td: (props: MDXProps<'td'>) => (
    <td className="px-4 py-3 border-b border-hub-gray/10" {...props} />
  ),

  // IMAGEM OTIMIZADA (Next/Image com tamanho dinâmico)
  img: (props: MDXProps<'img'>) => {
    // Se não tiver src, não renderiza nada para evitar erro
    if (!props.src) return null;

    return (
      // Wrapper div para garantir margens e layout
      <div className="my-8 overflow-hidden rounded-xl border border-hub-gray/10 bg-hub-light shadow-sm">
        <Image
          // Forçamos o TypeScript a tratar como string, pois em MDX sempre será um path
          src={props.src as string}
          alt={props.alt || 'Imagem do post'}
          // O truque para responsividade sem saber o tamanho:
          width={0}
          height={0}
          sizes="100vw"
          // w-full faz ocupar a largura do container
          // h-auto mantém a proporção original da imagem (aspect ratio)
          className="h-auto w-full object-cover"
          // Otimização de carregamento
          loading="lazy"
          quality={85}
        />
        {/* Se tiver título (title), usamos como legenda */}
        {props.title && (
          <span className="block border-t border-hub-gray/10 bg-hub-light/50 p-2 text-center text-xs text-hub-gray italic">
            {props.title}
          </span>
        )}
      </div>
    );
  },
};
