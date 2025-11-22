import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SITE_CONFIG } from '@/config/site';
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
  // 1. Base URL via Variável de Ambiente
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    template: '%s | Ruan Hub',
    default: 'Ruan Hub - Descobertas Digitais',
  },
  description: 'Curadoria de produtos digitais, tecnologia, saúde e sociedade.',
  // 2. Verificação do Google via Variável de Ambiente
  verification: {
    google: SITE_CONFIG.googleVerification,
  },
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
