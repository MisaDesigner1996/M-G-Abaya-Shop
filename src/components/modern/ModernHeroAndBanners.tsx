import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Layers, MapPin, Tag } from 'lucide-react';
import { BANNERS, formatBHD, PRODUCTS, type Product } from '../../data/catalog';
import { SmartImage } from '../SmartImage';

interface ModernHeroAndBannersProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export function ModernHeroAndBanners({
  onSelectProduct,
  onQuickAdd,
}: ModernHeroAndBannersProps) {
  // 4 distinct abaya designs featured inside the full-bleed modern header showcase
  const heroLooks = [
    PRODUCTS.find((p) => p.id === 'sp-1')!,
    PRODUCTS.find((p) => p.id === 'tr-2')!,
    PRODUCTS.find((p) => p.id === 'tr-1')!,
    PRODUCTS.find((p) => p.id === 'sp-2')!,
  ].filter(Boolean);

  const [activeLookIdx, setActiveLookIdx] = useState(0);
  const activeLook = heroLooks[activeLookIdx] || heroLooks[0];

  return (
    <section aria-label="Modern Storefront Hero and Banners" className="bg-white">
      {/* Full-Bleed Full-Width Header Image with Multi-Abaya Showcase */}
      <div className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] overflow-hidden bg-[#0A0A0A]">
        <SmartImage
          src={BANNERS.heroModern.image}
          alt="MG Abayas modern multi-silhouette modest fashion collection"
          className="absolute inset-0 h-full w-full object-cover object-center"
          darkSurface
        />

        {/* Measured directional gradient scrim for crisp legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between py-10 sm:py-12">
          {/* Top quiet location marker */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/85">
            <div className="inline-flex items-center gap-2 font-medium tracking-wide">
              <MapPin className="h-3.5 w-3.5 text-[#FF4D47]" strokeWidth={1.6} />
              <span>{BANNERS.heroModern.eyebrow}</span>
            </div>
            <span className="hidden sm:inline font-medium text-white/75 tabular-nums">
              Daily Value From BHD 2.500 · Same-Day Bahrain Delivery
            </span>
          </div>

          {/* Bottom Split: Editorial Headline Left + Interactive 4-Abaya Look Switcher Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-auto pt-12">
            <div className="lg:col-span-6 text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-[-0.03em] leading-[1.03] [text-wrap:balance] mb-4">
                {BANNERS.heroModern.title}
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-lg mb-7">
                {BANNERS.heroModern.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#special-offers"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#E10600] hover:bg-[#B80500] text-white text-sm font-semibold rounded-full transition-colors duration-200 whitespace-nowrap shrink-0"
                >
                  <span>Shop Offers From BHD 2.500</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </a>
                <a
                  href="#categories"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/12 hover:bg-white/22 backdrop-blur-md text-white border border-white/25 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap shrink-0"
                >
                  <Layers className="h-4 w-4" strokeWidth={1.6} />
                  <span>Explore Categories</span>
                </a>
              </div>
            </div>

            {/* Multi-Abaya Design Selector Inside Full Header */}
            <div className="lg:col-span-6">
              <div className="bg-black/55 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 text-white">
                <div className="flex items-center justify-between gap-4 mb-3.5">
                  <span className="text-xs font-medium text-white/75 tracking-wide">
                    Featured Header Silhouettes ({activeLookIdx + 1}/
                    {heroLooks.length})
                  </span>
                  {activeLook && (
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#FF5752] tabular-nums">
                        {formatBHD(activeLook.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onQuickAdd(activeLook)}
                        className="text-xs font-semibold px-3 py-1.5 bg-white text-[#0A0A0A] hover:bg-[#E10600] hover:text-white rounded-full transition-colors cursor-pointer"
                      >
                        Quick Add
                      </button>
                    </div>
                  )}
                </div>

                {/* 4 Abaya Design Cards */}
                <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                  {heroLooks.map((look, idx) => {
                    const isSelected = idx === activeLookIdx;
                    return (
                      <button
                        key={look.id}
                        type="button"
                        onClick={() => setActiveLookIdx(idx)}
                        onDoubleClick={() => onSelectProduct(look)}
                        className={`group text-left rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'border-[#E10600] bg-white/15'
                            : 'border-white/10 bg-white/5 hover:border-white/35'
                        }`}
                      >
                        <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                          <SmartImage
                            src={look.image}
                            alt={look.title}
                            darkSurface
                            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-2 hidden sm:block">
                          <p className="text-[11px] font-medium text-white truncate">
                            {look.title}
                          </p>
                          <p className="text-[11px] text-white/70 tabular-nums mt-0.5">
                            {formatBHD(look.price)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {activeLook && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-4 text-xs">
                    <span className="text-white/85 truncate">
                      {activeLook.title} · {activeLook.fabric}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(activeLook)}
                      className="inline-flex items-center gap-1 text-white hover:text-[#FF5752] font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>View Piece</span>
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Second Section: Multi-Size Bento Promotional Banners */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-5 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Wide Landscape Banner (7 cols) */}
          <a
            href="#special-offers"
            className="group relative md:col-span-7 rounded-xl overflow-hidden bg-[#F5F5F4] min-h-[175px] sm:min-h-[205px] block"
          >
            <SmartImage
              src={BANNERS.specialOffersWide.image}
              alt={BANNERS.specialOffersWide.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/95 bg-black/35 backdrop-blur-xs px-2.5 py-1 rounded-full">
                  <Tag className="h-3 w-3 text-[#FF4D47]" strokeWidth={1.7} />
                  <span>20-Branch Value Drop</span>
                </span>
                <span className="h-8 w-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-[#E10600] transition-colors">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                </span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug mb-1 [text-wrap:balance]">
                  Everyday Abayas From BHD 2.500
                </h2>
                <p className="text-xs text-white/80 max-w-md line-clamp-1">
                  Breathable Korean Nida and daily crepe silhouettes stocked for quick pickup.
                </p>
              </div>
            </div>
          </a>

          {/* Compact Right Split Banners (5 cols stacked) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3.5">
            <a
              href="#evening-wear"
              className="group relative rounded-xl overflow-hidden bg-[#0A0A0A] min-h-[86px] sm:min-h-[95px] block"
            >
              <SmartImage
                src={BANNERS.eveningSplit.image}
                alt={BANNERS.eveningSplit.title}
                darkSurface
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
              <div className="absolute inset-0 px-4 py-3.5 flex items-end justify-between gap-3 text-white">
                <div>
                  <p className="text-[11px] font-medium text-white/75 mb-0.5">
                    Evening Wear
                  </p>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight leading-tight">
                    Hand-Beaded Bisht &amp; Velvet
                  </h3>
                </div>
                <span className="h-8 w-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-[#E10600] transition-colors">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                </span>
              </div>
            </a>

            <a
              href="#categories"
              className="group relative rounded-xl overflow-hidden bg-[#F5F5F4] min-h-[86px] sm:min-h-[95px] block"
            >
              <SmartImage
                src={BANNERS.jalabiyaKaftanSplit.image}
                alt={BANNERS.jalabiyaKaftanSplit.title}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
              <div className="absolute inset-0 px-4 py-3.5 flex items-end justify-between gap-3 text-white">
                <div>
                  <p className="text-[11px] font-medium text-white/80 mb-0.5">
                    Gulf Heritage
                  </p>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight leading-tight">
                    Jalabiyas &amp; Silk Kaftans
                  </h3>
                </div>
                <span className="h-8 w-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-[#E10600] transition-colors">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
