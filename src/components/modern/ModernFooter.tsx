import { MapPin, Phone, ShieldCheck, Truck } from 'lucide-react';
import {
  BAHRAIN_BRANCHES,
  BRAND_LOGO,
  CATEGORIES,
  PAYMENT_STRIP_IMAGE,
} from '../../data/catalog';

export function ModernFooter() {
  return (
    <footer className="bg-black text-white border-t border-white/15">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/15">
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center bg-white rounded-xl p-2">
              <img
                src={BRAND_LOGO}
                alt="MG Abayas"
                referrerPolicy="no-referrer"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              20 neighborhood branches across Bahrain offering quick-selling
              Korean Nida abayas from BHD 2.500, tailored daily wear, and
              occasion couture.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                Categories
              </h3>
              <ul className="space-y-2.5 text-sm text-white/85">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <a
                      href="#categories"
                      className="hover:text-[#FF4D47] transition-colors"
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                Collections
              </h3>
              <ul className="space-y-2.5 text-sm text-white/85">
                <li>
                  <a
                    href="#special-offers"
                    className="hover:text-[#FF4D47] transition-colors"
                  >
                    Special Offers (BHD 2.500+)
                  </a>
                </li>
                <li>
                  <a
                    href="#trending"
                    className="hover:text-[#FF4D47] transition-colors"
                  >
                    Trending
                  </a>
                </li>
                <li>
                  <a
                    href="#best-sellers"
                    className="hover:text-[#FF4D47] transition-colors"
                  >
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a
                    href="#new-arrivals"
                    className="hover:text-[#FF4D47] transition-colors"
                  >
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a
                    href="#hot-offers"
                    className="hover:text-[#FF4D47] transition-colors"
                  >
                    Hot Offers
                  </a>
                </li>
                <li>
                  <a
                    href="#evening-wear"
                    className="hover:text-[#FF4D47] transition-colors"
                  >
                    Evening Wear
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                Bahrain Branches
              </h3>
              <ul className="space-y-2.5 text-sm text-white/80">
                {BAHRAIN_BRANCHES.slice(0, 5).map((branch) => (
                  <li key={branch} className="flex items-start gap-2">
                    <MapPin
                      className="h-4 w-4 text-[#FF4D47] mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    <span>{branch}</span>
                  </li>
                ))}
                <li className="text-xs text-white/50 pt-1">
                  + 15 more branches across Bahrain
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-8 border-b border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-white/85">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-[#FF4D47] shrink-0" strokeWidth={1.5} />
            <span>Same-Day Bahrain COD · Free Over BHD 15.000</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck
              className="h-5 w-5 text-[#FF4D47] shrink-0"
              strokeWidth={1.5}
            />
            <span>7-Day Branch Exchange Across 20 Locations</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-[#FF4D47] shrink-0" strokeWidth={1.5} />
            <span className="tabular-nums">Customer Care · +973 1700 2500</span>
          </div>
        </div>

        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-white/55">
          <p>© 2026 MG Abayas (إم جي للعبايات). All rights reserved.</p>
          <div className="bg-white rounded px-3 py-1.5 inline-flex items-center">
            <img
              src={PAYMENT_STRIP_IMAGE}
              alt="Accepted payment methods: Visa, Mastercard, Benefit, PayGCC, KNET, Mada, Amex, Apple Pay"
              referrerPolicy="no-referrer"
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </div>
          <p>All prices displayed in Bahraini Dinars (BHD).</p>
        </div>
      </div>
    </footer>
  );
}
