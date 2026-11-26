export interface NavLink {
  label: string;
  targetId: string;
}

export interface VipVoucher {
  id: string;
  amount: number;
  label: string;
  minSpend: string;
  code: string;
}

export interface FooterServiceItem {
  id: string;
  iconName: "award" | "globe" | "shield" | "frame";
  title: string;
  desc: string;
}

export const NAV_LINKS_LEFT: NavLink[] = [
  { label: "Collections", targetId: "collections" },
  { label: "Curated", targetId: "spotlight" },
  { label: "Editorial", targetId: "chapter-01" },
];

export const VIP_VOUCHERS: VipVoucher[] = [
  {
    id: "vip-10",
    amount: 10,
    label: "$10 OFF",
    minSpend: "Orders $120+",
    code: "ROMSUN10",
  },
  {
    id: "vip-20",
    amount: 20,
    label: "$20 OFF",
    minSpend: "Orders $220+",
    code: "ROMSUN20",
  },
  {
    id: "vip-50",
    amount: 50,
    label: "$50 OFF",
    minSpend: "Orders $450+",
    code: "ROMSUN50",
  },
  {
    id: "vip-100",
    amount: 100,
    label: "$100 OFF",
    minSpend: "Orders $850+",
    code: "ROMSUN100",
  },
  {
    id: "vip-200",
    amount: 200,
    label: "$200 OFF",
    minSpend: "Orders $1,500+",
    code: "ROMSUN200",
  },
];

export const FOOTER_SERVICES: FooterServiceItem[] = [
  {
    id: "museum-canvas",
    iconName: "award",
    title: "Museum-Grade Canvas",
    desc: "400gsm Belgian linen with 100-year archival pigment inks.",
  },
  {
    id: "white-glove",
    iconName: "globe",
    title: "Global White-Glove Delivery",
    desc: "Custom-crated climate-safe shipping to 45+ countries.",
  },
  {
    id: "home-trial",
    iconName: "shield",
    title: "30-Day Home Trial",
    desc: "Experience the work in your natural light, risk-free.",
  },
  {
    id: "bespoke-framing",
    iconName: "frame",
    title: "Bespoke Framing",
    desc: "Hand-milled American walnut, brushed brass & matte gallery oak.",
  },
];

export const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: "Collections", href: "#collections" },
  { label: "Triptych Spotlight", href: "#spotlight" },
  { label: "VIP Vouchers", href: "#vip-offers" },
];
