import { Heart, Plus } from 'lucide-react';
import { formatBHD, type Product } from '../../data/catalog';
import { SmartImage } from '../SmartImage';

interface FarfetchProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  darkSurface?: boolean;
}

export function FarfetchProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  darkSurface = false,
}: FarfetchProductCardProps) {
  const discountPct = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const isOutOfStock = product.inStock === false;
  const isOfferTag = Boolean(
    !isOutOfStock &&
      product.tag &&
      (product.originalPrice ||
        /offer|deal|save|2\.500/i.test(product.tag))
  );

  return (
    <article className="group flex flex-col">
      {/* Sharp #F6F6F6 Studio Frame matching screenshot */}
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden mb-3 ${
          darkSurface ? 'bg-[#181818]' : 'bg-[#F6F6F6]'
        }`}
      >
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          aria-label={`View ${product.title}`}
          className="block h-full w-full cursor-pointer"
        >
          <SmartImage
            src={product.image}
            alt={product.title}
            darkSurface={darkSurface}
            className={`h-full w-full object-cover object-top transition-transform duration-500 ${
              isOutOfStock
                ? 'opacity-70 grayscale-[20%]'
                : 'group-hover:scale-[1.03]'
            }`}
          />
        </button>

        {/* Top-left solid background label */}
        {(isOutOfStock || product.tag) && (
          <span
            className={`absolute top-2.5 left-2.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider pointer-events-none shadow-xs ${
              isOutOfStock
                ? 'bg-[#0A0A0A] text-white'
                : isOfferTag
                ? 'bg-[#E10600] text-white'
                : 'bg-white text-[#0A0A0A] border border-black/10'
            }`}
          >
            {isOutOfStock ? 'Out of Stock' : product.tag}
          </span>
        )}

        {/* Top-right Heart Wishlist toggle */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          aria-label={
            isWishlisted ? 'Remove from saved items' : 'Save to wishlist'
          }
          className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center text-[#0A0A0A] hover:scale-110 transition-transform shadow-xs cursor-pointer"
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.6}
            fill={isWishlisted ? '#E10600' : 'none'}
            color={isWishlisted ? '#E10600' : '#0A0A0A'}
          />
        </button>

        {/* Bottom-right Quick-Add or Out of Stock strip */}
        {isOutOfStock ? (
          <span className="absolute bottom-3 right-3 h-7 px-2.5 bg-neutral-900/90 text-white text-[10px] font-semibold uppercase tracking-wider inline-flex items-center">
            Sold Out
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onQuickAdd(product)}
            className="absolute bottom-3 right-3 h-8 px-3 bg-white/95 hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white border border-black/15 text-[11px] font-semibold inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Quick Add</span>
          </button>
        )}
      </div>

      {/* Unboxed Metadata matching Farfetch card typography */}
      <div className="space-y-0.5 text-[13px]">
        <p
          className={`text-[11px] ${
            darkSurface ? 'text-white/55' : 'text-neutral-500'
          }`}
        >
          {product.categoryLabel}
        </p>

        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="text-left w-full cursor-pointer"
        >
          <h3
            className={`font-semibold leading-snug line-clamp-1 ${
              darkSurface
                ? 'text-white group-hover:text-[#FF5752]'
                : 'text-[#0A0A0A] group-hover:text-[#E10600]'
            }`}
          >
            MG Atelier · {product.title}
          </h3>
        </button>

        <p
          className={`text-[12px] line-clamp-1 ${
            darkSurface ? 'text-white/70' : 'text-neutral-600'
          }`}
        >
          {product.fabric}
        </p>

        {/* Tabular Price & Discount */}
        <div className="pt-2 tabular-nums">
          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span
                className={`text-xs line-through ${
                  darkSurface ? 'text-white/40' : 'text-neutral-400'
                }`}
              >
                {formatBHD(product.originalPrice)}
              </span>
            )}
            <span
              className={`text-[13px] font-bold ${
                isOutOfStock
                  ? darkSurface
                    ? 'text-white/50'
                    : 'text-neutral-500'
                  : product.originalPrice
                  ? darkSurface
                    ? 'text-[#FF5752]'
                    : 'text-[#E10600]'
                  : darkSurface
                  ? 'text-white'
                  : 'text-[#0A0A0A]'
              }`}
            >
              {formatBHD(product.price)}
            </span>
          </div>
          {isOutOfStock ? (
            <p className="text-[11px] font-medium text-neutral-500 mt-0.5">
              Restocking across branches
            </p>
          ) : (
            discountPct > 0 && (
              <p className="text-[11px] font-medium text-[#E10600] mt-0.5">
                -{discountPct}% Branch Offer
              </p>
            )
          )}
        </div>
      </div>
    </article>
  );
}
