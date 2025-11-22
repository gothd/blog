'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Saúde', href: '/saude', color: 'hover:text-hub-health' },
  { label: 'Tecnologia', href: '/tecnologia', color: 'hover:text-hub-tech' },
  { label: 'Economia', href: '/economia', color: 'hover:text-hub-economy' },
  { label: 'Sociedade', href: '/sociedade', color: 'hover:text-hub-society' },
  { label: 'Cultura', href: '/cultura', color: 'hover:text-hub-culture' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    // h-20 = 5rem (80px na base 16) - Altura confortável para o header
    <header className="sticky top-0 z-50 w-full border-b border-hub-gray/20 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          // min-h-12 = 3rem. Garante que o logo também seja um alvo de toque fácil.
          className="flex min-h-12 items-center text-2xl font-bold tracking-tight text-hub-dark transition-opacity hover:opacity-80 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hub-tech"
          aria-label="Ruan Hub - Ir para página inicial"
        >
          Ruan Hub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // h-12 = 3rem. Altura consistente para os links desktop
              className={`flex h-12 items-center text-base font-medium text-hub-gray transition-colors focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hub-tech ${item.color}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          // h-12 w-12 = 3rem x 3rem. Alvo de toque perfeito segundo diretrizes de acessibilidade.
          className="group flex h-12 w-12 items-center justify-center rounded-lg text-hub-dark transition-colors hover:bg-hub-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hub-tech md:hidden"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={
            isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
          }
        >
          {/* Ícone visual: h-8 w-8 = 2rem. O clique pega no pai (3rem), mas o ícone não fica gigante. */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-8 w-8 transition-transform group-active:scale-95"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-hub-gray/10 bg-white px-4 py-4 shadow-lg md:hidden"
        >
          {/* gap-2 = 0.5rem. Espaçamento vertical leve entre os itens */}
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  // min-h-12 = 3rem. Essencial para lista vertical em mobile.
                  // Evita "fat finger error" (tocar no link errado).
                  className={`flex min-h-12 items-center rounded-md px-4 text-lg font-medium text-hub-gray transition-colors active:bg-hub-light ${item.color}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
