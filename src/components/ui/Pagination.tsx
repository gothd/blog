import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  // Se só tem uma página, não mostra nada
  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Função para montar a URL preservando outros params se necessário (ex: filtros futuros)
  const getPageUrl = (page: number) => {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}pagina=${page}`;
  };

  return (
    <nav
      role="navigation"
      aria-label="Paginação"
      className="mt-12 flex items-center justify-center gap-4"
    >
      {/* Botão Anterior */}
      {hasPrev ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex h-10 items-center justify-center rounded-lg border border-hub-gray/20 bg-white px-4 text-sm font-medium text-hub-dark transition-colors hover:bg-hub-light hover:border-hub-gray/40"
        >
          ← Anterior
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="flex h-10 items-center justify-center rounded-lg border border-hub-gray/10 bg-hub-light px-4 text-sm font-medium text-hub-gray/50 cursor-not-allowed"
        >
          ← Anterior
        </span>
      )}

      {/* Indicador de Página */}
      <span className="text-sm font-medium text-hub-gray">
        Página <strong className="text-hub-dark">{currentPage}</strong> de{' '}
        {totalPages}
      </span>

      {/* Botão Próximo */}
      {hasNext ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex h-10 items-center justify-center rounded-lg border border-hub-gray/20 bg-white px-4 text-sm font-medium text-hub-dark transition-colors hover:bg-hub-light hover:border-hub-gray/40"
        >
          Próxima →
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="flex h-10 items-center justify-center rounded-lg border border-hub-gray/10 bg-hub-light px-4 text-sm font-medium text-hub-gray/50 cursor-not-allowed"
        >
          Próxima →
        </span>
      )}
    </nav>
  );
}
