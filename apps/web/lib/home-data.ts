export type ProductSceneVariant =
  | "round"
  | "rectangle"
  | "runner"
  | "layered"
  | "oval"

export type IconKey =
  | "sparkles"
  | "shield"
  | "truck"
  | "leaf"
  | "palette"
  | "layers"
  | "swatchbook"
  | "message"

export interface ScenePalette {
  surface: string
  textile: string
  accent: string
  plate: string
  plateInner: string
  metal: string
  foliage: string
}

export interface ProductItem {
  id: string
  badge?: string
  category: string
  name: string
  description: string
  price: string
  installment: string
  rating: number
  reviews: number
  variant: ProductSceneVariant
  palette: ScenePalette
  swatches: string[]
}

export const whatsappContact = {
  href: "https://wa.me/5519996282121",
  displayNumber: "(19) 99628-2121",
} as const

export const navigationLinks = [
  { label: "Inicio", href: "#top", external: false },
  { label: "Produtos", href: "#produtos", external: false },
  { label: "Contato", href: "#contato", external: false },
] as const

export const topBarHighlights = [
  "Frete consultivo para todo o Brasil",
  "Peças com visual elegante e manutenção simples",
  "10% OFF na primeira compra com cadastro",
] as const

export const heroHighlights = [
  {
    title: "Composicoes versateis",
    description:
      "Mais de 120 combinacoes entre jogos americanos, sousplats e guardanapos.",
  },
  {
    title: "Curadoria de cores",
    description:
      "Paletas suaves, sofisticadas e alinhadas a ambientes contemporaneos.",
  },
  {
    title: "Texturas funcionais",
    description:
      "Materiais pensados para o dia a dia, sem abrir mao da elegancia.",
  },
] as const

export const serviceHighlights = [
  {
    icon: "sparkles" as const,
    title: "Acabamento premium",
    description:
      "Modelagens bem resolvidas, costura limpa e composicoes elegantes para todos os dias.",
  },
  {
    icon: "shield" as const,
    title: "Facil de cuidar",
    description:
      "Tecidos e tramas selecionados para limpar rapido e manter a mesa sempre bonita.",
  },
  {
    icon: "truck" as const,
    title: "Envio para todo o Brasil",
    description:
      "Estrutura pronta para escalar o ecommerce com backend no mesmo monorepo futuramente.",
  },
  {
    icon: "leaf" as const,
    title: "Estetica leve e atual",
    description:
      "Um visual simples, moderno e elegante inspirado na identidade da RM Textil.",
  },
] as const

export const collectionHighlights = [
  {
    icon: "palette" as const,
    title: "Colecao Duna",
    description:
      "Azuis profundos, areia clara e textura suave para mesas minimalistas.",
    colors: ["#24364D", "#7E97CD", "#DCC9B0"],
  },
  {
    icon: "layers" as const,
    title: "Essenciais",
    description:
      "Kits coordenados para quem quer praticidade sem perder refinamento.",
    colors: ["#E5DED4", "#B8C6DD", "#8A7B6B"],
  },
  {
    icon: "swatchbook" as const,
    title: "Botanica",
    description:
      "Verdes suaves e florais discretos para uma mesa acolhedora e contemporanea.",
    colors: ["#91A488", "#E8DCD0", "#E5B7B0"],
  },
] as const

export const products: ProductItem[] = [
  {
    id: "duna-azul",
    badge: "Novo",
    category: "Jogo Americano",
    name: "Jogo Americano Duna Azul",
    description:
      "Base redonda com composicao sofisticada e tons que valorizam loucas neutras.",
    price: "R$ 89,90",
    installment: "ou 3x de R$ 29,97",
    rating: 5,
    reviews: 38,
    variant: "round",
    palette: {
      surface: "#EEF2F7",
      textile: "#35506E",
      accent: "#6E87A3",
      plate: "#F7F2E9",
      plateInner: "#D5B28C",
      metal: "#1F3148",
      foliage: "#7B9472",
    },
    swatches: ["#35506E", "#6E87A3", "#F0E8DA", "#B5C3D6", "#D7C0A1"],
  },
  {
    id: "linho-areia",
    badge: "Best-seller",
    category: "Kit 4 Lugares",
    name: "Kit Linho Areia Natural",
    description:
      "Combinacao neutra, elegante e facil de harmonizar em mesas do dia a dia.",
    price: "R$ 189,90",
    installment: "ou 6x de R$ 31,65",
    rating: 5,
    reviews: 51,
    variant: "rectangle",
    palette: {
      surface: "#F4EFE8",
      textile: "#D8C5A9",
      accent: "#E9DDD0",
      plate: "#FBF7F0",
      plateInner: "#C7AD88",
      metal: "#6B5A49",
      foliage: "#96A88F",
    },
    swatches: ["#D8C5A9", "#FBF7F0", "#B9A28A", "#E9DDD0", "#96A88F"],
  },
  {
    id: "botanica-soft",
    category: "Sousplat",
    name: "Sousplat Botanica Soft",
    description:
      "Tons organicos e acabamento delicado para composicoes leves e acolhedoras.",
    price: "R$ 74,90",
    installment: "ou 2x de R$ 37,45",
    rating: 4,
    reviews: 24,
    variant: "oval",
    palette: {
      surface: "#F6F4EF",
      textile: "#A4B297",
      accent: "#E2D7CA",
      plate: "#F9F6F0",
      plateInner: "#D5B88D",
      metal: "#5F6F56",
      foliage: "#86A07E",
    },
    swatches: ["#A4B297", "#E2D7CA", "#F9F6F0", "#C5CCBC", "#D5B88D"],
  },
  {
    id: "riviera-marinho",
    badge: "Edicao especial",
    category: "Jogo Americano",
    name: "Riviera Marinho",
    description:
      "Design marcante com paleta azul profunda e textura que conversa com ambientes refinados.",
    price: "R$ 96,90",
    installment: "ou 3x de R$ 32,30",
    rating: 5,
    reviews: 29,
    variant: "runner",
    palette: {
      surface: "#EEF3F7",
      textile: "#24364D",
      accent: "#476786",
      plate: "#F8F4EC",
      plateInner: "#C9A57F",
      metal: "#E7EDF5",
      foliage: "#7D8F6E",
    },
    swatches: ["#24364D", "#476786", "#7E97CD", "#F8F4EC", "#C9A57F"],
  },
  {
    id: "fio-natural",
    category: "Guardanapo",
    name: "Guardanapo Fio Natural",
    description:
      "Leve, elegante e versatil para montar conjuntos coordenados com outros itens da colecao.",
    price: "R$ 42,90",
    installment: "ou 2x de R$ 21,45",
    rating: 4,
    reviews: 18,
    variant: "layered",
    palette: {
      surface: "#F7F1EA",
      textile: "#D8C8B6",
      accent: "#EFE4D7",
      plate: "#FBF8F4",
      plateInner: "#B89B7C",
      metal: "#A68E76",
      foliage: "#91A28C",
    },
    swatches: ["#D8C8B6", "#EFE4D7", "#FBF8F4", "#B89B7C", "#91A28C"],
  },
  {
    id: "jardim-calmo",
    badge: "Favorito",
    category: "Trilho de Mesa",
    name: "Trilho Jardim Calmo",
    description:
      "Estampa suave e contemporanea para montar uma mesa posta convidativa sem excesso visual.",
    price: "R$ 119,90",
    installment: "ou 4x de R$ 29,97",
    rating: 5,
    reviews: 33,
    variant: "runner",
    palette: {
      surface: "#FAF5EF",
      textile: "#E8D9CB",
      accent: "#C7D3BE",
      plate: "#FFFDF9",
      plateInner: "#D0B090",
      metal: "#7A6A5A",
      foliage: "#95A889",
    },
    swatches: ["#E8D9CB", "#C7D3BE", "#F3EDE6", "#95A889", "#D0B090"],
  },
  {
    id: "floral-rose",
    category: "Kit Mesa Posta",
    name: "Conjunto Floral Rose",
    description:
      "Uma composicao romantica e leve, equilibrada com base neutra e toque contemporaneo.",
    price: "R$ 154,90",
    installment: "ou 5x de R$ 30,98",
    rating: 5,
    reviews: 41,
    variant: "layered",
    palette: {
      surface: "#FCF6F4",
      textile: "#E8CFCF",
      accent: "#F3E1DA",
      plate: "#FFF9F7",
      plateInner: "#D8B3A4",
      metal: "#8C6E6A",
      foliage: "#B7C3A4",
    },
    swatches: ["#E8CFCF", "#F3E1DA", "#D8B3A4", "#B7C3A4", "#8C6E6A"],
  },
  {
    id: "salvia",
    category: "Jogo Americano",
    name: "Trama Verde Salvia",
    description:
      "Textura elegante com visual fresco, ideal para mesas claras e ambientes naturais.",
    price: "R$ 82,90",
    installment: "ou 2x de R$ 41,45",
    rating: 4,
    reviews: 16,
    variant: "rectangle",
    palette: {
      surface: "#F4F2EE",
      textile: "#9CAD9A",
      accent: "#DDE4D9",
      plate: "#F9F6F0",
      plateInner: "#C9AB88",
      metal: "#687D6A",
      foliage: "#80906D",
    },
    swatches: ["#9CAD9A", "#DDE4D9", "#F9F6F0", "#80906D", "#C9AB88"],
  },
  {
    id: "orvalho",
    badge: "Novo",
    category: "Mesa Posta",
    name: "Composicao Orvalho",
    description:
      "Mistura de texturas suaves e azuis acinzentados com leitura visual sofisticada.",
    price: "R$ 169,90",
    installment: "ou 6x de R$ 28,31",
    rating: 5,
    reviews: 27,
    variant: "oval",
    palette: {
      surface: "#F3F6FA",
      textile: "#B7C6D8",
      accent: "#D9E4EF",
      plate: "#FAF7F1",
      plateInner: "#CBB196",
      metal: "#54697F",
      foliage: "#8A9A7F",
    },
    swatches: ["#B7C6D8", "#D9E4EF", "#24364D", "#FAF7F1", "#CBB196"],
  },
  {
    id: "fendi",
    category: "Kit Coordenado",
    name: "Kit Minimal Fendi",
    description:
      "Neutros atemporais com design limpo para quem busca simplicidade com elegancia.",
    price: "R$ 142,90",
    installment: "ou 4x de R$ 35,72",
    rating: 4,
    reviews: 22,
    variant: "round",
    palette: {
      surface: "#F6F0E9",
      textile: "#C9BAA7",
      accent: "#E5D8CB",
      plate: "#FDF9F4",
      plateInner: "#BA9C78",
      metal: "#85715B",
      foliage: "#9AA184",
    },
    swatches: ["#C9BAA7", "#E5D8CB", "#FDF9F4", "#85715B", "#9AA184"],
  },
  {
    id: "patina",
    badge: "Facil limpeza",
    category: "Jogo Americano",
    name: "Americano Patina Impermeavel",
    description:
      "Pensado para rotina intensa, com aparencia sofisticada e toque funcional.",
    price: "R$ 92,90",
    installment: "ou 3x de R$ 30,97",
    rating: 5,
    reviews: 35,
    variant: "rectangle",
    palette: {
      surface: "#F1F5F6",
      textile: "#91A6AE",
      accent: "#D2DEE2",
      plate: "#FAF8F3",
      plateInner: "#CDAF8C",
      metal: "#51646C",
      foliage: "#7C948A",
    },
    swatches: ["#91A6AE", "#D2DEE2", "#FAF8F3", "#51646C", "#CDAF8C"],
  },
  {
    id: "classico-marfim",
    category: "Duo Coordenado",
    name: "Duo Classico Marfim",
    description:
      "Composicao clean para salas de jantar que pedem equilibrio, textura e elegancia.",
    price: "R$ 118,90",
    installment: "ou 4x de R$ 29,72",
    rating: 5,
    reviews: 20,
    variant: "layered",
    palette: {
      surface: "#F8F4EC",
      textile: "#E1D5C5",
      accent: "#F2EAE0",
      plate: "#FEFCF8",
      plateInner: "#CDB08B",
      metal: "#7E6E5C",
      foliage: "#A0AB93",
    },
    swatches: ["#E1D5C5", "#F2EAE0", "#FEFCF8", "#A0AB93", "#CDB08B"],
  },
]

export const editorialSections = [
  {
    title: "Jogo americano: praticidade, protecao e elegancia na mesa posta",
    paragraphs: [
      "Na RM Textil, o jogo americano funciona como base visual da composicao e como recurso pratico para o dia a dia. Ele organiza o lugar a mesa, protege a superficie e cria leitura mais sofisticada mesmo em producoes simples.",
      "Ao trocar toalhas amplas por bases coordenadas, a mesa fica mais leve, mais contemporanea e muito mais facil de manter no cotidiano da casa.",
    ],
    bullets: [
      "Valoriza loucas neutras ou coloridas sem competir com os outros elementos.",
      "Facilita a limpeza e a rotina de servir cafe, almoco ou jantar.",
      "Permite renovar a decoracao com pouco esforco e alto impacto visual.",
    ],
  },
  {
    title: "Formatos e kits: como escolher",
    paragraphs: [
      "Mesas compactas costumam funcionar melhor com formatos redondos ou retangulares de cantos suaves. Para mesas maiores, kits coordenados e trilhos de mesa ajudam a criar camadas e dar mais presenca visual.",
      "Quando a ideia e ter versatilidade, prefira paletas neutras e complemente com guardanapos, flores e loucas para variar o clima da composicao.",
    ],
    bullets: [
      "Redondos: leitura delicada e acolhedora.",
      "Retangulares: mais modernos e minimalistas.",
      "Kits coordenados: melhor custo visual para quem quer tudo harmonizado.",
    ],
  },
  {
    title: "Impermeavel e facil de limpar: qual a diferenca pratica?",
    paragraphs: [
      "No uso cotidiano, o mais importante e ter materiais que resistam bem ao toque, ao atrito e a limpeza frequente. Nem toda peca precisa ser totalmente impermeavel para entregar praticidade.",
      "Por isso, a proposta da RM Textil combina beleza com manutencao simples, priorizando texturas agradaveis e acabamentos que fazem sentido no uso real.",
    ],
    bullets: [
      "Limpeza rapida apos refeicoes leves.",
      "Boa estrutura para manter forma e acabamento.",
      "Mais conforto visual do que solucoes excessivamente plastificadas.",
    ],
  },
  {
    title: "Como montar a mesa com a assinatura RM Textil",
    paragraphs: [
      "Comece pela base: escolha o jogo americano ou o trilho principal. Em seguida, defina a louca, adicione um guardanapo coordenado e finalize com um elemento organico, como um arranjo delicado ou um porta-guardanapo discreto.",
      "O segredo do estilo da marca e equilibrar poucos elementos bem escolhidos, com boa respiracao entre as pecas e cores que conversem entre si.",
    ],
    bullets: [
      "Use no maximo uma cor de destaque por composicao.",
      "Misture texturas, nao excesso de estampas.",
      "Prefira volumes baixos para preservar conforto e leitura elegante.",
    ],
  },
] as const

export const faqItems = [
  {
    question: "As pecas da RM Textil sao pensadas para uso diario?",
    answer:
      "Sim. A proposta do frontend ja comunica esse posicionamento: produtos elegantes, mas com manutencao simples e leitura sofisticada para a rotina da casa.",
  },
  {
    question: "O site foi estruturado para receber backend depois?",
    answer:
      "Sim. A arquitetura separa dados, componentes e layout para facilitar integracao futura com catalogo, carrinho, autenticacao e painel administrativo dentro do mesmo monorepo.",
  },
  {
    question: "Posso trabalhar colecoes sazonais sem refazer o layout?",
    answer:
      "Pode. As secoes foram montadas com dados centralizados, entao novas colecoes, banners e vitrines podem ser atualizados por configuracao sem reescrever toda a pagina.",
  },
  {
    question: "Esse visual funciona bem no mobile?",
    answer:
      "Sim. O layout foi pensado como vitrine responsiva, com navegacao em sheet, cards adaptativos e hierarquia clara em telas pequenas.",
  },
] as const

export const footerLinkGroups = [
  {
    title: "Institucional",
    links: [
      "Sobre a RM Textil",
      "Nossa curadoria",
      "Entrega e trocas",
      "Politica de privacidade",
    ],
  },
  {
    title: "Colecoes",
    links: [
      "Jogos americanos",
      "Sousplats",
      "Guardanapos",
      "Trilhos",
      "Kits coordenados",
    ],
  },
  {
    title: "Atendimento",
    links: [
      "Segunda a sexta, 9h as 18h",
      "contato@rmtextil.com.br",
      whatsappContact.displayNumber,
      "Instagram e WhatsApp",
    ],
  },
] as const
