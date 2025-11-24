import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a equipe do Ruan Hub.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="mb-6 text-4xl font-bold text-hub-dark">Fale Conosco</h1>
      <p className="mb-8 text-lg text-hub-gray">
        Tem alguma dúvida, sugestão ou proposta de parceria? Ficaremos felizes
        em ouvir você.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card Email */}
        <a
          href="mailto:ruosena@hotmail.com" // Ajuste para seu email real se tiver, ou deixe genérico
          className="flex flex-col items-center justify-center rounded-2xl border border-hub-gray/10 bg-white p-8 text-center transition-all hover:border-hub-tech/50 hover:shadow-lg"
        >
          <span className="mb-4 text-4xl">✉️</span>
          <h3 className="mb-2 text-xl font-bold text-hub-dark">Email</h3>
          <p className="text-sm text-hub-gray">Para parcerias e suporte</p>
          <span className="mt-4 text-hub-tech font-medium">
            Enviar mensagem
          </span>
        </a>

        {/* Card Instagram */}
        <a
          href="https://instagram.com/ruanhub"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center rounded-2xl border border-hub-gray/10 bg-white p-8 text-center transition-all hover:border-[#E1306C]/50 hover:shadow-lg"
        >
          <span className="mb-4 text-4xl">📸</span>
          <h3 className="mb-2 text-xl font-bold text-hub-dark">Instagram</h3>
          <p className="text-sm text-hub-gray">Acompanhe nosso dia a dia</p>
          <span className="mt-4 text-[#E1306C] font-medium">@ruanhub</span>
        </a>
      </div>
    </div>
  );
}
