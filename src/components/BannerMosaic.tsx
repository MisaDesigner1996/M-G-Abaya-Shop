import { ArrowRight } from 'lucide-react';
import { BANNERS } from '../data/catalog';
import { SmartImage } from './SmartImage';

export function BannerMosaic() {
  return (
    <section aria-label="Featured Storefront Banners" className="bg-white">
      {/* Banner 1: Full-Width Hero Campaign Banner (16:9 focal anchor) */}
      <div className="relative w-full overflow-hidden bg-[#0A0A0A]">
        <div className="relative h-[440px] sm:h-[520px] lg:h-[600px] w-full">
          <SmartImage
            src={BANNERS.hero.image}
            alt="MG Abayas Bahrain new season collection"
            className="h-full w-full object-cover object-center"
            darkSurface
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/15" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-10">
              <div className="max-w-xl text-white">
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-white/85 mb-3">
                  {BANNERS.hero.eyebrow}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.06] tracking-tight [text-wrap:balance] mb-4">
                  {BANNERS.hero.title}
                </h1>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-lg mb-7">
                  {BANNERS.hero.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={BANNERS.hero.ctaTarget}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#E10600] hover:bg-[#B80500] text-white text-sm font-semibold rounded-md transition-colors duration-200 whitespace-nowrap shrink-0"
                  >
                    <span>{BANNERS.hero.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#categories"
                    className="inline-flex items-center px-5 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/25 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap shrink-0"
                  >
                    Browse 6 Categories
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banners 2, 3, 4: Multi-Size Asymmetric Promotional Banners */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Large Wide Banner (7 cols) */}
          <a
            href={BANNERS.specialOffersWide.ctaTarget}
            className="group relative lg:col-span-7 overflow-hidden rounded-lg bg-[#F4F3F1] min-h-[300px] sm:min-h-[380px] lg:min-h-[420px] block"
          >
            <SmartImage
              src={BANNERS.specialOffersWide.image}
              alt={BANNERS.specialOffersWide.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
              <p className="text-xs font-semibold tracking-wider text-[#FF5752] mb-1.5">
                {BANNERS.specialOffersWide.kicker}
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold leading-tight mb-2 [text-wrap:balance]">
                {BANNERS.specialOffersWide.title}
              </h2>
              <p className="text-sm text-white/85 max-w-md mb-4">
                {BANNERS.specialOffersWide.subtitle}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:translate-x-1 transition-transform">
                <span>{BANNERS.specialOffersWide.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </a>

          {/* Stacked Medium Banners (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-6">
            <a
              href={BANNERS.eveningSplit.ctaTarget}
              className="group relative overflow-hidden rounded-lg bg-[#0A0A0A] min-h-[200px] block"
            >
              <SmartImage
                src={BANNERS.eveningSplit.image}
                alt={BANNERS.eveningSplit.title}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                darkSurface
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <p className="text-xs font-medium text-white/75 mb-1">
                  {BANNERS.eveningSplit.kicker}
                </p>
                <h3 className="font-display text-2xl font-semibold leading-snug mb-2 max-w-xs">
                  {BANNERS.eveningSplit.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                  <span>{BANNERS.eveningSplit.ctaLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>

            <a
              href={BANNERS.jalabiyaKaftanSplit.ctaTarget}
              className="group relative overflow-hidden rounded-lg bg-[#F4F3F1] min-h-[200px] block"
            >
              <SmartImage
                src={BANNERS.jalabiyaKaftanSplit.image}
                alt={BANNERS.jalabiyaKaftanSplit.title}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <p className="text-xs font-medium text-white/80 mb-1">
                  {BANNERS.jalabiyaKaftanSplit.kicker}
                </p>
                <h3 className="font-display text-2xl font-semibold leading-snug mb-2 max-w-xs">
                  {BANNERS.jalabiyaKaftanSplit.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                  <span>{BANNERS.jalabiyaKaftanSplit.ctaLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
