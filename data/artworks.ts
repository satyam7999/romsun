export type ArtCategory =
  | "All"
  | "Abstract"
  | "Minimalist"
  | "Triptychs"
  | "Botanical"
  | "Large Scale";

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  dimensions: string;
  price: number;
  category: Exclude<ArtCategory, "All">;
  imageUrl: string;
  edition: string;
  tag: "featured" | "new";
  featured: boolean;
  isNewArrival: boolean;
  span?: "wide" | "standard";
  chapterId: string;
}

export interface Chapter {
  id: string;
  number: string;
  watermarkNumber: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  quoteAttribution: string;
  curationLabel: string;
  paletteLabel: string;
  isDarkLeftPanel?: boolean;
  theme: "warmth" | "nordic" | "gilded" | "botanical";
  accentColor: string;
  bannerBgLeft: string;
  bannerBgRight: string;
  bannerTextColor: string;
  bannerImage: string;
  bannerArtworkCaption: string;
}

export interface SlideItem {
  id: string;
  title: string;
  medium: string;
  dimensions: string;
  price: number;
  artist: string;
  edition: string;
  moodColor: string;
  imageUrl: string;
  category: Exclude<ArtCategory, "All">;
}

export const ART_CATEGORIES: Exclude<ArtCategory, "All">[] = [
  "Abstract",
  "Minimalist",
  "Triptychs",
  "Botanical",
  "Large Scale",
];

export const SPOTLIGHT_TRIPTYCH = {
  id: "spotlight-crimson-horizon",
  title: "Crimson Horizon — Three-Act Architectural Study",
  artist: "Elena Vance & Atelier Rom Sun",
  dimensions: '72" × 36" (3 Panels · 24" × 36" each)',
  price: 289,
  edition: "Limited Edition · 14 of 50",
  medium: "Museum-Grade Archival Giclée on Belgian Linen, Floating Walnut Frame",
  panels: [
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85",
  ],
  roomPreviewUrl:
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85",
};

export const EXHIBITION_SLIDES: SlideItem[] = [
  {
    id: "ex-01",
    title: "Crimson Horizon",
    medium: "Oil & Gold Leaf on Canvas",
    dimensions: "120 × 180 cm",
    price: 420,
    artist: "Elena Vance",
    edition: "Edition 04 / 25",
    moodColor: "rgba(200, 35, 44, 0.34)",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=85",
    category: "Large Scale",
  },
  {
    id: "ex-02",
    title: "Monolith in Silence",
    medium: "Textured Plaster Relief",
    dimensions: "110 × 150 cm",
    price: 380,
    artist: "Henrik Vestergaard",
    edition: "Edition 09 / 30",
    moodColor: "rgba(92, 100, 112, 0.38)",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    category: "Minimalist",
  },
  {
    id: "ex-03",
    title: "Velvet Dusk",
    medium: "Abstract Expressionist Triptych",
    dimensions: "150 × 100 cm",
    price: 540,
    artist: "Camille Laurent",
    edition: "Edition 02 / 15",
    moodColor: "rgba(196, 164, 89, 0.30)",
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=85",
    category: "Triptychs",
  },
  {
    id: "ex-04",
    title: "Gilded Fracture",
    medium: "Charcoal & 24k Gold Accent",
    dimensions: "130 × 170 cm",
    price: 490,
    artist: "Marcello Rossi",
    edition: "Edition 07 / 20",
    moodColor: "rgba(212, 175, 55, 0.32)",
    imageUrl:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1400&q=85",
    category: "Abstract",
  },
  {
    id: "ex-05",
    title: "Noir Botanical Study",
    medium: "Museum Archival Print",
    dimensions: "100 × 140 cm",
    price: 310,
    artist: "Nadia Vermeer",
    edition: "Edition 11 / 40",
    moodColor: "rgba(138, 132, 56, 0.34)",
    imageUrl:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85",
    category: "Botanical",
  },
];

export const COLLECTION_CHAPTERS: Chapter[] = [
  {
    id: "chapter-01",
    number: "Chapter 01",
    watermarkNumber: "01",
    kicker: "CHAPTER 01 — CURATORIAL NOTE",
    title: "Avant-Garde Warmth",
    subtitle: "Ochre, Burnt Sienna & Sculptural Form",
    description:
      "Sun-drenched mineral pigments collide with brutalist architectural shadows, bringing tactile warmth to expansive contemporary living spaces.",
    quote:
      "Art does not merely fill a wall—it anchors the silence of a room and turns light, shadow, and memory into a living space.",
    quoteAttribution: "— ROM SUN ATELIER, EDITION IV",
    curationLabel: "12 Limited Works",
    paletteLabel: "Ochre · Obsidian · Warm Ivory",
    theme: "warmth",
    accentColor: "#C4A459",
    bannerBgLeft: "#C4A459",
    bannerBgRight: "#141414",
    bannerTextColor: "#121212",
    bannerImage:
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1400&q=85",
    bannerArtworkCaption: 'Solstice Study IV · 48" × 60"',
  },
  {
    id: "chapter-02",
    number: "Chapter 02",
    watermarkNumber: "02",
    kicker: "CHAPTER 02 — CURATORIAL NOTE",
    title: "Nordic Minimalist",
    subtitle: "Cool Slate, Limestone & Quiet Geometry",
    description:
      "Restrained tonal compositions inspired by Scandinavian concrete galleries, soft northern light, and serene negative space.",
    quote:
      "In the quiet geometry of stone and northern daylight, restraint becomes the boldest form of architectural expression.",
    quoteAttribution: "— ROM SUN ATELIER, NORDIC FOLIO",
    curationLabel: "9 Limited Works",
    paletteLabel: "Cool Slate · Limestone · Chalk",
    theme: "nordic",
    accentColor: "#5C6470",
    bannerBgLeft: "#B8C0CA",
    bannerBgRight: "#F2F3F5",
    bannerTextColor: "#121212",
    bannerImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    bannerArtworkCaption: 'Oslo Monolith II · 40" × 56"',
  },
  {
    id: "chapter-03",
    number: "Chapter 03",
    watermarkNumber: "03",
    kicker: "CHAPTER 03 — CURATORIAL NOTE",
    title: "Gilded Abstraction",
    subtitle: "24K Gold Leaf, Obsidian & Chiaroscuro",
    description:
      "Luminous metallic brushwork suspended against deep obsidian matte grounds—crafted to catch ambient evening gallery lighting.",
    quote:
      "Where 24-karat leaf meets matte obsidian, every passing hour transforms the canvas into a living study of reflection.",
    quoteAttribution: "— ROM SUN ATELIER, GILDED ARCHIVE",
    curationLabel: "10 Limited Works",
    paletteLabel: "24K Gold · Obsidian · Raw Umber",
    isDarkLeftPanel: true,
    theme: "gilded",
    accentColor: "#D4AF37",
    bannerBgLeft: "#111111",
    bannerBgRight: "#1E1A12",
    bannerTextColor: "#FFFFFF",
    bannerImage:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1400&q=85",
    bannerArtworkCaption: 'Aurelia Nocturne · 54" × 72"',
  },
  {
    id: "chapter-04",
    number: "Chapter 04",
    watermarkNumber: "04",
    kicker: "CHAPTER 04 — CURATORIAL NOTE",
    title: "Noir Botanical",
    subtitle: "Deep Olive, Shadow Flora & Organic Silk",
    description:
      "Moody nocturnal herbarium studies rendered with velvety olive undertones and dramatic chiaroscuro depth.",
    quote:
      "Botanical form stripped of daylight reveals a quieter truth—organic silhouette suspended in velvet shadow.",
    quoteAttribution: "— ROM SUN ATELIER, HERBARIUM STUDY",
    curationLabel: "8 Limited Works",
    paletteLabel: "Deep Olive · Charcoal · Moss",
    theme: "botanical",
    accentColor: "#8A8438",
    bannerBgLeft: "#9C9648",
    bannerBgRight: "#121212",
    bannerTextColor: "#121212",
    bannerImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    bannerArtworkCaption: 'Verdant Shadow IX · 36" × 48"',
  },
];

export const ARTWORKS: Artwork[] = [
  // Chapter 01: Avant-Garde Warmth
  {
    id: "aw-01",
    title: "Terracotta Meridian",
    artist: "Mateo Solis",
    dimensions: '48" × 60"',
    price: 420,
    category: "Large Scale",
    imageUrl:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=85",
    edition: "Edition of 30",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "wide",
    chapterId: "chapter-01",
  },
  {
    id: "aw-02",
    title: "Amber Brutalism No. 3",
    artist: "Clara Lindqvist",
    dimensions: '32" × 44"',
    price: 265,
    category: "Abstract",
    imageUrl:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85",
    edition: "Open Studio",
    tag: "new",
    featured: true,
    isNewArrival: true,
    span: "standard",
    chapterId: "chapter-01",
  },
  {
    id: "aw-03",
    title: "Sienna Equilibrium",
    artist: "Julian Moreau",
    dimensions: '36" × 48"',
    price: 310,
    category: "Abstract",
    imageUrl:
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=900&q=85",
    edition: "Edition of 50",
    tag: "new",
    featured: false,
    isNewArrival: true,
    span: "standard",
    chapterId: "chapter-01",
  },
  {
    id: "aw-04",
    title: "Ochre Pavilion Study",
    artist: "Sora Takahashi",
    dimensions: '40" × 40"',
    price: 340,
    category: "Minimalist",
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=85",
    edition: "Edition of 25",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "standard",
    chapterId: "chapter-01",
  },
  {
    id: "aw-05",
    title: "Sunlit Travertine Diptych",
    artist: "Elena Vance",
    dimensions: '60" × 36"',
    price: 495,
    category: "Triptychs",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    edition: "Edition of 20",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "wide",
    chapterId: "chapter-01",
  },

  // Chapter 02: Nordic Minimalist
  {
    id: "nm-01",
    title: "Bergen Silence",
    artist: "Henrik Vestergaard",
    dimensions: '50" × 64"',
    price: 460,
    category: "Large Scale",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    edition: "Edition of 35",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "wide",
    chapterId: "chapter-02",
  },
  {
    id: "nm-02",
    title: "Limestone Relief I",
    artist: "Freja Holm",
    dimensions: '28" × 38"',
    price: 225,
    category: "Minimalist",
    imageUrl:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=85",
    edition: "Open Studio",
    tag: "new",
    featured: true,
    isNewArrival: true,
    span: "standard",
    chapterId: "chapter-02",
  },
  {
    id: "nm-03",
    title: "Slate & Plaster Forms",
    artist: "Kasper Nørgaard",
    dimensions: '36" × 48"',
    price: 295,
    category: "Minimalist",
    imageUrl:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=900&q=85",
    edition: "Edition of 40",
    tag: "new",
    featured: false,
    isNewArrival: true,
    span: "standard",
    chapterId: "chapter-02",
  },
  {
    id: "nm-04",
    title: "Fjord Geometry",
    artist: "Astrid Lind",
    dimensions: '30" × 40"',
    price: 245,
    category: "Abstract",
    imageUrl:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=900&q=85",
    edition: "Open Studio",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "standard",
    chapterId: "chapter-02",
  },
  {
    id: "nm-05",
    title: "Nordic Chalk Horizon",
    artist: "Freja Holm",
    dimensions: '42" × 54"',
    price: 350,
    category: "Minimalist",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    edition: "Edition of 30",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "standard",
    chapterId: "chapter-02",
  },

  // Chapter 03: Gilded Abstraction
  {
    id: "ga-01",
    title: "Obsidian & Gold Leaf IV",
    artist: "Marcello Rossi",
    dimensions: '54" × 72"',
    price: 580,
    category: "Large Scale",
    imageUrl:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    edition: "Edition of 15",
    tag: "new",
    featured: true,
    isNewArrival: true,
    span: "wide",
    chapterId: "chapter-03",
  },
  {
    id: "ga-02",
    title: "Gilded Horizon Study",
    artist: "Camille Laurent",
    dimensions: '36" × 48"',
    price: 365,
    category: "Abstract",
    imageUrl:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=900&q=85",
    edition: "Edition of 30",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "standard",
    chapterId: "chapter-03",
  },
  {
    id: "ga-03",
    title: "Byzantine Echoes Triptych",
    artist: "Elena Vance",
    dimensions: '66" × 32"',
    price: 510,
    category: "Triptychs",
    imageUrl:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85",
    edition: "Edition of 25",
    tag: "new",
    featured: false,
    isNewArrival: true,
    span: "standard",
    chapterId: "chapter-03",
  },
  {
    id: "ga-04",
    title: "Pyrite Chiaroscuro",
    artist: "Lukas Weber",
    dimensions: '32" × 44"',
    price: 325,
    category: "Abstract",
    imageUrl:
      "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=900&q=85",
    edition: "Edition of 40",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "standard",
    chapterId: "chapter-03",
  },
  {
    id: "ga-05",
    title: "Sovereign Brass Suite",
    artist: "Atelier Rom Sun",
    dimensions: '48" × 60"',
    price: 475,
    category: "Large Scale",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85",
    edition: "Edition of 20",
    tag: "new",
    featured: true,
    isNewArrival: true,
    span: "wide",
    chapterId: "chapter-03",
  },
  {
    id: "ga-06",
    title: "Aurelia Three-Act Triptych",
    artist: "Camille Laurent",
    dimensions: '72" × 36"',
    price: 560,
    category: "Triptychs",
    imageUrl:
      "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=1400&q=85",
    edition: "Edition of 18",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "standard",
    chapterId: "chapter-03",
  },

  // Chapter 04: Noir Botanical
  {
    id: "nb-01",
    title: "Olive Herbarium Nocturne",
    artist: "Nadia Vermeer",
    dimensions: '48" × 64"',
    price: 440,
    category: "Botanical",
    imageUrl:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=85",
    edition: "Edition of 25",
    tag: "new",
    featured: true,
    isNewArrival: true,
    span: "wide",
    chapterId: "chapter-04",
  },
  {
    id: "nb-02",
    title: "Velvet Fig Silhouette",
    artist: "Arthur Pendelton",
    dimensions: '30" × 42"',
    price: 255,
    category: "Botanical",
    imageUrl:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=900&q=85",
    edition: "Open Studio",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "standard",
    chapterId: "chapter-04",
  },
  {
    id: "nb-03",
    title: "Shadow Monstera Study",
    artist: "Nadia Vermeer",
    dimensions: '36" × 48"',
    price: 290,
    category: "Botanical",
    imageUrl:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85",
    edition: "Edition of 50",
    tag: "new",
    featured: false,
    isNewArrival: true,
    span: "standard",
    chapterId: "chapter-04",
  },
  {
    id: "nb-04",
    title: "Cypress & Charcoal Trio",
    artist: "Elena Vance",
    dimensions: '60" × 30"',
    price: 410,
    category: "Triptychs",
    imageUrl:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=85",
    edition: "Edition of 30",
    tag: "new",
    featured: true,
    isNewArrival: true,
    span: "standard",
    chapterId: "chapter-04",
  },
  {
    id: "nb-05",
    title: "Midnight Fern Folio",
    artist: "Arthur Pendelton",
    dimensions: '34" × 46"',
    price: 315,
    category: "Botanical",
    imageUrl:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=85",
    edition: "Edition of 35",
    tag: "featured",
    featured: true,
    isNewArrival: false,
    span: "standard",
    chapterId: "chapter-04",
  },
];
