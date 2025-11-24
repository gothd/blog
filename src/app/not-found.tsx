import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl font-bold text-hub-gray/20">404</span>
      <h1 className="mt-4 text-3xl font-bold text-hub-dark">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-lg text-hub-gray">
        Parece que o conteúdo que você procura não existe ou foi movido para
        outro lugar.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-hub-dark px-8 text-base font-bold text-white transition-transform hover:scale-105"
        >
          Voltar para o Início
        </Link>
        <Link
          href="/contato"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-hub-gray/20 bg-white px-8 text-base font-bold text-hub-dark transition-colors hover:bg-hub-light"
        >
          Fale Conosco
        </Link>
      </div>
    </div>
  );
}
