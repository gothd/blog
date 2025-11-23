'use client';

import { SITE_CONFIG } from '@/config/site';

interface SocialShareProps {
  title: string;
  slug: string;
}

export function SocialShare({ title, slug }: SocialShareProps) {
  const postUrl = `${SITE_CONFIG.url}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=*${encodedTitle}*%0A%0A${encodedUrl}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.13 1.25 4.91 1.25 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm0 18.06c-1.49 0-2.93-.39-4.21-1.13l-.3-.18-3.13.82.83-3.04-.2-.32a8.01 8.01 0 0 1-1.23-4.21c0-4.48 3.64-8.12 8.12-8.12s8.12 3.64 8.12 8.12-3.64 8.12-8.12 8.12zm4.52-6.11c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.18 3.7.58.25 1.03.4 1.39.51.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.11-.23-.17-.48-.3z" />
        </svg>
      ),
      color: 'hover:text-[#25D366] hover:bg-[#25D366]/10',
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.306c0-4.613 5.976-4.979 5.976 0v8.306h4.972v-9.461c0-7.509-8.046-7.286-11.012-3.533v-3.312z" />
        </svg>
      ),
      color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10',
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: 'hover:text-black hover:bg-black/10',
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
      color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10',
    },
  ];

  return (
    // Aumentei a margem superior (mt-16) e o padding (py-10)
    // Mudei o layout para vertical centralizado, dando destaque total
    <div className="mt-16 flex flex-col items-center justify-center gap-6 border-t border-hub-gray/10 pt-10">
      {/* Foco em compartilhar valor, não em "gostar" */}
      <span className="text-base font-semibold text-hub-dark">
        Compartilhe este conhecimento:
      </span>

      {/* Ícones: Aumentados para h-12 w-12 (48px) para toque perfeito */}
      {/* Adicionado gap-4 para não ficarem colados */}
      <div className="flex flex-wrap justify-center gap-4">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            // Botões maiores (h-12 w-12), ícones internos maiores (h-6 w-6)
            className={`group flex h-12 w-12 items-center justify-center rounded-full border border-hub-gray/20 bg-white text-hub-gray transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-md ${link.color}`}
            aria-label={`Compartilhar no ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
