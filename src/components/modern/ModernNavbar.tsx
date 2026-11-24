import { useState } from 'react';
import {
  ChevronDown,
  Globe,
  Heart,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import {
  BAHRAIN_BRANCHES,
  BRAND_LOGO,
  CATEGORIES,
  type CategorySlug,
} from '../../data/catalog';

interface ModernNavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: CategorySlug | null;
  onSelectCategory: (slug: CategorySlug | null) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wishlistCount: number;
  showingWishlistOnly: boolean;
  onToggleWishlistFilter: () => void;
}

const BAHRAIN_AREAS = [
  'Manama',
  'Riffa',
  'Muharraq',
  'Seef District',
  'Isa Town',
  'Juffair',
  'Hamad Town',
  'Sitra',
];

export function ModernNavbar({
  cartCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistCount,
  showingWishlistOnly,
  onToggleWishlistFilter,
}: ModernNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>('Select your area');
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [signedInPhone, setSignedInPhone] = useState<string | null>(null);

  const handleCategoryClick = (slug: CategorySlug) => {
    onSelectCategory(activeCategory === slug ? null : slug);
    setMobileMenuOpen(false);
    const el = document.getElementById('categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/10">
      {/* Top Utility Strip matching screenshot */}
      <div className="border-b border-black/5 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 h-9 flex items-center justify-between text-xs">
          <span className="hidden sm:inline text-neutral-500 font-medium">
            20 Bahrain Branches · Offers From BHD 2.500
          </span>

          <div className="flex items-center gap-5 ml-auto relative">
            {/* Deliver to / Area selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setAreaDropdownOpen((prev) => !prev);
                  setAccountOpen(false);
                }}
                className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-[#0A0A0A] cursor-pointer"
              >
                <span className="h-5 w-5 rounded-full bg-[#15803D] text-white inline-flex items-center justify-center shrink-0">
                  <MapPin className="h-3 w-3" strokeWidth={2.2} />
                </span>
                <span>Deliver to</span>
                <span className="font-semibold text-[#15803D] inline-flex items-center gap-0.5">
                  {selectedArea}
                  <ChevronDown className="h-3 w-3" strokeWidth={2} />
                </span>
              </button>

              {areaDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-black/10 rounded-xl shadow-xl py-2 z-50">
                  <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Bahrain Delivery Areas
                  </p>
                  {BAHRAIN_AREAS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => {
                        setSelectedArea(area);
                        setAreaDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-50 cursor-pointer ${
                        selectedArea === area
                          ? 'font-semibold text-[#15803D]'
                          : 'text-neutral-700'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#footer-branches"
              className="text-neutral-600 hover:text-[#0A0A0A] font-medium whitespace-nowrap"
            >
              20 Branches
            </a>
          </div>
        </div>
      </div>

      {/* Main White Navigation Bar matching screenshot */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 h-16 sm:h-[68px] flex items-center justify-between gap-4 lg:gap-6">
        {/* Left: Logo ONLY (no text wordmark) */}
        <a
          href="#top"
          onClick={() => {
            onSelectCategory(null);
            onSearchChange('');
          }}
          aria-label="MG Abayas Home"
          className="flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E10600]"
        >
          <img
            src={BRAND_LOGO}
            alt="MG Abayas"
            referrerPolicy="no-referrer"
            className="h-10 sm:h-11 w-auto object-contain"
          />
        </a>

        {/* Category Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden xl:flex items-center gap-5 text-[13px] font-semibold text-[#0A0A0A]"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[#E10600] text-[#E10600]'
                    : 'border-transparent hover:text-[#E10600]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
          <a
            href="#special-offers"
            className="whitespace-nowrap shrink-0 py-1 text-[#E10600] hover:underline"
          >
            Offers
          </a>
        </nav>

        {/* Right Controls: Pill Search + Sign Up/In + Wishlist + Globe + Cart */}
        <div className="flex items-center gap-2.5 sm:gap-4 flex-1 xl:flex-initial justify-end">
          {/* Rounded Grey Pill Search */}
          <div className="relative flex-1 max-w-[230px] sm:max-w-[260px] lg:w-60">
            <Search
              className="h-4 w-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={1.7}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search"
              aria-label="Search abayas, kaftans, shaylas"
              className="w-full h-9 sm:h-10 pl-9 pr-8 bg-[#F2F2F2] rounded-full text-xs sm:text-sm text-[#0A0A0A] placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-black/25 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#0A0A0A] p-0.5 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>
            )}
          </div>

          {/* Sign Up or Sign In */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => {
                setAccountOpen((prev) => !prev);
                setAreaDropdownOpen(false);
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A0A0A] hover:text-[#E10600] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="h-7 w-7 rounded-full border border-[#0A0A0A] inline-flex items-center justify-center">
                <User className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
              <span>
                {signedInPhone ? signedInPhone : 'Sign Up or Sign In'}
              </span>
            </button>

            {accountOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white border border-black/10 rounded-xl shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-[#0A0A0A]">
                    MG Abayas Bahrain Member
                  </p>
                  <button
                    type="button"
                    onClick={() => setAccountOpen(false)}
                    className="text-neutral-400 hover:text-[#0A0A0A] cursor-pointer"
                    aria-label="Close sign in"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                {signedInPhone ? (
                  <div className="space-y-2 text-xs text-neutral-600">
                    <p>
                      Signed in with <strong className="text-[#0A0A0A]">{signedInPhone}</strong> for express branch pickup across all {BAHRAIN_BRANCHES.length}+ Bahrain stores.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSignedInPhone(null)}
                      className="text-[#E10600] font-semibold hover:underline cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (phoneInput.trim()) {
                        setSignedInPhone(phoneInput.trim());
                        setPhoneInput('');
                      }
                    }}
                    className="space-y-2.5"
                  >
                    <p className="text-[11px] text-neutral-500">
                      Enter your Bahrain mobile to track orders &amp; branch pickups.
                    </p>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+973 3XXX XXXX"
                      className="w-full h-9 px-3 rounded-lg border border-black/15 text-xs focus:outline-none focus:border-[#0A0A0A]"
                    />
                    <button
                      type="submit"
                      className="w-full h-9 bg-[#0A0A0A] hover:bg-[#E10600] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Continue
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Heart */}
          <button
            type="button"
            onClick={onToggleWishlistFilter}
            aria-label={`Saved items (${wishlistCount})`}
            title="Saved items"
            className="relative h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-neutral-100 text-[#0A0A0A] transition-colors cursor-pointer shrink-0"
          >
            <Heart
              className="h-5 w-5"
              strokeWidth={1.6}
              fill={showingWishlistOnly || wishlistCount > 0 ? '#E10600' : 'none'}
              color={showingWishlistOnly || wishlistCount > 0 ? '#E10600' : '#0A0A0A'}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Globe / Bahrain BHD */}
          <a
            href="#footer-branches"
            aria-label="Bahrain Region (BHD)"
            title="Bahrain · BHD"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100 text-[#0A0A0A] transition-colors shrink-0"
          >
            <Globe className="h-5 w-5" strokeWidth={1.6} />
          </a>

          {/* Shopping Cart Icon Button */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping cart, ${cartCount} items`}
            className="relative h-9 sm:h-10 px-2.5 sm:px-3 inline-flex items-center gap-1.5 rounded-full hover:bg-neutral-100 text-[#0A0A0A] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E10600]"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.7} />
            <span
              className={`h-5 min-w-[20px] px-1.5 rounded-full text-[11px] font-bold inline-flex items-center justify-center tabular-nums ${
                cartCount > 0
                  ? 'bg-[#E10600] text-white'
                  : 'bg-neutral-200 text-[#0A0A0A]'
              }`}
            >
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="xl:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-black/15 text-[#0A0A0A] hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" strokeWidth={1.6} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="xl:hidden border-t border-black/8 bg-white px-6 py-3 flex flex-col gap-1"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`py-2.5 text-left text-sm font-medium border-b border-black/5 cursor-pointer ${
                activeCategory === cat.id
                  ? 'text-[#E10600] font-semibold'
                  : 'text-[#0A0A0A] hover:text-[#E10600]'
              }`}
            >
              {cat.name}
            </button>
          ))}
          <a
            href="#special-offers"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 text-sm font-semibold text-[#E10600]"
          >
            Offers From BHD 2.500
          </a>
        </nav>
      )}
    </header>
  );
}
