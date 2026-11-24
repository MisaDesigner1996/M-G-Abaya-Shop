import { Search, X } from 'lucide-react';
import {
  CATEGORIES,
  type CategorySlug,
  formatBHD,
} from '../data/catalog';
import { SmartImage } from './SmartImage';

interface CategoryStripProps {
  activeCategory: CategorySlug | null;
  onSelectCategory: (slug: CategorySlug | null) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function CategoryStrip({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: CategoryStripProps) {
  return (
    <section
      id="categories"
      className="border-t border-b border-black/8 bg-[#F8F8F7] py-12 sm:py-16"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0A0A0A] tracking-tight mb-2">
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Modest Arabic clothing crafted for comfort and daily value — from
              everyday Korean Nida abayas and jalabiyas to silk kaftans, head
              scarves, prayer wear, and inner slips.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="h-4 w-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search abayas, linen, velvet..."
                aria-label="Search modest clothing catalog"
                className="w-full h-11 pl-10 pr-9 bg-white border border-black/12 rounded-md text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] p-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {activeCategory && (
              <button
                type="button"
                onClick={() => onSelectCategory(null)}
                className="h-11 px-4 text-xs font-semibold text-[#E10600] border border-[#E10600]/30 bg-white hover:bg-[#E10600] hover:text-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Show All
              </button>
            )}
          </div>
        </div>

        {/* 6 Categories from reference screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  onSelectCategory(isSelected ? null : category.id)
                }
                aria-pressed={isSelected}
                className={`group text-left bg-white rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E10600] ${
                  isSelected
                    ? 'border-[#E10600] ring-1 ring-[#E10600]'
                    : 'border-black/8 hover:border-black/25 hover:-translate-y-0.5'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#F4F3F1]">
                  <SmartImage
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="text-sm sm:text-base font-semibold text-[#0A0A0A] group-hover:text-[#E10600] transition-colors truncate">
                    {category.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500 tabular-nums">
                    <span>From {formatBHD(category.startingPrice)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{category.itemCount} styles</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
