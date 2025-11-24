import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-hub-gray/20 bg-hub-light py-12">
      <div className="mx-auto max-w-7xl px-4 flex flex-col items-center text-center md:px-6">
        {/* 1. Marca e Slogan */}
        <div className="mb-8">
          <span className="text-2xl font-bold tracking-tight text-hub-dark">
            Ruan Hub
          </span>
          <p className="mt-2 text-sm text-hub-gray">
            Espaço de descobertas digitais com propósito.
          </p>
        </div>

        {/* 2. Redes Sociaiss */}
        <div className="mb-10 flex gap-6">
          <a
            href="https://instagram.com/ruanhub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-hub-gray transition-colors hover:text-[#E1306C] hover:scale-110 transform duration-200"
            aria-label="Siga-nos no Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>

        {/* grid para economizar altura vertical no mobile */}
        <nav className="mb-10 grid w-full max-w-xs grid-cols-2 gap-x-8 gap-y-4 text-sm font-medium text-hub-gray">
          {/* Lado Esquerdo */}
          <div className="flex flex-col gap-3">
            <Link href="/sobre" className="hover:text-hub-dark hover:underline">
              Sobre
            </Link>
            <Link
              href="/contato"
              className="hover:text-hub-dark hover:underline"
            >
              Contato
            </Link>
          </div>

          {/* Lado Direito */}
          <div className="flex flex-col gap-3">
            <Link
              href="/privacidade"
              className="hover:text-hub-dark hover:underline"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos"
              className="hover:text-hub-dark hover:underline"
            >
              Termos de Uso
            </Link>
          </div>
        </nav>

        {/* 4. Copyright */}
        <p className="text-xs text-hub-gray/60">
          &copy; {currentYear} Ruan Hub. Todos os direitos reservados.
          <br />
          Desenvolvido por{' '}
          <a
            href="https://github.com/gothd"
            target="_blank"
            rel="noreferrer"
            className="hover:text-hub-dark underline"
          >
            Gothd
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
