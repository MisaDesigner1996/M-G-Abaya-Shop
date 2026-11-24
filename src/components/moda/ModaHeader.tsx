import { useState } from 'react';
import { Heart, MapPin, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import {
  BAHRAIN_BRANCHES,
  BRAND_LOGO,
  CATEGORIES,
  type CategorySlug,
} from '../../data/catalog';

interface ModaHeaderProps {
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

const SUB_NAV_ITEMS: { label: string; href?: string; category?: CategorySlug }[] = [
  { label: 'New Arrivals', href: '#moda-new-arrivals' },
  { label: 'Special Offers', href: '#moda-special-offers' },
  { label: 'Trending', href: '#moda-trending' },
  { label: 'Best Sellers', href: '#moda-best-sellers' },
  { label: 'Hot Offers', href: '#moda-hot-offers' },
  { label: 'Evening Wear', href: '#moda-evening-wear' },
  { label: 'Abayas', category: 'abayas' },
  { label: 'Jalabiyas', category: 'jalabiyas' },
  { label: 'Kaftan', category: 'kaftan' },
  { label: 'Head Scarf', category: 'head-scarf' },
  { label: 'Prayer Clothing', category: 'prayer-clothing' },
  { label: 'Abaya Inner', category: 'abaya-inner' },
];

export function ModaHeader({
  cartCount,
  wishlistCount,
  showingWishlistOnly,
  onToggleWishlistFilter,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: ModaHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchPopoverOpen, setBranchPopoverOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState<'ABAYAS' | 'JALABIYAS' | 'OCCASION'>('ABAYAS');

  const handleDepartmentClick = (
    dept: 'ABAYAS' | 'JALABIYAS' | 'OCCASION',
    cat: CategorySlug | null,
    targetId?: string
  ) => {
    setActiveDepartment(dept);
    onSelectCategory(cat);
    if (targetId) {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/10">
      {/* Slim Brand Top Promo Strip */}
      <div className="bg-[#0A0A0A] text-white text-[10px] sm:text-[11px] tracking-wide">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-7 flex items-center justify-between gap-4">
          <span className="hidden sm:inline font-normal text-white/80 whitespace-nowrap">
            Currency: Bahrain (BHD)
          </span>

          <a
            href="#moda-special-offers"
            className="mx-auto sm:mx-0 font-medium uppercase tracking-[0.08em] text-center truncate hover:text-[#FF5752] transition-colors"
          >
            EVERYDAY ABAYAS FROM BHD 2.500 · 20 BAHRAIN BRANCHES
          </a>

          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setBranchPopoverOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 hover:underline whitespace-nowrap cursor-pointer"
            >
              <span>Need a Branch?</span>
            </button>
            {branchPopoverOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-[#0A0A0A] border border-black/15 shadow-xl p-4 z-50 text-left">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0A0A0A]">
                    20 Bahrain Locations
                  </p>
                  <button
                    type="button"
                    onClick={() => setBranchPopoverOpen(false)}
                    className="text-neutral-500 hover:text-black cursor-pointer"
                    aria-label="Close branches"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <ul className="space-y-1.5 text-[11px] text-neutral-600">
                  {BAHRAIN_BRANCHES.slice(0, 6).map((b) => (
                    <li key={b} className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-[#E10600] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Centered Logo Header matching screenshot */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-14 sm:h-16 grid grid-cols-3 items-center gap-4">
        {/* Left: Department Links + Mobile Toggle */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-1.5 -ml-1.5 text-[#0A0A0A] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>

          <nav
            aria-label="Primary departments"
            className="hidden lg:flex items-center gap-6 text-[11px] font-medium tracking-[0.12em] uppercase"
          >
            <button
              type="button"
              onClick={() => handleDepartmentClick('ABAYAS', null, 'moda-special-offers')}
              className={`py-1 border-b transition-colors cursor-pointer ${
                activeDepartment === 'ABAYAS'
                  ? 'border-[#0A0A0A] text-[#0A0A0A]'
                  : 'border-transparent text-neutral-500 hover:text-[#0A0A0A]'
              }`}
            >
              ABAYAS
            </button>
            <button
              type="button"
              onClick={() => handleDepartmentClick('JALABIYAS', 'jalabiyas')}
              className={`py-1 border-b transition-colors cursor-pointer ${
                activeDepartment === 'JALABIYAS'
                  ? 'border-[#0A0A0A] text-[#0A0A0A]'
                  : 'border-transparent text-neutral-500 hover:text-[#0A0A0A]'
              }`}
            >
              JALABIYAS
            </button>
            <button
              type="button"
              onClick={() => handleDepartmentClick('OCCASION', null, 'moda-evening-wear')}
              className={`py-1 border-b transition-colors cursor-pointer ${
                activeDepartment === 'OCCASION'
                  ? 'border-[#0A0A0A] text-[#0A0A0A]'
                  : 'border-transparent text-neutral-500 hover:text-[#0A0A0A]'
              }`}
            >
              EVENING
            </button>
          </nav>
        </div>

        {/* Center: Logo ONLY (no text wordmark) */}
        <div className="flex justify-center">
          <a
            href="#top"
            onClick={() => {
              onSelectCategory(null);
              onSearchChange('');
            }}
            aria-label="MG Abayas Home"
            className="inline-flex items-center justify-center shrink-0"
          >
            <img
              src={BRAND_LOGO}
              alt="MG Abayas"
              referrerPolicy="no-referrer"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </a>
        </div>

        {/* Right: Minimal Underlined Search + Account + Wishlist + Bag */}
        <div className="flex items-center justify-end gap-3 sm:gap-5">
          <div className="hidden md:flex items-center border-b border-black/25 focus-within:border-[#0A0A0A] pb-1 w-40 lg:w-48">
            <Search className="h-3.5 w-3.5 text-neutral-600 mr-2 shrink-0" strokeWidth={1.6} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search"
              aria-label="Search modest catalog"
              className="w-full bg-transparent text-xs text-[#0A0A0A] placeholder:text-neutral-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="text-neutral-400 hover:text-black ml-1 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setAccountOpen((prev) => !prev)}
              aria-label="Account and Bahrain branches"
              className="p-1 text-[#0A0A0A] hover:text-[#E10600] transition-colors cursor-pointer"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-black/15 shadow-xl p-4 z-50 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    MG Member Pickup
                  </span>
                  <button
                    type="button"
                    onClick={() => setAccountOpen(false)}
                    className="text-neutral-400 hover:text-black cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Reserve abayas online &amp; collect same day at any of our 20 Bahrain branches with 7-day exchange.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleWishlistFilter}
            aria-label={`Saved items (${wishlistCount})`}
            className="relative p-1 text-[#0A0A0A] hover:text-[#E10600] transition-colors cursor-pointer"
          >
            <Heart
              className="h-[18px] w-[18px]"
              strokeWidth={1.4}
              fill={showingWishlistOnly || wishlistCount > 0 ? '#E10600' : 'none'}
              color={showingWishlistOnly || wishlistCount > 0 ? '#E10600' : 'currentColor'}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 h-4 min-w-[16px] px-1 rounded-full bg-[#0A0A0A] text-white text-[9px] font-semibold flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag, ${cartCount} items`}
            className="relative p-1 text-[#0A0A0A] hover:text-[#E10600] transition-colors cursor-pointer"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 h-4 min-w-[16px] px-1 rounded-full bg-[#E10600] text-white text-[9px] font-semibold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Centered Sub-Navigation Bar matching Moda Operandi screenshot */}
      <div className="hidden lg:block border-t border-black/5 bg-white">
        <nav
          aria-label="Editorial categories"
          className="max-w-[1440px] mx-auto px-8 h-10 flex items-center justify-center gap-6 text-[12px] text-[#0A0A0A]"
        >
          {SUB_NAV_ITEMS.map((item) => {
            const isActive = item.category && activeCategory === item.category;
            if (item.category) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    onSelectCategory(isActive ? null : item.category!);
                    window.scrollTo({ top: 480, behavior: 'smooth' });
                  }}
                  className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#E10600] font-semibold underline underline-offset-4'
                      : 'hover:text-[#E10600]'
                  }`}
                >
                  {item.label}
                </button>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => onSelectCategory(null)}
                className={`whitespace-nowrap shrink-0 transition-colors ${
                  item.label === 'Special Offers'
                    ? 'text-[#E10600] font-semibold'
                    : 'hover:text-[#E10600]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/10 bg-white px-4 py-4 space-y-3">
          <div className="flex items-center border border-black/15 px-3 h-10">
            <Search className="h-4 w-4 text-neutral-500 mr-2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search abayas, linen, kaftans..."
              className="w-full text-xs focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onSelectCategory(activeCategory === c.id ? null : c.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 border text-left cursor-pointer ${
                  activeCategory === c.id
                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                    : 'border-black/10 text-[#0A0A0A]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
