import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { BRAND_LOGO } from '../../data/catalog';

interface MarketplaceHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const LINKS = [
  { label: 'Categories', href: '#categories' },
  { label: 'Special Offers', href: '#special-offers' },
  { label: 'Trending', href: '#trending' },
  { label: 'New Arrivals', href: '#new-arrivals' },
  { label: 'Evening Wear', href: '#evening-wear' },
];

export function MarketplaceHeader({
  cartCount,
  onOpenCart,
}: MarketplaceHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 bg-white">
      <div className="bg-[#0A0A0A] text-white h-8 px-4 flex items-center justify-center text-xs font-medium">
        <p className="truncate text-center">
          20 Branches Across Bahrain · Everyday Abayas Starting From{' '}
          <span className="text-[#FF4D47] font-semibold tabular-nums">
            BHD 2.500
          </span>
        </p>
      </div>

      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Logo only */}
          <a
            href="#top"
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

          {/* Zone 2: Clean single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-700"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#0A0A0A] transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#E10600] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag, ${cartCount} items`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] hover:bg-[#E10600] text-white text-xs sm:text-sm font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.7} />
              <span>Bag</span>
              <span className="tabular-nums">({cartCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 border border-neutral-300 rounded text-[#0A0A0A]"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="lg:hidden border-t border-neutral-200 bg-white px-4 py-2 flex flex-col"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-[#0A0A0A] hover:text-[#E10600] border-b border-neutral-100 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>
    </div>
  );
}
