export const SITE_CONFIG = {
  // Configurações de Negócio
  itemsPerPage: 6, // 6 posts por página (fica bonito no grid de 2 ou 3 colunas)
  promotionWindowDays: 7, // Dias que o produto fica no topo após update

  // Configurações de Ambiente
  // Fallback seguro para evitar erro de URL inválida no build
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ruanhub.vercel.app',

  googleVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
};
