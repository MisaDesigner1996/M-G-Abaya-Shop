import { MapPin, Phone, ShieldCheck, Truck } from 'lucide-react';
import {
  BAHRAIN_BRANCHES,
  BRAND_LOGO,
  CATEGORIES,
  PAYMENT_STRIP_IMAGE,
} from '../data/catalog';

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/15">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
        {/* Top Row: Brand & Store Guarantees */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="bg-white rounded-md p-1.5 shrink-0">
                <img
                  src={BRAND_LOGO}
                  alt="MG Abayas"
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-display text-2xl font-bold tracking-tight text-white block">
                  MG Abayas
                </span>
                <span className="text-xs text-white/65">
                  إم جي للعبايات · 20 Branches in Bahrain
                </span>
              </div>
            </div>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              Bahrain’s high-volume modest wear house delivering everyday Nida
              abayas from BHD 2.500, tailored daily wear, and evening couture
              across 20 local branches.
            </p>
          </div>

          {/* Niche Navigation Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">
                Modest Categories
              </h3>
              <ul className="space-y-2.5 text-sm text-white/75">
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
              <h3 className="text-sm font-semibold text-white mb-4">
                Shop Collections
              </h3>
              <ul className="space-y-2.5 text-sm text-white/75">
                <li>
                  <a
                    href="#special-offers"
                    className="hover:text-[#FF4D47] transition-colors"
                  >
                    Special Offers (From BHD 2.500)
                  </a>
                </li>
                <li>
                  <a
                    href="#trending"
                    className="hover:text-[#FF4D47] transition-colors"
                  >
                    Trending Abayas
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
              <h3 className="text-sm font-semibold text-white mb-4">
                Key Bahrain Branches
              </h3>
              <ul className="space-y-2 text-sm text-white/75">
                {BAHRAIN_BRANCHES.slice(0, 5).map((branch) => (
                  <li key={branch} className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#E10600] mt-1 shrink-0" />
                    <span>{branch}</span>
                  </li>
                ))}
                <li className="text-xs text-white/55 pt-1">
                  + 15 additional neighborhood branches open daily 9:30 AM – 10:30 PM
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service Guarantees */}
        <div className="py-8 border-b border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-white/85">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-[#FF4D47] shrink-0" />
            <span>Same-Day Bahrain COD · Free Over BHD 15.000</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[#FF4D47] shrink-0" />
            <span>7-Day Size Exchange Across All 20 Branches</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-[#FF4D47] shrink-0" />
            <span className="tabular-nums">Branch Hotline · +973 1700 2500</span>
          </div>
        </div>

        {/* Payment Methods Strip & Copyright */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-white/60">
          <p>© 2026 MG Abayas (إم جي للعبايات). All rights reserved.</p>
          <div className="bg-white rounded px-3 py-1.5 inline-flex items-center">
            <img
              src={PAYMENT_STRIP_IMAGE}
              alt="Accepted payment methods: Visa, Mastercard, Benefit, PayGCC, KNET, Mada, Amex, Apple Pay"
              referrerPolicy="no-referrer"
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </div>
          <p>Prices shown in Bahraini Dinars (BHD) inclusive of VAT.</p>
        </div>
      </div>
    </footer>
  );
}
