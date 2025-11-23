'use client';

import { SITE_CONFIG } from '@/config/site';

interface SocialShareProps {
  title: string;
  slug: string;
}

export function SocialShare({ title, slug }: SocialShareProps) {
  // Monta a URL absoluta do post
  const postUrl = `${SITE_CONFIG.url}/blog/${slug}`;
  // Codifica os textos para URL (para lidar com acentos e espaços)
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  // Configuração dos links de compartilhamento
  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=*${encodedTitle}*%0A%0A${encodedUrl}`,
      // Ícone do WhatsApp (SVG simples)
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.025-.458.124-.607.138-.138.297-.347.446-.521.149-.173.248-.297.371-.495.124-.198.074-.371-.037-.594-.112-.223-.991-2.386-1.361-3.271-.36-.861-.73-.744-.991-.756-.248-.012-.532-.012-.817-.012-.285 0-.756.107-1.151.536-.396.43-1.511 1.476-1.511 3.601s1.548 4.121 1.76 4.406c.211.285 3.046 4.651 7.379 6.522 1.03.445 1.834.711 2.463.911 1.03.326 1.968.28 2.705.17.828-.124 2.546-1.04 2.905-2.044.359-1.004.359-1.864.252-2.044z" />
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
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
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
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
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
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
      color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10',
    },
  ];

  return (
    <div className="mt-12 flex flex-col items-center justify-center border-t border-hub-gray/10 pt-8">
      <span className="mb-4 text-sm font-medium text-hub-gray uppercase tracking-wider">
        Compartilhe este conteúdo
      </span>
      <div className="flex gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-hub-gray/20 text-hub-gray transition-all hover:scale-110 hover:border-transparent ${link.color}`}
            aria-label={`Compartilhar no ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
