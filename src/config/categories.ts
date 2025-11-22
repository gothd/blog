export type CategoryId =
  | 'tecnologia'
  | 'saude'
  | 'economia'
  | 'sociedade'
  | 'cultura';

export interface CategoryConfig {
  slug: CategoryId;
  label: string;
  description: string;
  colors: {
    text: string; // ex: text-hub-tech
    hover: string; // Classe completa de hover
    bg: string; // ex: bg-hub-tech
    light: string; // ex: bg-hub-tech/10
  };
}

export const CATEGORIES: Record<CategoryId, CategoryConfig> = {
  tecnologia: {
    slug: 'tecnologia',
    label: 'Tecnologia',
    description:
      'Inovações, ferramentas digitais e o futuro do desenvolvimento.',
    colors: {
      text: 'text-hub-tech',
      hover: 'hover:text-hub-tech', // Definido explicitamente
      bg: 'bg-hub-tech',
      light: 'bg-hub-tech/10',
    },
  },
  saude: {
    slug: 'saude',
    label: 'Saúde',
    description: 'Bem-estar físico e mental, ciência e qualidade de vida.',
    colors: {
      text: 'text-hub-health',
      hover: 'hover:text-hub-health',
      bg: 'bg-hub-health',
      light: 'bg-hub-health/10',
    },
  },
  economia: {
    slug: 'economia',
    label: 'Economia',
    description: 'Finanças pessoais, mercado de trabalho e empreendedorismo.',
    colors: {
      text: 'text-hub-economy',
      hover: 'hover:text-hub-economy',
      bg: 'bg-hub-economy',
      light: 'bg-hub-economy/10',
    },
  },
  sociedade: {
    slug: 'sociedade',
    label: 'Sociedade',
    description: 'Comportamento, liderança e dinâmicas sociais.',
    colors: {
      text: 'text-hub-society',
      hover: 'hover:text-hub-society',
      bg: 'bg-hub-society',
      light: 'bg-hub-society/10',
    },
  },
  cultura: {
    slug: 'cultura',
    label: 'Cultura',
    description: 'Arte, história e movimentos que moldam nosso tempo.',
    colors: {
      text: 'text-hub-culture',
      hover: 'hover:text-hub-culture',
      bg: 'bg-hub-culture',
      light: 'bg-hub-culture/10',
    },
  },
};

// Helper para arrays (útil para map)
export const CATEGORY_LIST = Object.values(CATEGORIES);
