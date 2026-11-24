import { useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  QrCode,
} from 'lucide-react';
import {
  BAHRAIN_BRANCHES,
  BANNERS,
  CATEGORIES,
  type CategorySlug,
  formatBHD,
  PAYMENT_STRIP_IMAGE,
  PRODUCTS,
  type Product,
} from '../../data/catalog';
import { SmartImage } from '../SmartImage';
import { ModaHeader } from './ModaHeader';
import { ModaProductCard } from './ModaProductCard';

interface ModaHomepageProps {
  cartCount: number;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onOpenCart: () => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  activeCategory: CategorySlug | null;
  onSelectCategory: (slug: CategorySlug | null) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredProducts: Product[];
}

const MODA_HERO_SLIDES = [
  {
    id: 'moda-slide-1',
    kicker: 'CURATION',
    title: 'MODEST FOR\nEVERY DAY',
    subtitle:
      'Everyday Korean Nida abayas starting from BHD 2.500 across our 20 neighborhood branches in Bahrain.',
    ctaLabel: 'SHOP NOW',
    ctaHref: '#moda-special-offers',
    panelBg: 'bg-[#E10600]',
    leftImage: '/src/assets/images/prod_black_everyday_deal_1795022743132.jpg',
    rightImage: '/src/assets/images/prod_pleated_olive_abaya_1795022718536.jpg',
  },
  {
    id: 'moda-slide-2',
    kicker: 'NEW SEASON',
    title: 'CRAFTED FOR\nCOMFORT',
    subtitle:
      'Breathable washed linen cuts, kimono sleeves, and embroidered Bahraini jalabiyas ready for daily wear.',
    ctaLabel: 'SHOP NEW ARRIVALS',
    ctaHref: '#moda-new-arrivals',
    panelBg: 'bg-[#0A0A0A]',
    leftImage: '/src/assets/images/prod_mocha_belted_abaya_1795022720495.jpg',
    rightImage: '/src/assets/images/prod_linen_sand_abaya_1795022719718.jpg',
  },
  {
    id: 'moda-slide-3',
    kicker: 'OCCASION EDIT',
    title: 'EVENING &\nMAJLIS WEAR',
    subtitle:
      'Hand-beaded silk velvet abayas, antique gold zari organza bishts, and crystal-trimmed kaftans.',
    ctaLabel: 'EXPLORE EVENING',
    ctaHref: '#moda-evening-wear',
    panelBg: 'bg-[#B80500]',
    leftImage: '/src/assets/images/prod_evening_pearl_black_1795022721207.jpg',
    rightImage: '/src/assets/images/prod_evening_gold_bisht_1795022721410.jpg',
  },
];

export function ModaHomepage({
  cartCount,
  wishlistIds,
  onToggleWishlist,
  onOpenCart,
  onQuickAdd,
  onSelectProduct,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  filteredProducts,
}: ModaHomepageProps) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [specialOffset, setSpecialOffset] = useState(0);
  const [bestSellerOffset, setBestSellerOffset] = useState(0);
  const [newArrivalOffset, setNewArrivalOffset] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  const rotateArray = <T,>(arr: T[], offset: number): T[] => {
    if (arr.length === 0) return arr;
    const shift = ((offset % arr.length) + arr.length) % arr.length;
    return [...arr.slice(shift), ...arr.slice(0, shift)];
  };

  // Curated rows matching Moda Operandi 6-col & 3-col editorial cadence
  const specialOffersList = rotateArray(
    PRODUCTS.filter((p) => p.section === 'special-offers'),
    specialOffset
  );

  const trendingList = PRODUCTS.filter((p) => p.section === 'trending');

  const bestSellersBase = [
    ...PRODUCTS.filter((p) => p.section === 'best-sellers'),
    PRODUCTS.find((p) => p.id === 'sp-1')!,
    PRODUCTS.find((p) => p.id === 'sp-2')!,
    PRODUCTS.find((p) => p.id === 'tr-1')!,
  ].filter(Boolean);
  const bestSellersList = rotateArray(bestSellersBase, bestSellerOffset);

  const hotOffersList = PRODUCTS.filter((p) => p.section === 'hot-offers');

  const newArrivalsBase = [
    ...PRODUCTS.filter((p) => p.section === 'new-arrivals'),
    PRODUCTS.find((p) => p.id === 'tr-2')!,
    PRODUCTS.find((p) => p.id === 'tr-3')!,
    PRODUCTS.find((p) => p.id === 'sp-6')!,
  ].filter(Boolean);
  const newArrivalsList = rotateArray(newArrivalsBase, newArrivalOffset);

  const eveningWearList = PRODUCTS.filter((p) => p.section === 'evening-wear');

  const isFiltering = Boolean(
    activeCategory || searchQuery.trim() || showWishlistOnly
  );
  const displayFiltered = showWishlistOnly
    ? PRODUCTS.filter((p) => wishlistIds.includes(p.id))
    : filteredProducts;

  const activeSlide = MODA_HERO_SLIDES[heroIdx];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0A0A]">
      <ModaHeader
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        showingWishlistOnly={showWishlistOnly}
        onToggleWishlistFilter={() => setShowWishlistOnly((prev) => !prev)}
        onOpenCart={onOpenCart}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <main className="flex-1">
        {/* Conditional Filtered Results View */}
        {isFiltering && (
          <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 border-b border-black/10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#E10600] font-semibold">
                  {showWishlistOnly ? 'Saved Items' : 'Filtered Selection'}
                </p>
                <h2 className="font-display text-3xl font-normal text-[#0A0A0A] mt-1">
                  {showWishlistOnly
                    ? `Wishlist (${displayFiltered.length})`
                    : activeCategory
                    ? CATEGORIES.find((c) => c.id === activeCategory)?.name
                    : `Search: "${searchQuery}"`}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory(null);
                  onSearchChange('');
                  setShowWishlistOnly(false);
                }}
                className="px-4 py-2 border border-[#0A0A0A] text-[11px] uppercase tracking-[0.12em] font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors cursor-pointer"
              >
                Clear Filter
              </button>
            </div>

            {displayFiltered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
                {displayFiltered.map((product) => (
                  <ModaProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    onQuickAdd={onQuickAdd}
                    onSelectProduct={onSelectProduct}
                    showOutlineTag
                  />
                ))}
              </div>
            ) : (
              <div className="py-14 text-center border border-black/10">
                <p className="font-display text-2xl mb-2">No pieces found</p>
                <p className="text-xs text-neutral-500 mb-5">
                  Reset filters to explore all Bahrain collections from BHD 2.500.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(null);
                    onSearchChange('');
                    setShowWishlistOnly(false);
                  }}
                  className="px-5 py-2.5 bg-[#0A0A0A] text-white text-[11px] uppercase tracking-[0.12em] cursor-pointer"
                >
                  Show All Pieces
                </button>
              </div>
            )}
          </section>
        )}

        {/* 1. Hero Slider matching Moda Operandi Split-Flank + Centered Emerald Block */}
        <section aria-label="Featured Campaign Slider" className="relative w-full">
          <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[560px] grid grid-cols-1 md:grid-cols-3 overflow-hidden bg-[#F3F2EF]">
            {/* Left Image */}
            <div className="hidden md:block relative h-full overflow-hidden">
              <SmartImage
                src={activeSlide.leftImage}
                alt={activeSlide.title}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Center Editorial Block over Backdrop */}
            <div className="relative h-full overflow-hidden">
              <SmartImage
                src={BANNERS.hero.image}
                alt="MG Abayas Bahrain collection"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-4 sm:p-6">
                <div
                  className={`${activeSlide.panelBg} text-white w-full max-w-[360px] px-7 py-10 sm:py-12 text-center shadow-lg transition-colors duration-300`}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/85 mb-3">
                    {activeSlide.kicker}
                  </p>
                  <h1 className="font-display text-3xl sm:text-[40px] leading-[1.06] tracking-wide font-normal uppercase whitespace-pre-line mb-3">
                    {activeSlide.title}
                  </h1>
                  <p className="text-[12px] text-white/90 leading-relaxed mb-5 max-w-[260px] mx-auto">
                    {activeSlide.subtitle}
                  </p>
                  <a
                    href={activeSlide.ctaHref}
                    className="inline-block text-[11px] uppercase tracking-[0.16em] font-medium underline underline-offset-4 hover:text-white/80"
                  >
                    {activeSlide.ctaLabel}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:block relative h-full overflow-hidden">
              <SmartImage
                src={activeSlide.rightImage}
                alt={activeSlide.title}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Subtle Left/Right Slider Chevrons */}
            <button
              type="button"
              onClick={() =>
                setHeroIdx((prev) =>
                  prev === 0 ? MODA_HERO_SLIDES.length - 1 : prev - 1
                )
              }
              aria-label="Previous hero slide"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center text-[#0A0A0A]/80 hover:text-[#0A0A0A] bg-white/75 hover:bg-white transition-colors cursor-pointer z-10"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.3} />
            </button>
            <button
              type="button"
              onClick={() =>
                setHeroIdx((prev) =>
                  prev === MODA_HERO_SLIDES.length - 1 ? 0 : prev + 1
                )
              }
              aria-label="Next hero slide"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center text-[#0A0A0A]/80 hover:text-[#0A0A0A] bg-white/75 hover:bg-white transition-colors cursor-pointer z-10"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.3} />
            </button>
          </div>

          {/* 3 Pagination Dots below Slider */}
          <div className="flex items-center justify-center gap-2.5 py-4">
            {MODA_HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setHeroIdx(idx)}
                aria-label={`Hero slide ${idx + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors cursor-pointer ${
                  heroIdx === idx ? 'bg-[#0A0A0A]' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
        </section>

        {/* 2. SPECIAL OFFERS (6-Column Row matching "WHAT'S NEW") */}
        <section
          id="moda-special-offers"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-12"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-[28px] tracking-[0.06em] uppercase font-normal text-[#0A0A0A]">
              SPECIAL OFFERS
            </h2>
            <a
              href="#moda-hot-offers"
              className="inline-block mt-1.5 text-[11px] uppercase tracking-[0.14em] underline underline-offset-4 text-[#0A0A0A] hover:text-[#E10600]"
            >
              SHOP FROM BHD 2.500
            </a>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSpecialOffset((p) => p - 1)}
              aria-label="Previous special offers"
              className="hidden lg:flex absolute -left-3 top-[38%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-black/15 items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors shadow-xs cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {specialOffersList.map((product) => (
                <ModaProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickAdd={onQuickAdd}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSpecialOffset((p) => p + 1)}
              aria-label="Next special offers"
              className="hidden lg:flex absolute -right-3 top-[38%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-black/15 items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors shadow-xs cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </section>

        {/* 3. CATEGORIES (6-Column Arch-Topped Cards matching "WHAT'S NEXT") */}
        <section
          id="moda-categories"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-12"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-[28px] tracking-[0.06em] uppercase font-normal text-[#0A0A0A]">
              CATEGORIES
            </h2>
            <button
              type="button"
              onClick={() => onSelectCategory(null)}
              className="inline-block mt-1.5 text-[11px] uppercase tracking-[0.14em] underline underline-offset-4 text-[#0A0A0A] hover:text-[#E10600] cursor-pointer"
            >
              BROWSE ALL 6 CATEGORIES
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(isSelected ? null : category.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className="group flex flex-col items-center text-center cursor-pointer"
                >
                  {/* Signature Arch-Topped Photo matching Moda Operandi screenshot */}
                  <div
                    className={`w-full aspect-[3/4] rounded-t-full overflow-hidden bg-[#F4F3F0] mb-3 border transition-colors ${
                      isSelected ? 'border-[#E10600] ring-1 ring-[#E10600]' : 'border-transparent'
                    }`}
                  >
                    <SmartImage
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                    FROM {formatBHD(category.startingPrice)}
                  </span>
                  <h3 className="font-display text-base sm:text-lg uppercase tracking-wide text-[#0A0A0A] group-hover:text-[#E10600] mt-1">
                    {category.name}
                  </h3>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. TRENDING NOW (3-Column Tall Editorial Cards matching "THE LATEST LIST") */}
        <section
          id="moda-trending"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-12"
        >
          <h2 className="text-center text-xs sm:text-[13px] uppercase tracking-[0.22em] font-normal text-[#0A0A0A] mb-7">
            TRENDING NOW
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingList.map((item) => (
              <article key={item.id} className="group flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  className="w-full aspect-[3/4] overflow-hidden bg-[#F5F5F3] mb-4 cursor-pointer"
                >
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
                <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                  {item.tag || 'TRENDING IN BAHRAIN'}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-normal text-[#0A0A0A] mt-1.5 max-w-xs leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 mt-1 tabular-nums">
                  {formatBHD(item.price)}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  className="mt-2.5 text-[11px] uppercase tracking-[0.16em] underline underline-offset-4 text-[#0A0A0A] hover:text-[#E10600] cursor-pointer"
                >
                  SHOP NOW
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* 5. BEST SELLERS (6-Column Row with Outlined Rectangular Tags matching "HOLIDAYS AT HOME") */}
        <section
          id="moda-best-sellers"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-12"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-[28px] tracking-[0.06em] uppercase font-normal text-[#0A0A0A]">
              BEST SELLERS
            </h2>
            <a
              href="#moda-special-offers"
              className="inline-block mt-1.5 text-[11px] uppercase tracking-[0.14em] underline underline-offset-4 text-[#0A0A0A] hover:text-[#E10600]"
            >
              SHOP NOW
            </a>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setBestSellerOffset((p) => p - 1)}
              aria-label="Previous best sellers"
              className="hidden lg:flex absolute -left-3 top-[36%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-black/15 items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors shadow-xs cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {bestSellersList.map((product) => (
                <ModaProductCard
                  key={`bs-${product.id}`}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickAdd={onQuickAdd}
                  onSelectProduct={onSelectProduct}
                  showOutlineTag
                  outlineLabel={product.tag || 'BESTSELLER'}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setBestSellerOffset((p) => p + 1)}
              aria-label="Next best sellers"
              className="hidden lg:flex absolute -right-3 top-[36%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-black/15 items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors shadow-xs cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </section>

        {/* 6. HOT OFFERS (3-Column Tall Editorial Cards matching "BEYOND FASHION") */}
        <section
          id="moda-hot-offers"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-12"
        >
          <h2 className="text-center text-xs sm:text-[13px] uppercase tracking-[0.22em] font-normal text-[#0A0A0A] mb-7">
            HOT OFFERS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotOffersList.map((item) => (
              <article key={item.id} className="group flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  className="w-full aspect-[3/4] overflow-hidden bg-[#F5F5F3] mb-4 cursor-pointer"
                >
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#E10600] font-medium">
                  {item.tag || 'HOT OFFER'}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-normal text-[#0A0A0A] mt-1.5 max-w-xs leading-snug">
                  {item.title}
                </h3>
                <div className="mt-1 flex items-baseline gap-2 text-xs tabular-nums">
                  <span className="font-semibold text-[#0A0A0A]">
                    {formatBHD(item.price)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-neutral-400 line-through">
                      {formatBHD(item.originalPrice)}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onQuickAdd(item)}
                  className="mt-2.5 text-[11px] uppercase tracking-[0.16em] underline underline-offset-4 text-[#0A0A0A] hover:text-[#E10600] cursor-pointer"
                >
                  ADD OFFER TO BAG
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* 7. NEW ARRIVALS (6-Column Row with Out of Stock & Outlined Tags matching "OLYMPIA'S CLOSET") */}
        <section
          id="moda-new-arrivals"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-12"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-[28px] tracking-[0.06em] uppercase font-normal text-[#0A0A0A]">
              NEW ARRIVALS
            </h2>
            <a
              href="#moda-evening-wear"
              className="inline-block mt-1.5 text-[11px] uppercase tracking-[0.14em] underline underline-offset-4 text-[#0A0A0A] hover:text-[#E10600]"
            >
              SHOP NOW
            </a>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setNewArrivalOffset((p) => p - 1)}
              aria-label="Previous new arrivals"
              className="hidden lg:flex absolute -left-3 top-[36%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-black/15 items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors shadow-xs cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {newArrivalsList.map((product) => (
                <ModaProductCard
                  key={`na-${product.id}`}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickAdd={onQuickAdd}
                  onSelectProduct={onSelectProduct}
                  showOutlineTag
                  outlineLabel={
                    product.inStock === false ? 'OUT OF STOCK' : 'NEW SEASON'
                  }
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setNewArrivalOffset((p) => p + 1)}
              aria-label="Next new arrivals"
              className="hidden lg:flex absolute -right-3 top-[36%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-black/15 items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors shadow-xs cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </section>

        {/* 8. EVENING WEAR (3-Column Large Lookbook Cards matching "EDITOR'S PICKS") */}
        <section
          id="moda-evening-wear"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-10 pb-14 sm:pt-12 sm:pb-16"
        >
          <h2 className="text-center text-xs sm:text-[13px] uppercase tracking-[0.22em] font-normal text-[#0A0A0A] mb-7">
            EVENING WEAR
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eveningWearList.map((item) => (
              <article key={item.id} className="group flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  className="w-full aspect-[3/4] overflow-hidden bg-[#141414] mb-4 cursor-pointer"
                >
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    darkSurface
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide font-normal text-[#0A0A0A] max-w-xs leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 mt-1 tabular-nums">
                  {formatBHD(item.price)}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  className="mt-2 text-[11px] uppercase tracking-[0.16em] underline underline-offset-4 text-[#0A0A0A] hover:text-[#E10600] cursor-pointer"
                >
                  SHOP NOW
                </button>
              </article>
            ))}
          </div>

          {/* Secondary Compact Editorial Banner Row matching bottom lookbook strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <a
              href="#moda-special-offers"
              className="group relative aspect-[16/10] overflow-hidden bg-[#F4F3F0] block"
            >
              <SmartImage
                src={BANNERS.specialOffersWide.image}
                alt="Abayas under BHD 5.000"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-5 flex flex-col justify-end text-white text-center">
                <span className="font-display text-lg sm:text-xl uppercase tracking-wider">
                  ABAYAS FROM BHD 2.500
                </span>
              </div>
            </a>

            <a
              href="#moda-evening-wear"
              className="group relative aspect-[16/10] overflow-hidden bg-[#0A0A0A] block"
            >
              <SmartImage
                src={BANNERS.eveningSplit.image}
                alt="Evening Bisht Collection"
                darkSurface
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-5 flex flex-col justify-end text-white text-center">
                <span className="font-display text-lg sm:text-xl uppercase tracking-wider">
                  THE EVENING EDIT
                </span>
              </div>
            </a>

            <a
              href="#moda-categories"
              className="group relative aspect-[16/10] overflow-hidden bg-[#F4F3F0] block"
            >
              <SmartImage
                src={BANNERS.jalabiyaKaftanSplit.image}
                alt="Jalabiyas and Kaftans"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-5 flex flex-col justify-end text-white text-center">
                <span className="font-display text-lg sm:text-xl uppercase tracking-wider">
                  JALABIYA &amp; KAFTAN SHOP
                </span>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* 9. 100% White Footer matching Moda Operandi screenshot + Payment Strip */}
      <footer
        id="footer-branches"
        className="bg-white text-[#0A0A0A] border-t border-black/15"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-black/10">
            {/* Left: GET ON THE LIST Email Capture */}
            <div className="lg:col-span-4 max-w-sm">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] mb-2">
                GET ON THE LIST
              </h3>
              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                Sign up for weekly modest drops, 20-branch flash markdowns from BHD 2.500, and Eid couture previews.
              </p>

              {newsletterJoined ? (
                <div className="border border-[#E10600] bg-[#E10600]/5 px-3 py-2.5 text-xs text-[#E10600] font-medium">
                  Welcome to MG Abayas Bahrain alerts.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) {
                      setNewsletterJoined(true);
                      setNewsletterEmail('');
                    }
                  }}
                  className="flex items-stretch"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email Address"
                    aria-label="Email Address"
                    className="flex-1 h-10 px-3 border border-black/30 text-xs text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="w-10 h-10 bg-[#0A0A0A] hover:bg-[#E10600] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                  </button>
                </form>
              )}

              <p className="text-[10px] text-neutral-500 mt-2.5">
                *7-Day Branch Exchange Applies · Prices in BHD
              </p>
            </div>

            {/* Center: Niche Navigation Columns */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3">
                  Categories
                </h4>
                <ul className="space-y-2 text-neutral-600">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectCategory(cat.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="hover:text-[#0A0A0A] hover:underline cursor-pointer"
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3">
                  Collections
                </h4>
                <ul className="space-y-2 text-neutral-600">
                  <li><a href="#moda-special-offers" className="hover:text-[#0A0A0A] hover:underline">Special Offers (BHD 2.500)</a></li>
                  <li><a href="#moda-trending" className="hover:text-[#0A0A0A] hover:underline">Trending Now</a></li>
                  <li><a href="#moda-best-sellers" className="hover:text-[#0A0A0A] hover:underline">Best Sellers</a></li>
                  <li><a href="#moda-new-arrivals" className="hover:text-[#0A0A0A] hover:underline">New Arrivals</a></li>
                  <li><a href="#moda-hot-offers" className="hover:text-[#0A0A0A] hover:underline">Hot Offers</a></li>
                  <li><a href="#moda-evening-wear" className="hover:text-[#0A0A0A] hover:underline">Evening Wear</a></li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3">
                  Bahrain Branches
                </h4>
                <ul className="space-y-1.5 text-neutral-600 text-[11px]">
                  {BAHRAIN_BRANCHES.slice(0, 6).map((branch) => (
                    <li key={branch} className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-[#E10600] shrink-0" />
                      <span>{branch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: 20 Branches Locator QR Card matching "THE MODA APP" */}
            <div className="lg:col-span-2 flex flex-col items-start lg:items-end text-left lg:text-right">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2.5">
                20 BRANCHES
              </h4>
              <div className="p-2 border border-black/15 inline-flex items-center justify-center bg-white">
                <QrCode className="h-14 w-14 text-[#0A0A0A]" strokeWidth={1.2} />
              </div>
              <span className="text-[10px] text-neutral-500 mt-1.5">
                Same-day Bahrain pickup
              </span>
            </div>
          </div>

          {/* Payment Strip + Bottom Legal Row matching Moda Operandi White Footer */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-600">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-medium text-[#0A0A0A]">
                Kingdom of Bahrain (BHD) · English
              </span>
              <span className="hidden sm:inline text-neutral-300">|</span>
              <a href="#moda-special-offers" className="hover:text-[#0A0A0A]">Terms</a>
              <a href="#moda-categories" className="hover:text-[#0A0A0A]">Size Guide</a>
              <a href="#footer-branches" className="hover:text-[#0A0A0A]">7-Day Exchange</a>
            </div>

            {/* Payment Strip cleanly on white footer */}
            <div>
              <img
                src={PAYMENT_STRIP_IMAGE}
                alt="Accepted payments: Visa, MasterCard, Visa Debit, JCB, Benefit, PayGCC, Knet, mada, Amex, Apple Pay"
                className="h-5 sm:h-6 w-auto object-contain"
              />
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#footer-branches"
                aria-label="Instagram"
                className="text-[#0A0A0A] hover:text-[#E10600]"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <span>© 2026 MG Abayas (إم جي للعبايات). All Rights Reserved.</span>
            </div>
          </div>

          {/* Signature Centered Monogram at Bottom */}
          <div className="pt-6 text-center text-[11px] tracking-[0.45em] font-medium text-[#0A0A0A]">
            M · G
          </div>
        </div>
      </footer>
    </div>
  );
}
