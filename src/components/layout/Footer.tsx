import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-hub-gray/20 bg-hub-light py-8">
      <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
        <div className="mb-4">
          <span className="text-lg font-bold text-hub-dark">Ruan Hub</span>
          <p className="mt-2 text-sm text-hub-gray">
            Espaço de descobertas digitais com propósito.
          </p>
        </div>

        <div className="mb-6 flex justify-center gap-6 text-sm text-hub-gray">
          <Link href="/sobre" className="hover:text-hub-dark hover:underline">
            Sobre
          </Link>
          <Link href="/contato" className="hover:text-hub-dark hover:underline">
            Contato
          </Link>
          <Link
            href="/privacidade"
            className="hover:text-hub-dark hover:underline"
          >
            Privacidade
          </Link>
        </div>

        <p className="text-xs text-hub-gray/60">
          &copy; {currentYear} Ruan Hub. Todos os direitos reservados.
          <br />
          Desenvolvido por{' '}
          <a
            href="https://github.com/gothd"
            target="_blank"
            rel="noreferrer"
            className="hover:text-hub-dark"
          >
            Gothd
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
