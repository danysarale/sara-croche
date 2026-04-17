// ─── Interfaces (compatíveis com Sanity + fallback local) ─

export interface SanityImage {
  _key: string;
  alt: string;
  asset: {
    _id: string;
    url: string;
  };
}

export interface ProductImage {
  id: number | string;
  src: string;
  alt: string;
}

export interface PackagingOption {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface CardOption {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface Product {
  _id?: string;
  id?: string;
  slug?: string;
  collection: string;
  name: string;
  description: string;
  details: string[];
  price: number;
  images: ProductImage[];
}

// ─── Fallback Local (caso o Sanity não tenha dados) ───────

export const fallbackProduct: Product = {
  id: "mini-urso-apego",
  collection: "Coleção Miniworld",
  name: "Mini Urso Apego",
  description:
    "Uma miniatura de crochê feita à mão com amor e dedicação. Cada ponto é cuidadosamente trabalhado para criar um amigurumi único, perfeito para colecionar ou presentear alguém especial.",
  details: [
    "Tamanho: ~8 cm de altura",
    "Material: Linha 100% algodão",
    "Enchimento: Fibra siliconada antialérgica",
    "Olhos: Olhos de segurança (trava interna)",
    "Feito à mão — cada peça é única",
    "Prazo de confecção: 3 a 5 dias úteis",
  ],
  price: 79.9,
  images: [
    { id: 1, src: "/images/mini-urso-01.jpg", alt: "Mini Urso Apego — vista frontal" },
    { id: 2, src: "/images/mini-urso-02.jpg", alt: "Mini Urso Apego — vista lateral" },
    { id: 3, src: "/images/mini-urso-03.jpg", alt: "Mini Urso Apego — vista traseira" },
    { id: 4, src: "/images/mini-urso-04.jpg", alt: "Mini Urso Apego — detalhe do rosto" },
    { id: 5, src: "/images/mini-urso-05.jpg", alt: "Mini Urso Apego — escala na mão" },
  ],
};

export const fallbackPackaging: PackagingOption[] = [
  {
    id: "caixa-premium",
    name: "Caixa Premium",
    description: "Caixa rígida com laço de cetim e papel de seda",
    price: 15.0,
    icon: "🎁",
  },
  {
    id: "saquinho-craft",
    name: "Saquinho Craft",
    description: "Saquinho de papel kraft com tag personalizada",
    price: 8.0,
    icon: "🛍️",
  },
];

export const fallbackCards: CardOption[] = [
  {
    id: "aniversario",
    name: "Aniversário",
    description: "Cartão com tema de aniversário",
    price: 5.0,
    icon: "🎂",
  },
  {
    id: "amor",
    name: "Com Amor",
    description: "Cartão romântico especial",
    price: 5.0,
    icon: "❤️",
  },
  {
    id: "agradecimento",
    name: "Agradecimento",
    description: "Cartão de agradecimento",
    price: 5.0,
    icon: "🙏",
  },
  {
    id: "personalizado",
    name: "Personalizado",
    description: "Cartão com mensagem livre",
    price: 7.0,
    icon: "✨",
  },
];

// ─── WhatsApp ─────────────────────────────────────────────
export const WHATSAPP_NUMBER = "553388137539";