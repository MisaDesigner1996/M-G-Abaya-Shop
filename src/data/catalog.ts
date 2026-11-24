export type CategorySlug =
  | 'abayas'
  | 'jalabiyas'
  | 'kaftan'
  | 'head-scarf'
  | 'prayer-clothing'
  | 'abaya-inner';

export type SectionKey =
  | 'special-offers'
  | 'trending'
  | 'best-sellers'
  | 'new-arrivals'
  | 'hot-offers'
  | 'evening-wear';

export interface CategoryItem {
  id: CategorySlug;
  name: string;
  startingPrice: number;
  itemCount: number;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  category: CategorySlug;
  categoryLabel: string;
  section: SectionKey;
  fabric: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  image: string;
  sizes: string[];
  description: string;
  inStock?: boolean;
  colors?: string[];
  viewsLast24h?: number;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export function formatBHD(amount: number): string {
  return `BHD ${amount.toFixed(3)}`;
}

export const BRAND_LOGO = '/assets/aistudio/MG-abaya-logo_7a6d73db.png';
export const PAYMENT_STRIP_IMAGE = '/assets/aistudio/PAYMENT_ICON_SET_WITH_ONE_IN_ROW_76f84159.png';

export const BANNERS = {
  hero: {
    image: '/src/assets/images/banner_hero_abaya_campaign_1795022713914.jpg',
    eyebrow: '20 Branches Across Bahrain',
    title: 'Everyday Modesty, Tailored for Value',
    subtitle:
      'Discover fast-moving Korean Nida abayas, breathable linen layers, and occasion pieces — with daily specials starting from BHD 2.500.',
    ctaLabel: 'Shop Offers From BHD 2.500',
    ctaTarget: '#special-offers',
  },
  heroModern: {
    image: '/src/assets/images/hero_modern_multi_abaya_1795023661201.jpg',
    eyebrow: 'Bahrain · 20 Neighborhood Branches',
    title: 'Modern Silhouettes. Everyday Bahrain Value.',
    subtitle:
      'Four signature cuts crafted for effortless drape — daily Korean Nida from BHD 2.500 to tailored linen and evening couture.',
  },
  specialOffersWide: {
    image: '/src/assets/images/banner_offer_two_fifty_1795022714694.jpg',
    kicker: 'In-Store & Online Value',
    title: 'Everyday Abayas From BHD 2.500',
    subtitle: 'Quick-selling classic black crepe and daily essentials stocked across all 20 branches.',
    ctaLabel: 'View Special Offers',
    ctaTarget: '#special-offers',
  },
  eveningSplit: {
    image: '/src/assets/images/banner_evening_wear_split_1795022715777.jpg',
    kicker: 'Evening Wear',
    title: 'Hand-Beaded Bisht & Couture Abayas',
    ctaLabel: 'Explore Evening Wear',
    ctaTarget: '#evening-wear',
  },
  jalabiyaKaftanSplit: {
    image: '/src/assets/images/banner_jalabiya_kaftan_split_1795022716342.jpg',
    kicker: 'Gulf Heritage',
    title: 'Embroidered Jalabiyas & Silk Kaftans',
    ctaLabel: 'Browse Categories',
    ctaTarget: '#categories',
  },
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'abayas',
    name: 'Abayas',
    startingPrice: 2.5,
    itemCount: 420,
    image: '/src/assets/images/cat_abayas_1795022715472.jpg',
    description: 'Daily crepe, butterfly bisht, and tailored open abayas.',
  },
  {
    id: 'jalabiyas',
    name: 'Jalabiyas',
    startingPrice: 4.5,
    itemCount: 165,
    image: '/src/assets/images/cat_jalabiyas_1795022716109.jpg',
    description: 'Embroidered Bahraini reception and home jalabiyas.',
  },
  {
    id: 'kaftan',
    name: 'Kaftan',
    startingPrice: 8.5,
    itemCount: 94,
    image: '/src/assets/images/cat_kaftan_1795022717032.jpg',
    description: 'Flowing silk and organza kaftans for gatherings.',
  },
  {
    id: 'head-scarf',
    name: 'Head Scarf',
    startingPrice: 1.5,
    itemCount: 280,
    image: '/src/assets/images/cat_head_scarf_1795022717184.jpg',
    description: 'Chiffon, laser-cut, and embroidered edge shaylas.',
  },
  {
    id: 'prayer-clothing',
    name: 'Prayer Clothing',
    startingPrice: 3.5,
    itemCount: 78,
    image: '/src/assets/images/cat_prayer_clothing_1795022718189.jpg',
    description: 'Breathable cotton two-piece prayer sets with attached hijab.',
  },
  {
    id: 'abaya-inner',
    name: 'Abaya Inner',
    startingPrice: 2.5,
    itemCount: 112,
    image: '/src/assets/images/cat_abaya_inner_1795022718268.jpg',
    description: 'Lightweight sleeveless and long-sleeve under-abaya slips.',
  },
];

export const PRODUCTS: Product[] = [
  // 1. Special Offers (Starting from BHD 2.500)
  {
    id: 'sp-1',
    title: 'Classic Everyday Nada Crepe Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'special-offers',
    fabric: 'Korean Nida · Includes Shayla',
    price: 2.5,
    originalPrice: 5.5,
    tag: 'From BHD 2.500',
    image: '/src/assets/images/prod_black_everyday_deal_1795022743132.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['#0A0A0A', '#3B2F2F', '#2B3A4A'],
    viewsLast24h: 18,
    description:
      'Our signature fast-selling daily black abaya cut from breathable Korean Nida with concealed snap placket and matching shayla.',
  },
  {
    id: 'sp-2',
    title: 'Sage Olive Pleated Sleeve Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'special-offers',
    fabric: 'Soft Matte Crepe',
    price: 3.9,
    originalPrice: 6.9,
    tag: 'Bestseller',
    image: '/src/assets/images/prod_pleated_olive_abaya_1795022718536.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['#6B7A5E', '#0A0A0A', '#A89F91'],
    description:
      'Lightweight everyday modest abaya featuring knife-pleated sleeve panels for effortless daytime movement.',
  },
  {
    id: 'sp-3',
    title: 'Slate Wrap-Front Satin Lapel Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'special-offers',
    fabric: 'Crepe & Satin Trim',
    price: 4.5,
    originalPrice: 7.5,
    tag: 'Value Pick',
    image: '/src/assets/images/prod_slate_wrap_abaya_1795022722754.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    viewsLast24h: 9,
    description:
      'Clean wrap silhouette with tonal satin collar trim and adjustable waist tie, ideal for work and university.',
  },
  {
    id: 'sp-4',
    title: 'Crimson-Border Chiffon Everyday Shayla',
    category: 'head-scarf',
    categoryLabel: 'Head Scarf',
    section: 'special-offers',
    fabric: 'Breathable Matte Chiffon',
    price: 1.5,
    originalPrice: 3.0,
    tag: '2-for-BHD 2.500 Deal',
    image: '/src/assets/images/prod_chiffon_shayla_set_1795022910546.jpg',
    sizes: ['Standard (200×75cm)'],
    colors: ['#0A0A0A', '#E10600', '#D6C7B2', '#4B5563'],
    description:
      'Non-slip daily chiffon head scarf finished with MG Abayas signature crimson contrast border.',
  },
  {
    id: 'sp-5',
    title: 'Sage Cotton Two-Piece Prayer Set',
    category: 'prayer-clothing',
    categoryLabel: 'Prayer Clothing',
    section: 'special-offers',
    fabric: '100% Cool Combed Cotton',
    price: 3.5,
    originalPrice: 6.0,
    tag: 'Save 42%',
    image: '/src/assets/images/prod_cotton_prayer_set_1795022912369.jpg',
    sizes: ['Free Size'],
    viewsLast24h: 11,
    description:
      'Cooling two-piece cotton prayer dress and wide pants with attached wrap hijab for home and travel.',
  },
  {
    id: 'sp-6',
    title: 'Stone Ivory Modal Long-Sleeve Inner Slip',
    category: 'abaya-inner',
    categoryLabel: 'Abaya Inner',
    section: 'special-offers',
    fabric: 'Soft Modal Jersey',
    price: 2.5,
    originalPrice: 4.9,
    tag: 'From BHD 2.500',
    image: '/src/assets/images/prod_cream_abaya_inner_1795022911288.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F5F5F0', '#0A0A0A', '#C9B9A6'],
    description:
      'Opaque, breathable full-length inner dress designed to layer cleanly beneath open-front abayas.',
  },

  // 2. Trending
  {
    id: 'tr-1',
    title: 'Crimson Piping Tailored Black Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'trending',
    fabric: 'Structured Lexus Crepe',
    price: 7.5,
    tag: 'Most Requested',
    image: '/src/assets/images/prod_crimson_trim_abaya_1795022720136.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    viewsLast24h: 14,
    description:
      'Crisp Mandarin-collar abaya finished with signature deep crimson piping along the front placket and cuffs.',
  },
  {
    id: 'tr-2',
    title: 'Sand Breathable Summer Linen Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'trending',
    fabric: '100% Washed Linen Blend',
    price: 8.9,
    tag: 'Trending',
    image: '/src/assets/images/prod_linen_sand_abaya_1795022719718.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['#D6C7B2', '#4E3629', '#0A0A0A', '#6E7B68'],
    description:
      'Airy open-front linen abaya tailored for Bahrain’s warm afternoons with tonal topstitching and deep pockets.',
  },
  {
    id: 'tr-3',
    title: 'Dusty Rose Double Chiffon Kimono',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'trending',
    fabric: 'Double-Layer Georgette Chiffon',
    price: 9.5,
    tag: 'Trending',
    image: '/src/assets/images/prod_dusty_rose_abaya_1795022719811.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['#B88A92', '#4A2545', '#0A0A0A'],
    description:
      'Fluid layered chiffon kimono abaya with graceful cascading drape and coordinated mauve shayla.',
  },

  // 3. Best Sellers
  {
    id: 'bs-1',
    title: 'Midnight Navy Butterfly Bisht Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'best-sellers',
    fabric: 'Fluid Silk Nida',
    price: 7.2,
    tag: 'Top Rated',
    image: '/src/assets/images/prod_butterfly_navy_abaya_1795022719104.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['#1E293B', '#0A0A0A', '#4B5563'],
    description:
      'Generous butterfly cut offering modest full coverage and cool airflow across all seasons.',
  },
  {
    id: 'bs-2',
    title: 'Tailored Jet Black Lapel Coat Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'best-sellers',
    fabric: 'Matte Korean Crepe',
    price: 6.5,
    tag: 'Bestseller',
    image: '/src/assets/images/prod_everyday_crepe_black_1795022718762.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    viewsLast24h: 23,
    description:
      'Structured blazer-lapel black abaya with covered fabric buttons, consistently our fastest-selling daily staple.',
  },
  {
    id: 'bs-3',
    title: 'Stone Taupe Pearl-Button Pleated Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'best-sellers',
    fabric: 'Textured Crinkle Crepe',
    price: 8.2,
    tag: 'Best Seller',
    image: '/src/assets/images/prod_ivory_pearl_shayla_abaya_1795022744559.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['#C2B5A7', '#0A0A0A'],
    description:
      'Wrinkle-resistant pleated front abaya with subtle pearl-finish buttons and matching chiffon scarf.',
  },

  // 4. New Arrivals
  {
    id: 'na-1',
    title: 'Mocha Belted Trench Modest Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'new-arrivals',
    fabric: 'Twill Gabardine Crepe',
    price: 11.5,
    tag: 'New Arrival',
    image: '/src/assets/images/prod_mocha_belted_abaya_1795022720495.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['#7C5D49', '#0A0A0A', '#D6C7B2'],
    description:
      'Contemporary trench-inspired abaya with tortoiseshell buttons, storm flap, and matching waist belt.',
  },
  {
    id: 'na-2',
    title: 'Deep Plum Wide Kimono Crepe Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'new-arrivals',
    fabric: 'Premium Korean Crepe',
    price: 7.9,
    tag: 'Out of Stock',
    inStock: false,
    image: '/src/assets/images/prod_plum_kimono_abaya_1795022742481.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    description:
      'Rich aubergine everyday abaya with relaxed wide kimono sleeves and matching head scarf.',
  },
  {
    id: 'na-3',
    title: 'Espresso Linen Contrast-Stitch Abaya',
    category: 'abaya-inner',
    categoryLabel: 'Abayas & Inners',
    section: 'new-arrivals',
    fabric: 'Organic Linen Weave',
    price: 10.25,
    tag: 'New Arrival',
    image: '/src/assets/images/prod_espresso_linen_abaya_1795022743350.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    viewsLast24h: 8,
    description:
      'Open-front espresso brown linen abaya accented with crisp ivory contrast stitching and rolled cuffs.',
  },

  // 5. Hot Offers
  {
    id: 'ho-1',
    title: 'Charcoal French Lace Bell-Sleeve Abaya',
    category: 'abayas',
    categoryLabel: 'Abayas',
    section: 'hot-offers',
    fabric: 'Crepe & Corded Lace',
    price: 5.9,
    originalPrice: 10.5,
    tag: 'Hot Offer · 44% Off',
    image: '/src/assets/images/prod_charcoal_lace_abaya_1795022722189.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    viewsLast24h: 16,
    description:
      'Deep charcoal abaya elevated with tonal black French floral lace detailing along flared bell sleeves.',
  },
  {
    id: 'ho-2',
    title: 'Maroon Silver-Embroidered Bahraini Jalabiya',
    category: 'jalabiyas',
    categoryLabel: 'Jalabiyas',
    section: 'hot-offers',
    fabric: 'Soft Rayon Crepe',
    price: 4.75,
    originalPrice: 8.5,
    tag: 'Hot Offer · 44% Off',
    image: '/src/assets/images/prod_maroon_embroidered_jalabiya_1795022744642.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#7F1D1D', '#1E3A5F', '#065F46'],
    description:
      'Traditional crimson maroon reception jalabiya adorned with silver geometric threadwork down the center panel.',
  },
  {
    id: 'ho-3',
    title: 'Champagne Organza Festive Kaftan',
    category: 'kaftan',
    categoryLabel: 'Kaftan',
    section: 'hot-offers',
    fabric: 'Silk Organza & Slip',
    price: 9.5,
    originalPrice: 16.5,
    tag: 'Hot Offer · 42% Off',
    image: '/src/assets/images/prod_silver_shimmer_kaftan_1795022744648.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    viewsLast24h: 7,
    description:
      'Luminous champagne-silver organza kaftan complete with matching inner dress and delicate metallic neckline.',
  },

  // 6. Evening Wear
  {
    id: 'ew-1',
    title: 'Black Velvet Pearl-Cuff Evening Abaya',
    category: 'abayas',
    categoryLabel: 'Evening Wear',
    section: 'evening-wear',
    fabric: 'Silk Velvet & Hand Beadwork',
    price: 24.5,
    tag: 'Evening Couture',
    image: '/src/assets/images/prod_evening_pearl_black_1795022721207.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    viewsLast24h: 12,
    description:
      'Opulent jet black silk velvet occasion abaya featuring hand-sewn pearl and crystal embroidery at the cuffs.',
  },
  {
    id: 'ew-2',
    title: 'Antique Gold Zari Organza Bisht Abaya',
    category: 'kaftan',
    categoryLabel: 'Evening Wear',
    section: 'evening-wear',
    fabric: 'Sheer Organza & Satin Inner',
    price: 29.0,
    tag: 'Signature Occasion',
    image: '/src/assets/images/prod_evening_gold_bisht_1795022721410.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['#0A0A0A', '#B89758'],
    description:
      'Regal layered bisht abaya crafted in sheer black organza with intricate antique gold zari border embroidery.',
  },
  {
    id: 'ew-3',
    title: 'Emerald Satin Crystal-Neckline Kaftan',
    category: 'kaftan',
    categoryLabel: 'Evening Wear',
    section: 'evening-wear',
    fabric: 'Heavy Silk Satin',
    price: 22.75,
    tag: 'Eid & Majlis Edit',
    image: '/src/assets/images/prod_evening_emerald_kaftan_1795022721957.jpg',
    sizes: ['52', '54', '56', '58', '60'],
    viewsLast24h: 5,
    description:
      'Jewel-toned emerald satin evening kaftan with cape sleeves and hand-applied silver crystal neckline.',
  },
];

export const BAHRAIN_BRANCHES = [
  'Manama Souq Flagship',
  'Riffa Bookwara Avenue',
  'Muharraq Central Souq',
  'Isa Town Traditional Market',
  'Seef District Boutique',
  'Sitra Mall Branch',
  'Juffair Oasis',
  'Hamad Town Souq Waqif',
  'Budaiya Highway',
  'Arad Galleria',
];
