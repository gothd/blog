'use client';

import { CATEGORIES, CategoryId } from '@/config/categories';
import { PostMetadata } from '@/lib/posts';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface SearchBarProps {
  allPosts: PostMetadata[]; // Recebe TUDO
  currentCategory?: string; // Opcional: Se existir, mostra o toggle
}

export function SearchBar({ allPosts, currentCategory }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Estado do Toggle: Se tiver categoria, começa true. Senão false.
  const [filterByCategory, setFilterByCategory] = useState(!!currentCategory);

  // 1. Filtra a FONTE DE DADOS antes de passar pro Fuse
  const searchablePosts = useMemo(() => {
    if (currentCategory && filterByCategory) {
      return allPosts.filter((post) => post.category === currentCategory);
    }
    return allPosts;
  }, [allPosts, currentCategory, filterByCategory]);

  // 2. Configura o Fuse com a fonte filtrada
  const fuse = useMemo(() => {
    return new Fuse(searchablePosts, {
      keys: ['title', 'description', 'excerpt'],
      threshold: 0.3, // 0.3 é um bom balanço entre exato e "fuzzy"
    });
  }, [searchablePosts]);

  // 3. Executa a busca
  const results = useMemo(() => {
    if (!query) return [];
    return fuse
      .search(query)
      .map((result) => result.item)
      .slice(0, 5);
  }, [query, fuse]);

  // Cores dinâmicas para o Toggle
  const categoryConfig = currentCategory
    ? CATEGORIES[currentCategory as CategoryId]
    : null;
  const toggleColorClass = categoryConfig
    ? categoryConfig.colors.bg
    : 'bg-hub-dark';

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex flex-col gap-3">
        {/* Input Wrapper */}
        <div className="relative">
          <input
            type="text"
            placeholder={
              currentCategory && filterByCategory
                ? `Buscar em ${categoryConfig?.label}...`
                : 'Buscar em todo o Hub...'
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full rounded-xl border border-hub-gray/20 bg-white py-3 pl-11 pr-4 text-sm text-hub-dark shadow-sm transition-all focus:border-hub-tech focus:outline-none focus:ring-2 focus:ring-hub-tech/20"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-hub-gray"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* TOGGLE: Só aparece se estivermos numa página de categoria */}
        {currentCategory && (
          <div className="flex items-center gap-3 px-1">
            <button
              onClick={() => setFilterByCategory(!filterByCategory)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                filterByCategory ? toggleColorClass : 'bg-hub-gray/30'
              }`}
              type="button"
              aria-pressed={filterByCategory}
              aria-label="Filtrar busca apenas nesta categoria"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  filterByCategory ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className="text-xs font-medium text-hub-gray cursor-pointer"
              onClick={() => setFilterByCategory(!filterByCategory)}
            >
              {filterByCategory
                ? `Buscando apenas em ${categoryConfig?.label}`
                : 'Buscando em todo o site'}
            </span>
          </div>
        )}
      </div>

      {/* Dropdown de Resultados */}
      {isOpen && query.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-hub-gray/10 bg-white shadow-xl ring-1 ring-black/5">
            {results.length > 0 ? (
              <ul className="divide-y divide-hub-gray/10">
                {results.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 transition-colors hover:bg-hub-light"
                    >
                      <p className="font-bold text-hub-dark text-sm">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
                            CATEGORIES[post.category as CategoryId]?.colors
                              .light
                          } ${
                            CATEGORIES[post.category as CategoryId]?.colors.text
                          }`}
                        >
                          {post.category}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-hub-gray">
                  Nenhum resultado encontrado.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
