import { Copy, Heart, Plus, TrendingUp } from 'lucide-react';
import { formatBHD, type Product } from '../../data/catalog';
import { SmartImage } from '../SmartImage';

interface ModernProductCardProps {
  product: Product;
  darkTheme?: boolean;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
  onQuickAdd: (product: Product, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export function ModernProductCard({
  product,
  darkTheme = false,
  isWishlisted = false,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
}: ModernProductCardProps) {
  const isOutOfStock = product.inStock === false;
  const discountPct = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const isBestsellerTag = Boolean(
    product.tag && /bestseller|best seller|top rated|most requested/i.test(product.tag)
  );
  const isOfferTag = Boolean(
    !isOutOfStock &&
      !isBestsellerTag &&
      product.tag &&
      (product.originalPrice || /offer|deal|save|2\.500/i.test(product.tag))
  );

  return (
    <article className="group flex flex-col">
      {/* Studio Image Frame matching reference screenshot */}
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden mb-2.5 ${
          darkTheme ? 'bg-[#18181B]' : 'bg-[#F3F3F1]'
        }`}
      >
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          aria-label={`Inspect ${product.title}`}
          className="block h-full w-full text-left cursor-pointer"
        >
          <SmartImage
            src={product.image}
            alt={product.title}
            darkSurface={darkTheme}
            fallbackTitle={product.title}
            className={`h-full w-full object-cover object-top transition-transform duration-500 ${
              isOutOfStock
                ? 'opacity-70 grayscale-[20%]'
                : 'group-hover:scale-[1.03]'
            }`}
          />
        </button>

        {/* Top-Right Stacked Circular Wishlist + Similar/Quick-View Icons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist?.(product.id);
            }}
            aria-label={
              isWishlisted ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`
            }
            className="h-8 w-8 rounded-full bg-white/95 hover:bg-white text-[#0A0A0A] flex items-center justify-center shadow-xs transition-transform hover:scale-105 cursor-pointer"
          >
            <Heart
              className="h-4 w-4"
              strokeWidth={1.7}
              fill={isWishlisted ? '#E10600' : 'none'}
              color={isWishlisted ? '#E10600' : '#0A0A0A'}
            />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            aria-label={`Quick view ${product.title}`}
            className="h-8 w-8 rounded-full bg-white/95 hover:bg-white text-[#0A0A0A] flex items-center justify-center shadow-xs transition-transform hover:scale-105 cursor-pointer"
          >
            <Copy className="h-3.5 w-3.5" strokeWidth={1.7} />
          </button>
        </div>

        {/* Bottom-Left Flush Rectangular Tag Badge matching screenshot */}
        {(isOutOfStock || product.tag) && (
          <span
            className={`absolute bottom-0 left-0 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide pointer-events-none ${
              isOutOfStock
                ? 'bg-[#0A0A0A] text-white'
                : isBestsellerTag
                ? 'bg-white text-[#15803D]'
                : isOfferTag
                ? 'bg-white text-[#E10600]'
                : 'bg-white text-[#0A0A0A]'
            }`}
          >
            {isOutOfStock ? 'OUT OF STOCK' : product.tag}
          </span>
        )}

        {/* Quick Add Button (bottom-right on hover, desktop) */}
        {!isOutOfStock && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            aria-label={`Add ${product.title} to cart`}
            className="absolute bottom-2.5 right-2.5 h-8 px-2.5 rounded-full bg-[#0A0A0A]/90 hover:bg-[#E10600] text-white text-[11px] font-semibold inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 shadow-sm cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            <span>Add</span>
          </button>
        )}
      </div>

      {/* Clean Unboxed Metadata matching screenshot hierarchy */}
      <div className="flex flex-col text-left">
        {/* 1. Price + Strikethrough + % OFF */}
        <div className="flex items-baseline flex-wrap gap-1.5 tabular-nums">
          <span
            className={`text-sm sm:text-[15px] font-bold ${
              isOutOfStock
                ? darkTheme
                  ? 'text-white/50'
                  : 'text-neutral-500'
                : discountPct > 0
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
                darkTheme ? 'text-white/40' : 'text-neutral-400'
              }`}
            >
              {formatBHD(product.originalPrice)}
            </span>
          )}
          {discountPct > 0 && !isOutOfStock && (
            <span
              className={`text-xs font-semibold ${
                darkTheme ? 'text-[#FF5752]' : 'text-[#E10600]'
              }`}
            >
              {discountPct}% OFF
            </span>
          )}
        </div>

        {/* 2. Brand / Category Line */}
        <p
          className={`text-xs sm:text-[13px] font-bold mt-1 truncate ${
            darkTheme ? 'text-white' : 'text-[#0A0A0A]'
          }`}
        >
          MG Abayas · {product.categoryLabel}
        </p>

        {/* 3. Product Title */}
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="text-left w-full cursor-pointer mt-0.5"
        >
          <h3
            className={`text-xs sm:text-[13px] leading-snug line-clamp-2 transition-colors ${
              darkTheme
                ? 'text-white/80 group-hover:text-white'
                : 'text-neutral-700 group-hover:text-[#0A0A0A]'
            }`}
          >
            {product.title}
          </h3>
        </button>

        {/* 4. Colour Swatches OR 24h Views OR Out of Stock note */}
        <div className="mt-1.5 min-h-[18px] flex items-center">
          {isOutOfStock ? (
            <span className="text-[11px] font-semibold text-[#E10600]">
              Out of Stock · Restocking
            </span>
          ) : product.colors && product.colors.length > 0 ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 4).map((hex) => (
                  <span
                    key={hex}
                    className={`h-3 w-3 rounded-full border ${
                      darkTheme ? 'border-white/30' : 'border-black/15'
                    }`}
                    style={{ backgroundColor: hex }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span
                className={`text-[11px] ${
                  darkTheme ? 'text-white/60' : 'text-neutral-500'
                }`}
              >
                {product.colors.length} Colours
              </span>
            </div>
          ) : product.viewsLast24h ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#EA580C]">
              <TrendingUp className="h-3 w-3 shrink-0" strokeWidth={2} />
              <span>{product.viewsLast24h} Views in the last 24 hours</span>
            </span>
          ) : (
            <span
              className={`text-[11px] ${
                darkTheme ? 'text-white/55' : 'text-neutral-500'
              }`}
            >
              {product.fabric}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
