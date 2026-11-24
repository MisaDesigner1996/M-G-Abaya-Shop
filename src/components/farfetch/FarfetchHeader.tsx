import { useRef, useState } from 'react';
import {
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import { BRAND_LOGO, CATEGORIES, type CategorySlug } from '../../data/catalog';

interface FarfetchHeaderProps {
  cartCount: number;
  wishlistCount: number;
  showingWishlistOnly: boolean;
  onToggleWishlistFilter: () => void;
  onOpenCart: () => void;
  activeCategory: CategorySlug | null;
  onSelectCategory: (slug: CategorySlug | null) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const TOP_TABS = [
  { label: 'Abayas', slug: 'abayas' as CategorySlug },
  { label: 'Jalabiyas', slug: 'jalabiyas' as CategorySlug },
  { label: 'Kaftans', slug: 'kaftan' as CategorySlug },
];

export function FarfetchHeader({
  cartCount,
  wishlistCount,
  showingWishlistOnly,
  onToggleWishlistFilter,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: FarfetchHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const subNavRef = useRef<HTMLDivElement>(null);

  const scrollSubNavRight = () => {
    if (!subNavRef.current) return;
    subNavRef.current.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      {/* Top Black Promo Strip matching screenshot */}
      <div className="bg-[#0A0A0A] text-white h-8 px-4 flex items-center justify-center text-[11px] sm:text-xs">
        <p className="truncate text-center">
          Free Bahrain delivery over BHD 15.000 ·{' '}
          <span className="font-semibold">20 Branches Open Daily</span> |{' '}
          <a href="#special-offers" className="underline hover:text-[#FF5752]">
            Offers From BHD 2.500
          </a>
        </p>
      </div>

      {/* Main Row: Left Quick Tabs | Centered MG Logo | Right Utility Icons */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-14 sm:h-16 grid grid-cols-3 items-center">
        {/* Left: Top Tabs */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="lg:hidden p-1 text-[#0A0A0A]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>

          <div className="hidden lg:flex items-center gap-5 text-[13px]">
            {TOP_TABS.map((tab) => {
              const active = activeCategory === tab.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() =>
                    onSelectCategory(active ? null : tab.slug)
                  }
                  className={`cursor-pointer whitespace-nowrap transition-colors ${
                    active
                      ? 'font-bold text-[#0A0A0A] underline underline-offset-4'
                      : 'text-neutral-700 hover:text-[#0A0A0A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: MG Abayas Logo Only */}
        <div className="flex justify-center">
          <a
            href="#top"
            onClick={() => {
              onSelectCategory(null);
              onSearchChange('');
            }}
            aria-label="MG Abayas Home"
            className="inline-flex items-center shrink-0"
          >
            <img
              src={BRAND_LOGO}
              alt="MG Abayas"
              referrerPolicy="no-referrer"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </a>
        </div>

        {/* Right: Wishlist & Bag Icons */}
        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleWishlistFilter}
            aria-label={`Saved items (${wishlistCount})`}
            aria-pressed={showingWishlistOnly}
            className={`relative p-1.5 transition-colors cursor-pointer ${
              showingWishlistOnly
                ? 'text-[#E10600]'
                : 'text-[#0A0A0A] hover:text-[#E10600]'
            }`}
          >
            <Heart
              className="h-5 w-5"
              strokeWidth={1.5}
              fill={showingWishlistOnly ? '#E10600' : 'none'}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-1 text-[10px] font-bold bg-[#E10600] text-white rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Shopping bag (${cartCount} items)`}
            className="relative p-1.5 text-[#0A0A0A] hover:text-[#E10600] transition-colors cursor-pointer"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-1 text-[10px] font-bold bg-[#0A0A0A] text-white rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Row + Rectangular Search Input matching Farfetch */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative flex items-center flex-1 min-w-0">
          <div
            ref={subNavRef}
            className="flex items-center gap-5 overflow-x-auto pr-8 text-[13px] text-neutral-700 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <a
              href="#special-offers"
              className="text-[#E10600] font-semibold whitespace-nowrap shrink-0 hover:underline"
            >
              Special Offers · BHD 2.500+
            </a>
            <a
              href="#new-arrivals"
              className="whitespace-nowrap shrink-0 hover:text-[#0A0A0A]"
            >
              New arrivals
            </a>
            <a
              href="#trending"
              className="whitespace-nowrap shrink-0 hover:text-[#0A0A0A]"
            >
              Trending
            </a>
            <a
              href="#best-sellers"
              className="whitespace-nowrap shrink-0 hover:text-[#0A0A0A]"
            >
              Best sellers
            </a>
            <a
              href="#hot-offers"
              className="whitespace-nowrap shrink-0 hover:text-[#0A0A0A]"
            >
              Hot offers
            </a>
            <a
              href="#evening-wear"
              className="whitespace-nowrap shrink-0 hover:text-[#0A0A0A]"
            >
              Evening wear
            </a>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  onSelectCategory(activeCategory === cat.id ? null : cat.id)
                }
                className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeCategory === cat.id
                    ? 'font-bold text-[#0A0A0A] underline underline-offset-4'
                    : 'hover:text-[#0A0A0A]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollSubNavRight}
            aria-label="Scroll categories right"
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white pl-2 text-neutral-500 hover:text-[#0A0A0A] cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>

        {/* Search Input matching screenshot */}
        <div className="relative w-full lg:w-64 shrink-0">
          <Search
            className="h-4 w-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={1.5}
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="What are you looking for?"
            aria-label="What are you looking for?"
            className="w-full h-9 pl-9 pr-8 border border-neutral-300 rounded-sm text-xs text-[#0A0A0A] placeholder:text-neutral-500 focus:outline-none focus:border-[#0A0A0A]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 py-3 flex flex-col gap-2 text-sm">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                onSelectCategory(cat.id);
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 text-neutral-800 hover:text-[#E10600]"
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
