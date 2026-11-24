import { ArrowRight, Plus } from 'lucide-react';
import { formatBHD, type Product } from '../../data/catalog';
import { SmartImage } from '../SmartImage';

interface MarketplaceProductRailProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  dark?: boolean;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export function MarketplaceProductRail({
  id,
  title,
  subtitle,
  products,
  dark = false,
  onQuickAdd,
  onSelectProduct,
}: MarketplaceProductRailProps) {
  return (
    <section
      id={id}
      className={`py-10 sm:py-12 border-t ${
        dark
          ? 'bg-[#0A0A0A] text-white border-white/10'
          : 'bg-white text-[#1A1A1A] border-neutral-200'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {title}
            </h2>
            <p
              className={`text-xs sm:text-sm mt-1 ${
                dark ? 'text-white/70' : 'text-neutral-500'
              }`}
            >
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectProduct(products[0])}
            className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
              dark
                ? 'text-white/80 hover:text-[#FF5752]'
                : 'text-neutral-700 hover:text-[#E10600]'
            }`}
          >
            <span>Quick Shop Featured</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Clean Marketplace Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className={`group flex flex-col border transition-shadow duration-200 ${
                dark
                  ? 'bg-[#141414] border-white/10 hover:border-white/30'
                  : 'bg-white border-neutral-200 hover:shadow-md'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className={`relative aspect-[3/4] w-full overflow-hidden text-left cursor-pointer ${
                  dark ? 'bg-[#1A1A1A]' : 'bg-[#F3F2F0]'
                }`}
              >
                <SmartImage
                  src={product.image}
                  alt={product.title}
                  darkSurface={dark}
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>

              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11px] mb-1">
                    <span
                      className={`truncate ${
                        dark ? 'text-white/60' : 'text-neutral-500'
                      }`}
                    >
                      {product.categoryLabel}
                    </span>
                    {product.tag && (
                      <span
                        className={`font-semibold whitespace-nowrap shrink-0 ${
                          dark ? 'text-[#FF5752]' : 'text-[#E10600]'
                        }`}
                      >
                        {product.tag}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="text-left w-full cursor-pointer"
                  >
                    <h3
                      className={`text-sm sm:text-[15px] font-semibold leading-snug line-clamp-2 ${
                        dark
                          ? 'text-white group-hover:text-[#FF5752]'
                          : 'text-[#1A1A1A] group-hover:text-[#E10600]'
                      }`}
                    >
                      {product.title}
                    </h3>
                  </button>
                </div>

                <div
                  className={`flex items-center justify-between gap-2 pt-2.5 border-t ${
                    dark ? 'border-white/10' : 'border-neutral-100'
                  }`}
                >
                  <div className="flex items-baseline gap-1.5 tabular-nums">
                    <span
                      className={`text-sm sm:text-[15px] font-bold ${
                        product.originalPrice
                          ? dark
                            ? 'text-[#FF5752]'
                            : 'text-[#E10600]'
                          : dark
                          ? 'text-white'
                          : 'text-[#1A1A1A]'
                      }`}
                    >
                      {formatBHD(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span
                        className={`text-xs line-through ${
                          dark ? 'text-white/40' : 'text-neutral-400'
                        }`}
                      >
                        {formatBHD(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onQuickAdd(product)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer shrink-0 ${
                      dark
                        ? 'bg-white text-[#0A0A0A] hover:bg-[#E10600] hover:text-white'
                        : 'bg-[#0A0A0A] text-white hover:bg-[#E10600]'
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
