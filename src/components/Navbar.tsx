import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { BRAND_LOGO } from '../data/catalog';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: 'Categories', href: '#categories' },
  { label: 'Special Offers', href: '#special-offers' },
  { label: 'Trending', href: '#trending' },
  { label: 'New Arrivals', href: '#new-arrivals' },
  { label: 'Evening Wear', href: '#evening-wear' },
];

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [showPromoBar, setShowPromoBar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 bg-white">
      {showPromoBar && (
        <div className="bg-[#0A0A0A] text-white h-9 px-4 flex items-center justify-between text-xs tracking-wide">
          <span className="hidden sm:inline text-white/60 whitespace-nowrap">
            20 Branches Across Bahrain
          </span>
          <p className="mx-auto text-center truncate font-medium">
            Everyday Abayas From{' '}
            <span className="text-[#FF4D47] font-semibold tabular-nums">
              BHD 2.500
            </span>{' '}
            · Free Delivery Over BHD 15.000
          </p>
          <button
            type="button"
            onClick={() => setShowPromoBar(false)}
            aria-label="Dismiss announcement"
            className="text-white/70 hover:text-white p-1 transition-colors shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <header className="border-b border-black/8 bg-white/95 backdrop-blur-sm">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand logo */}
          <a
            href="#top"
            aria-label="MG Abayas Home"
            className="flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E10600]"
          >
            <img
              src={BRAND_LOGO}
              alt="MG Abayas"
              referrerPolicy="no-referrer"
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-700"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#0A0A0A] transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#E10600] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E10600]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag, ${cartCount} items`}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A0A0A] hover:bg-[#E10600] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E10600]"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Bag</span>
              <span className="tabular-nums">({cartCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 border border-black/15 rounded-md text-[#0A0A0A] hover:bg-neutral-50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="lg:hidden border-t border-black/8 bg-white px-4 py-3 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-2 text-sm font-medium text-[#0A0A0A] hover:text-[#E10600] border-b border-black/5 last:border-b-0"
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
