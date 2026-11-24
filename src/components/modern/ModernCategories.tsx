import {
  ArrowUpRight,
  Feather,
  Gem,
  Layers,
  Search,
  Shirt,
  Sun,
  Wind,
  X,
} from 'lucide-react';
import {
  CATEGORIES,
  type CategorySlug,
  formatBHD,
} from '../../data/catalog';
import { SmartImage } from '../SmartImage';

interface ModernCategoriesProps {
  activeCategory: CategorySlug | null;
  onSelectCategory: (slug: CategorySlug | null) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const CATEGORY_ICONS: Record<CategorySlug, typeof Layers> = {
  abayas: Layers,
  jalabiyas: Feather,
  kaftan: Gem,
  'head-scarf': Wind,
  'prayer-clothing': Sun,
  'abaya-inner': Shirt,
};

export function ModernCategories({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: ModernCategoriesProps) {
  return (
    <section
      id="categories"
      className="bg-[#F5F5F4] border-t border-b border-black/8 py-14 sm:py-16"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#E10600] mb-2">
              Curated Modest Wardrobe
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-[#0A0A0A]">
              Explore Categories
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search
                className="h-4 w-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                strokeWidth={1.6}
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search abayas, linen, bisht..."
                aria-label="Search modest catalog"
                className="w-full h-11 pl-11 pr-10 bg-white border border-black/10 rounded-full text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] p-1"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={1.7} />
                </button>
              )}
            </div>

            {activeCategory && (
              <button
                type="button"
                onClick={() => onSelectCategory(null)}
                className="h-11 px-5 text-xs font-semibold text-white bg-[#E10600] hover:bg-[#B80500] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* 6 Modern Category Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id];
            const isSelected = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  onSelectCategory(isSelected ? null : category.id)
                }
                aria-pressed={isSelected}
                className={`group text-left bg-white rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E10600] ${
                  isSelected
                    ? 'border-[#E10600] ring-1 ring-[#E10600]'
                    : 'border-black/8 hover:border-black/25 hover:-translate-y-0.5'
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECECE9]">
                  <SmartImage
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute top-2.5 left-2.5 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#0A0A0A] shadow-xs">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </div>
                </div>

                <div className="p-3.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#0A0A0A] group-hover:text-[#E10600] transition-colors truncate">
                      {category.name}
                    </h3>
                    <p className="text-xs text-neutral-500 tabular-nums mt-0.5">
                      From {formatBHD(category.startingPrice)}
                    </p>
                  </div>
                  <ArrowUpRight
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isSelected ? 'text-[#E10600]' : 'text-neutral-400'
                    }`}
                    strokeWidth={1.7}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
