import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MapPin,
  MessageSquare,
  ShoppingBag,
} from 'lucide-react';
import {
  BAHRAIN_BRANCHES,
  BANNERS,
  BRAND_LOGO,
  CATEGORIES,
  type CategorySlug,
  PAYMENT_STRIP_IMAGE,
  PRODUCTS,
  type Product,
} from '../../data/catalog';
import { SmartImage } from '../SmartImage';
import { FarfetchHeader } from './FarfetchHeader';
import { FarfetchProductCard } from './FarfetchProductCard';

interface FarfetchHomepageProps {
  cartCount: number;
  onOpenCart: () => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  activeCategory: CategorySlug | null;
  onSelectCategory: (slug: CategorySlug | null) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredProducts: Product[];
}

const HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'Everyday Abayas From BHD 2.500',
    subtitle:
      'Quick-selling Korean Nida silhouettes, breathable linen layers, and daily essentials across our 20 Bahrain branches.',
    ctaLabel: 'Shop Offers',
    ctaHref: '#special-offers',
    image: BANNERS.hero.image,
  },
  {
    id: 'slide-2',
    title: 'The New Season Edit',
    subtitle:
      'Tailored coat abayas, kimono drapes, and Gulf heritage jalabiyas crafted for effortless daily comfort.',
    ctaLabel: 'Shop New Arrivals',
    ctaHref: '#new-arrivals',
    image: BANNERS.heroModern.image,
  },
  {
    id: 'slide-3',
    title: 'Evening Wear & Occasion Bisht',
    subtitle:
      'Hand-beaded silk velvet and antique gold organza bisht abayas tailored for Majlis and Eid gatherings.',
    ctaLabel: 'Explore Evening',
    ctaHref: '#evening-wear',
    image: BANNERS.eveningSplit.image,
  },
];

export function FarfetchHomepage({
  cartCount,
  onOpenCart,
  onQuickAdd,
  onSelectProduct,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  filteredProducts,
}: FarfetchHomepageProps) {
  const [heroSlide, setHeroSlide] = useState(0);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSignedUp, setNewsletterSignedUp] = useState(false);

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Partition 21 unique products with zero duplicate images across sections
  const newArrivalsRow = [
    ...PRODUCTS.filter((p) => p.section === 'new-arrivals'),
    PRODUCTS.find((p) => p.id === 'sp-6')!,
  ].filter(Boolean);

  const specialOffersRow = PRODUCTS.filter(
    (p) => p.section === 'special-offers'
  ).slice(0, 4);

  const trendingGrid = [
    ...PRODUCTS.filter((p) => p.section === 'trending'),
    PRODUCTS.find((p) => p.id === 'sp-5')!,
  ].filter(Boolean);

  const bestSellersRow = PRODUCTS.filter((p) => p.section === 'best-sellers');
  const hotOffersRow = PRODUCTS.filter((p) => p.section === 'hot-offers');
  const eveningWearRow = PRODUCTS.filter((p) => p.section === 'evening-wear');

  const isFiltering = Boolean(
    activeCategory || searchQuery.trim() || showWishlistOnly
  );
  const displayFiltered = showWishlistOnly
    ? PRODUCTS.filter((p) => wishlistIds.includes(p.id))
    : filteredProducts;

  const activeSlide = HERO_SLIDES[heroSlide];

  const handlePrevSlide = () => {
    setHeroSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };
  const handleNextSlide = () => {
    setHeroSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0A0A]">
      <FarfetchHeader
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        showingWishlistOnly={showWishlistOnly}
        onToggleWishlistFilter={() => setShowWishlistOnly((prev) => !prev)}
        onOpenCart={onOpenCart}
        activeCategory={activeCategory}
        onSelectCategory={(slug) => {
          setShowWishlistOnly(false);
          onSelectCategory(slug);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setShowWishlistOnly(false);
          onSearchChange(q);
        }}
      />

      <main className="flex-1">
        {/* 1. Interactive 50/50 Split Hero Slider matching Farfetch Screenshot */}
        <section
          aria-label="Featured Hero Slider"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-10"
        >
          <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center bg-white">
            {/* Left 50%: Centered Clean Editorial Typography */}
            <div className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 text-center flex flex-col items-center justify-center">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-medium tracking-tight leading-[1.08] text-[#0A0A0A] max-w-md [text-wrap:balance] mb-4">
                {activeSlide.title}
              </h1>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-md mb-7">
                {activeSlide.subtitle}
              </p>
              <a
                href={activeSlide.ctaHref}
                className="inline-flex items-center justify-center px-6 py-2.5 border border-[#0A0A0A] text-xs font-semibold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors rounded-sm"
              >
                {activeSlide.ctaLabel}
              </a>

              {/* Interactive Slide Controls */}
              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous hero slide"
                  className="h-8 w-8 rounded-full border border-neutral-300 hover:border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] cursor-pointer transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
                </button>

                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setHeroSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === heroSlide
                          ? 'w-6 bg-[#E10600]'
                          : 'w-2 bg-neutral-300 hover:bg-neutral-500'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next hero slide"
                  className="h-8 w-8 rounded-full border border-neutral-300 hover:border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] cursor-pointer transition-colors"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>
            </div>

            {/* Right 50%: Tall Editorial Hero Image */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[580px] w-full overflow-hidden bg-[#F6F6F6]">
              <SmartImage
                src={activeSlide.image}
                alt={activeSlide.title}
                className="h-full w-full object-cover object-center transition-opacity duration-300"
              />
            </div>
          </div>
        </section>

        {/* Active Search / Category / Wishlist Filter Results */}
        {isFiltering && (
          <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 border-t border-b border-neutral-200 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-lg sm:text-xl font-normal text-[#0A0A0A]">
                {showWishlistOnly
                  ? `Saved Wishlist (${displayFiltered.length})`
                  : activeCategory
                  ? `Category: ${
                      CATEGORIES.find((c) => c.id === activeCategory)?.name
                    }`
                  : `Results for "${searchQuery}"`}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowWishlistOnly(false);
                  onSelectCategory(null);
                  onSearchChange('');
                }}
                className="px-4 py-1.5 border border-[#0A0A0A] text-xs font-semibold rounded-sm hover:bg-[#0A0A0A] hover:text-white transition-colors cursor-pointer"
              >
                Clear Filter
              </button>
            </div>

            {displayFiltered.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {displayFiltered.map((product) => (
                  <FarfetchProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={toggleWishlist}
                    onQuickAdd={onQuickAdd}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 py-8 text-center">
                No matching items found. Clear filter to explore all sections.
              </p>
            )}
          </section>
        )}

        {/* 2. New Arrivals: 4-Column Row matching "New in: handpicked daily..." */}
        <section
          id="new-arrivals"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-normal text-[#0A0A0A]">
              New arrivals: handpicked daily across our 20 Bahrain branches
            </h2>
            <a
              href="#categories"
              className="px-4 py-1.5 border border-[#0A0A0A] text-xs font-semibold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors rounded-sm whitespace-nowrap shrink-0"
            >
              Shop Now
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {newArrivalsRow.map((product) => (
              <FarfetchProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onQuickAdd={onQuickAdd}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>

        {/* 3. Two Large Side-by-Side Banners matching "TOTEME | Ralph Lauren Collection" */}
        <section
          aria-label="Featured Collection Banners"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <a
              href="#special-offers"
              className="group relative aspect-[4/4.3] w-full overflow-hidden bg-neutral-900 block"
            >
              <SmartImage
                src={BANNERS.specialOffersWide.image}
                alt="Special Offers From BHD 2.500"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
                <h2 className="text-2xl sm:text-4xl font-medium tracking-tight mb-2">
                  Abayas From BHD 2.500
                </h2>
                <span className="text-sm underline underline-offset-4">
                  Shop Now
                </span>
              </div>
            </a>

            <a
              href="#evening-wear"
              className="group relative aspect-[4/4.3] w-full overflow-hidden bg-neutral-900 block"
            >
              <SmartImage
                src={BANNERS.eveningSplit.image}
                alt="Evening Wear Collection"
                darkSurface
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
                <h2 className="text-2xl sm:text-4xl font-medium tracking-tight mb-2">
                  Evening Wear Edit
                </h2>
                <span className="text-sm underline underline-offset-4">
                  Shop Now
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* 4. Special Offers: 4-Column Discount Row matching "Black Friday: 20% off sale" */}
        <section
          id="special-offers"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-normal text-[#0A0A0A]">
              Special offers: quick-selling abayas starting at BHD 2.500
            </h2>
            <a
              href="#hot-offers"
              className="px-4 py-1.5 border border-[#0A0A0A] text-xs font-semibold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors rounded-sm whitespace-nowrap shrink-0"
            >
              Shop Now
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {specialOffersRow.map((product) => (
              <FarfetchProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onQuickAdd={onQuickAdd}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>

        {/* 5. Trending now: Centered Title + 4 Square Editorial Cards with ALL-CAPS Labels */}
        <section
          id="trending"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12"
        >
          <h2 className="text-xl sm:text-2xl font-normal text-center text-[#0A0A0A] mb-7">
            Trending now
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {trendingGrid.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectProduct(item)}
                className="group text-left cursor-pointer"
              >
                <div className="aspect-square w-full overflow-hidden bg-[#F6F6F6] mb-2.5">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="text-[11px] sm:text-xs font-medium tracking-wider uppercase text-[#0A0A0A] group-hover:text-[#E10600] transition-colors truncate">
                  {item.title}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* 6. Second Pair of 50/50 Large Banners matching "Polo Ralph Lauren | Maje" */}
        <section
          aria-label="Seasonal Feature Banners"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <a
              href="#hot-offers"
              className="group relative aspect-[4/4.3] w-full overflow-hidden bg-neutral-900 block"
            >
              <SmartImage
                src={BANNERS.jalabiyaKaftanSplit.image}
                alt="Hot Offers on Jalabiyas and Kaftans"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
                <h2 className="text-2xl sm:text-4xl font-medium tracking-tight mb-2">
                  Jalabiyas &amp; Kaftans
                </h2>
                <span className="text-sm underline underline-offset-4">
                  Shop Now
                </span>
              </div>
            </a>

            <a
              href="#best-sellers"
              className="group relative aspect-[4/4.3] w-full overflow-hidden bg-neutral-900 block"
            >
              <SmartImage
                src={BANNERS.heroModern.image}
                alt="Best Selling Daily Abayas"
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
                <h2 className="text-2xl sm:text-4xl font-medium tracking-tight mb-2">
                  20-Branch Best Sellers
                </h2>
                <span className="text-sm underline underline-offset-4">
                  Shop Now
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* 7. Categories (Screenshot 6 Categories) styled like "Brands of the moment" */}
        <section
          id="categories"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12"
        >
          <h2 className="text-lg sm:text-xl font-normal text-[#0A0A0A] mb-6">
            Categories of the moment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setShowWishlistOnly(false);
                  onSelectCategory(cat.id);
                  window.scrollTo({ top: 560, behavior: 'smooth' });
                }}
                className="group relative aspect-[3/3.6] w-full overflow-hidden bg-[#F6F6F6] text-left cursor-pointer"
              >
                <SmartImage
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">
                    {cat.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 8. Best Sellers & Hot Offers Rows */}
        <section
          id="best-sellers"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 border-t border-neutral-200"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-normal text-[#0A0A0A]">
              Best sellers: everyday Korean Nida &amp; crepe favorites
            </h2>
            <a
              href="#special-offers"
              className="px-4 py-1.5 border border-[#0A0A0A] text-xs font-semibold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors rounded-sm whitespace-nowrap shrink-0"
            >
              Shop Now
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {bestSellersRow.map((product) => (
              <FarfetchProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onQuickAdd={onQuickAdd}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>

        <section
          id="hot-offers"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 border-t border-neutral-200"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-normal text-[#0A0A0A]">
              Hot offers: limited stock markdowns
            </h2>
            <a
              href="#special-offers"
              className="px-4 py-1.5 border border-[#0A0A0A] text-xs font-semibold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors rounded-sm whitespace-nowrap shrink-0"
            >
              Shop Now
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {hotOffersRow.map((product) => (
              <FarfetchProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onQuickAdd={onQuickAdd}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>

        {/* 9. Evening Wear Row */}
        <section id="evening-wear" className="bg-[#0A0A0A] text-white py-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-lg sm:text-xl font-normal text-white">
                Evening wear: velvet, pearl &amp; antique gold couture
              </h2>
              <button
                type="button"
                onClick={() => onSelectProduct(eveningWearRow[0])}
                className="px-4 py-1.5 border border-white text-xs font-semibold text-white hover:bg-white hover:text-[#0A0A0A] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer"
              >
                Shop Now
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {eveningWearRow.map((product) => (
                <FarfetchProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                  onQuickAdd={onQuickAdd}
                  onSelectProduct={onSelectProduct}
                  darkSurface
                />
              ))}
            </div>
          </div>
        </section>

        {/* 10. "Never miss a thing" Newsletter + 3 Help Cards matching screenshot */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-t border-neutral-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
            <div className="lg:col-span-6">
              <h2 className="text-xl sm:text-2xl font-normal text-[#0A0A0A] mb-2">
                Never miss a thing
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
                Sign up for BHD 2.500 flash drops, new Bahrain branch openings,
                and seasonal Eid lookbooks — straight to your inbox.
              </p>
            </div>

            <div className="lg:col-span-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                Get Updates By Email
              </p>
              {newsletterSignedUp ? (
                <div className="p-4 border border-neutral-300 bg-[#F6F6F6] text-xs text-[#0A0A0A]">
                  Subscribed ({newsletterEmail}). Watch your inbox for our next
                  BHD 2.500 branch offer.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) setNewsletterSignedUp(true);
                  }}
                  className="space-y-2.5 max-w-md"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full h-10 px-3 border border-neutral-300 rounded-sm text-xs focus:outline-none focus:border-[#0A0A0A]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#0A0A0A] hover:bg-[#E10600] text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                  >
                    Sign Up
                  </button>
                  <p className="text-[11px] text-neutral-500">
                    By signing up, you consent to receiving updates from MG
                    Abayas Bahrain.
                  </p>
                </form>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="#special-offers"
              className="border border-neutral-200 p-5 hover:border-[#0A0A0A] transition-colors block"
            >
              <ShoppingBag className="h-5 w-5 text-[#0A0A0A] mb-3" strokeWidth={1.3} />
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0A0A]">
                How to Shop
              </p>
              <p className="text-xs text-neutral-600 mt-1">
                Cash on delivery or pickup across 20 branches
              </p>
            </a>

            <a
              href="#categories"
              className="border border-neutral-200 p-5 hover:border-[#0A0A0A] transition-colors block"
            >
              <HelpCircle className="h-5 w-5 text-[#0A0A0A] mb-3" strokeWidth={1.3} />
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0A0A]">
                7-Day Exchange
              </p>
              <p className="text-xs text-neutral-600 mt-1">
                Easy size exchanges at any Bahrain branch
              </p>
            </a>

            <a
              href="#footer-branches"
              className="border border-neutral-200 p-5 hover:border-[#0A0A0A] transition-colors block"
            >
              <MessageSquare className="h-5 w-5 text-[#0A0A0A] mb-3" strokeWidth={1.3} />
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0A0A]">
                Need Help?
              </p>
              <p className="text-xs text-neutral-600 mt-1">
                Call our Bahrain customer care +973 1700 2500
              </p>
            </a>
          </div>
        </section>
      </main>

      {/* 11. Black Background Footer with White Text in Screenshot's 4-Column Structure */}
      <footer
        id="footer-branches"
        className="bg-black text-white border-t border-white/15"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10 border-b border-white/15 text-xs">
            <div>
              <h3 className="font-semibold text-white mb-4">Customer Service</h3>
              <ul className="space-y-2.5 text-white/75">
                <li><a href="#special-offers" className="hover:text-white">Special Offers (BHD 2.500+)</a></li>
                <li><a href="#hot-offers" className="hover:text-white">Hot Offers</a></li>
                <li><a href="#categories" className="hover:text-white">Orders &amp; COD Delivery</a></li>
                <li><a href="#footer-branches" className="hover:text-white">7-Day Branch Exchange</a></li>
                <li><a href="#footer-branches" className="hover:text-white">Size Guide (52 – 60)</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">About MG Abayas</h3>
              <ul className="space-y-2.5 text-white/75">
                <li><a href="#new-arrivals" className="hover:text-white">New Arrivals</a></li>
                <li><a href="#trending" className="hover:text-white">Trending Now</a></li>
                <li><a href="#best-sellers" className="hover:text-white">Best Sellers</a></li>
                <li><a href="#evening-wear" className="hover:text-white">Evening Wear Couture</a></li>
                <li><a href="#footer-branches" className="hover:text-white">20 Bahrain Branches</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Categories</h3>
              <ul className="space-y-2.5 text-white/75">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCategory(c.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-white cursor-pointer"
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Bahrain Branches</h3>
              <ul className="space-y-2 text-white/75">
                {BAHRAIN_BRANCHES.slice(0, 5).map((branch) => (
                  <li key={branch} className="flex items-start gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#FF4D47] mt-0.5 shrink-0" />
                    <span>{branch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-white/60">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded p-1">
                <img
                  src={BRAND_LOGO}
                  alt="MG Abayas"
                  referrerPolicy="no-referrer"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <span>© 2026 MG Abayas (إم جي للعبايات) Bahrain. All rights reserved.</span>
            </div>

            <div className="bg-white rounded px-3 py-1.5 inline-flex items-center">
              <img
                src={PAYMENT_STRIP_IMAGE}
                alt="Accepted payments: Visa, MasterCard, Visa Debit, JCB, Benefit, PayGCC, Knet, mada, Amex, Apple Pay"
                className="h-5 sm:h-6 w-auto object-contain"
              />
            </div>

            <span>Prices in Bahraini Dinars (BHD) · 20 Branches</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
