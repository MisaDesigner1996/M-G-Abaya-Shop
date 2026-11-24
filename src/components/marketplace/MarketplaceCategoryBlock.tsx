import { useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
  X,
} from 'lucide-react';
import {
  CATEGORIES,
  type CategorySlug,
  formatBHD,
} from '../../data/catalog';
import { SmartImage } from '../SmartImage';

interface MarketplaceCategoryBlockProps {
  activeCategory: CategorySlug | null;
  onSelectCategory: (slug: CategorySlug | null) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function MarketplaceCategoryBlock({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: MarketplaceCategoryBlockProps) {
  const [expandedText, setExpandedText] = useState(true);
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: 'left' | 'right') => {
    if (!railRef.current) return;
    const offset = direction === 'left' ? -320 : 320;
    railRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="categories" className="bg-white py-10 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Centered Headline matching screenshot */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1A1A1A] tracking-tight mb-4">
          Women Arabic Clothing
        </h2>

        {/* Editorial Copy + Show Less / Show More toggle matching screenshot */}
        <div className="max-w-5xl mx-auto mb-6">
          <div
            className={`text-xs sm:text-sm text-neutral-600 leading-relaxed transition-all ${
              expandedText ? '' : 'line-clamp-2'
            }`}
          >
            <strong className="font-semibold text-neutral-700">
              Women&apos;s Arabic clothing
            </strong>{' '}
            at MG Abayas is an epitome of elegance, comfort, and daily value,
            blending traditional Gulf silhouettes with contemporary cuts across
            20 branches in Bahrain. From everyday Korean Nida abayas starting at{' '}
            <span className="font-semibold text-[#E10600] tabular-nums">
              BHD 2.500
            </span>{' '}
            to embroidered jalabiyas, silk kaftans, chiffon head scarves,
            cotton prayer sets, and breathable inner slips — explore styles for
            everyday wear, work, and evening occasions.
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="h-3.5 w-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search abayas, jalabiyas, kaftan..."
                aria-label="Search products"
                className="w-full h-9 pl-9 pr-8 border border-neutral-200 rounded text-xs text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A]"
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

            <div className="flex items-center gap-4 ml-auto">
              {activeCategory && (
                <button
                  type="button"
                  onClick={() => onSelectCategory(null)}
                  className="text-xs font-semibold text-[#E10600] hover:underline cursor-pointer"
                >
                  Show All Categories
                </button>
              )}
              <button
                type="button"
                onClick={() => setExpandedText((prev) => !prev)}
                className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-[#0A0A0A] cursor-pointer"
              >
                <span>{expandedText ? 'Show Less' : 'Show More'}</span>
                {expandedText ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Category Slider Carousel matching screenshot layout */}
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollRail('left')}
            aria-label="Scroll categories left"
            className="hidden sm:flex absolute -left-3 top-[38%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-neutral-200 shadow-sm items-center justify-center text-neutral-700 hover:text-[#0A0A0A] hover:border-neutral-400 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.6} />
          </button>

          <div
            ref={railRef}
            className="grid grid-flow-col auto-cols-[44%] sm:auto-cols-[30%] md:auto-cols-[22%] lg:auto-cols-[15.5%] gap-4 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    onSelectCategory(isSelected ? null : cat.id)
                  }
                  aria-pressed={isSelected}
                  className="group text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E10600]"
                >
                  <div
                    className={`aspect-[16/10] w-full overflow-hidden bg-[#F2F1EF] border transition-all duration-200 ${
                      isSelected
                        ? 'border-[#E10600] ring-1 ring-[#E10600]'
                        : 'border-transparent group-hover:border-neutral-300'
                    }`}
                  >
                    <SmartImage
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p
                    className={`mt-2.5 text-sm font-medium transition-colors ${
                      isSelected
                        ? 'text-[#E10600] font-semibold'
                        : 'text-[#1A1A1A] group-hover:text-[#E10600]'
                    }`}
                  >
                    {cat.name}
                  </p>
                  <p className="text-[11px] text-neutral-500 tabular-nums">
                    From {formatBHD(cat.startingPrice)}
                  </p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollRail('right')}
            aria-label="Scroll categories right"
            className="hidden sm:flex absolute -right-3 top-[38%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-neutral-200 shadow-sm items-center justify-center text-neutral-700 hover:text-[#0A0A0A] hover:border-neutral-400 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </section>
  );
}
