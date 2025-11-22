import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Ruan Hub',
    default: 'Ruan Hub - Descobertas Digitais',
  },
  description: 'Curadoria de produtos digitais, tecnologia, saúde e sociedade.',
  // Aqui entra aquela verificação do Google depois
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <Header />
        {/* main flex-1 faz o conteúdo ocupar todo o espaço disponível empurrando o footer */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
