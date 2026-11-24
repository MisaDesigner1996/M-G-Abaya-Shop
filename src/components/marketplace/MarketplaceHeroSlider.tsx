import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { BANNERS } from '../../data/catalog';
import { SmartImage } from '../SmartImage';

const HERO_SLIDES = [
  {
    id: 'slide-offers',
    image: BANNERS.heroModern.image,
    kicker: '20 Branches Across Bahrain',
    title: 'Everyday Abayas Starting From BHD 2.500',
    subtitle:
      'Shop fast-moving Korean Nida, linen open coats, and tailored daily wear with same-day Bahrain delivery.',
    ctaText: 'Shop Special Offers',
    ctaHref: '#special-offers',
  },
  {
    id: 'slide-campaign',
    image: BANNERS.hero.image,
    kicker: 'New Season Collection',
    title: 'Modest Silhouettes Crafted for Daily Comfort',
    subtitle:
      'Explore breathable fabrics and refined cuff embroidery across Manama, Riffa, Muharraq, and 17 more branches.',
    ctaText: 'Browse New Arrivals',
    ctaHref: '#new-arrivals',
  },
  {
    id: 'slide-value',
    image: BANNERS.specialOffersWide.image,
    kicker: 'Branch Value Drop',
    title: 'Daily Essentials, Shaylas & Inner Slips',
    subtitle:
      'Mix and match everyday abayas, chiffon head scarves from BHD 1.500, and modal inners from BHD 2.500.',
    ctaText: 'View Hot Offers',
    ctaHref: '#hot-offers',
  },
];

export function MarketplaceHeroSlider() {
  const [slideIdx, setSlideIdx] = useState(0);
  const current = HERO_SLIDES[slideIdx];

  const handlePrev = () => {
    setSlideIdx((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideIdx((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section aria-label="Promotional Hero Slider and Banners" className="bg-white">
      {/* Main Interactive Banner Slider */}
      <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] bg-neutral-900 overflow-hidden">
        <SmartImage
          src={current.image}
          alt={current.title}
          darkSurface
          className="h-full w-full object-cover object-center transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] w-full mx-auto px-12 sm:px-16 lg:px-20">
            <div className="max-w-xl text-white">
              <p className="text-xs sm:text-sm font-semibold text-[#FF5752] mb-2 tracking-wide">
                {current.kicker}
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] [text-wrap:balance] mb-3">
                {current.title}
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6 max-w-md">
                {current.subtitle}
              </p>
              <a
                href={current.ctaHref}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#E10600] hover:bg-[#B80500] text-white text-sm font-semibold rounded transition-colors"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Left / Right Slider Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-[#0A0A0A] flex items-center justify-center shadow-md cursor-pointer transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-[#0A0A0A] flex items-center justify-center shadow-md cursor-pointer transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSlideIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === slideIdx
                  ? 'w-7 bg-[#E10600]'
                  : 'w-2 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Different-Sized Secondary Strip Banners */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <a
            href="#evening-wear"
            className="group relative md:col-span-7 h-48 sm:h-56 overflow-hidden rounded bg-[#0A0A0A] block"
          >
            <SmartImage
              src={BANNERS.eveningSplit.image}
              alt="Evening Wear & Occasion Bisht"
              darkSurface
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-xs font-semibold text-[#FF5752] mb-1">
                Evening Wear
              </span>
              <h2 className="text-xl sm:text-2xl font-bold">
                Velvet &amp; Zari Occasion Abayas
              </h2>
            </div>
          </a>

          <a
            href="#categories"
            className="group relative md:col-span-5 h-48 sm:h-56 overflow-hidden rounded bg-neutral-100 block"
          >
            <SmartImage
              src={BANNERS.jalabiyaKaftanSplit.image}
              alt="Gulf Jalabiyas and Kaftans"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-xs font-semibold text-white/85 mb-1">
                Gulf Heritage
              </span>
              <h2 className="text-xl sm:text-2xl font-bold">
                Jalabiyas &amp; Silk Kaftans
              </h2>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
