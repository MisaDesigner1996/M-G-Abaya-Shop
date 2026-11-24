import { Eye, Plus } from 'lucide-react';
import { formatBHD, type Product } from '../data/catalog';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
  darkTheme?: boolean;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export function ProductCard({
  product,
  darkTheme = false,
  onQuickAdd,
  onSelectProduct,
}: ProductCardProps) {
  return (
    <article
      className={`group flex flex-col rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${
        darkTheme
          ? 'bg-[#151515] border border-white/10 hover:border-white/25'
          : 'bg-white border border-black/8 hover:border-black/20 hover:shadow-md'
      }`}
    >
      {/* 3:4 Studio Product Image */}
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden ${
          darkTheme ? 'bg-[#1A1A1A]' : 'bg-[#F4F3F1]'
        }`}
      >
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          aria-label={`View details for ${product.title}`}
          className="block h-full w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E10600]"
        >
          <SmartImage
            src={product.image}
            alt={product.title}
            darkSurface={darkTheme}
            fallbackTitle={product.title}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>

        {/* Subtle Quick-View trigger on hover */}
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          aria-label={`Quick view ${product.title}`}
          className="absolute top-3 right-3 h-9 w-9 rounded-md bg-white/90 hover:bg-white text-[#0A0A0A] flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 shadow-sm cursor-pointer"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span
              className={`truncate ${
                darkTheme ? 'text-white/60' : 'text-neutral-500'
              }`}
            >
              {product.categoryLabel} · {product.fabric}
            </span>
            {product.tag && (
              <span
                className={`font-semibold whitespace-nowrap shrink-0 ${
                  darkTheme ? 'text-[#FF5752]' : 'text-[#E10600]'
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
              className={`text-base font-semibold leading-snug line-clamp-2 transition-colors ${
                darkTheme
                  ? 'text-white group-hover:text-[#FF5752]'
                  : 'text-[#0A0A0A] group-hover:text-[#E10600]'
              }`}
            >
              {product.title}
            </h3>
          </button>
        </div>

        {/* Baseline Price + Quick Add */}
        <div
          className={`pt-3 border-t flex items-center justify-between gap-3 ${
            darkTheme ? 'border-white/10' : 'border-black/8'
          }`}
        >
          <div className="flex items-baseline gap-2 tabular-nums">
            <span
              className={`text-[15px] font-bold ${
                product.originalPrice
                  ? darkTheme
                    ? 'text-[#FF5752]'
                    : 'text-[#E10600]'
                  : darkTheme
                  ? 'text-white'
                  : 'text-[#0A0A0A]'
              }`}
            >
              {formatBHD(product.price)}
            </span>
            {product.originalPrice && (
              <span
                className={`text-xs line-through ${
                  darkTheme ? 'text-white/45' : 'text-neutral-400'
                }`}
              >
                {formatBHD(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onQuickAdd(product)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E10600] ${
              darkTheme
                ? 'bg-white text-[#0A0A0A] hover:bg-[#E10600] hover:text-white'
                : 'bg-[#0A0A0A] text-white hover:bg-[#E10600]'
            }`}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </article>
  );
}
