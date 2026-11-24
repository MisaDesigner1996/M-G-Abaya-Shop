import { Heart, Plus } from 'lucide-react';
import { formatBHD, type Product } from '../../data/catalog';
import { SmartImage } from '../SmartImage';

interface ModaProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  showOutlineTag?: boolean;
  outlineLabel?: string;
}

export function ModaProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  showOutlineTag = false,
  outlineLabel,
}: ModaProductCardProps) {
  const isOutOfStock = product.inStock === false;
  const discountPct = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const topKicker = isOutOfStock
    ? 'Out of Stock'
    : product.originalPrice
    ? `Save ${discountPct}%`
    : product.tag || '20 Branches';

  const badgeText =
    outlineLabel ||
    (isOutOfStock
      ? 'OUT OF STOCK'
      : product.tag?.toUpperCase() || product.categoryLabel.toUpperCase());

  return (
    <article className="group flex flex-col items-center text-center">
      {/* Clean Studio Portrait Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F7F5] mb-3">
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          aria-label={`View ${product.title}`}
          className="block h-full w-full cursor-pointer"
        >
          <SmartImage
            src={product.image}
            alt={product.title}
            className={`h-full w-full object-cover object-top transition-transform duration-500 ${
              isOutOfStock
                ? 'opacity-70 grayscale-[20%]'
                : 'group-hover:scale-[1.03]'
            }`}
          />
        </button>

        {/* Minimal Top-Right Heart Icon */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          aria-label={
            isWishlisted ? 'Remove from saved items' : 'Save to wishlist'
          }
          className="absolute top-2.5 right-2.5 h-7 w-7 flex items-center justify-center text-[#0A0A0A] hover:scale-110 transition-transform cursor-pointer"
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.4}
            fill={isWishlisted ? '#E10600' : 'none'}
            color={isWishlisted ? '#E10600' : '#0A0A0A'}
          />
        </button>

        {/* Hover Quick-Add Bar */}
        {!isOutOfStock && (
          <button
            type="button"
            onClick={() => onQuickAdd(product)}
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 h-7 px-3 bg-white/95 hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white border border-black/15 text-[10px] font-semibold uppercase tracking-wider inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            <Plus className="h-3 w-3" />
            <span>Quick Add</span>
          </button>
        )}
      </div>

      {/* Centered Editorial Metadata matching Moda Operandi */}
      <div className="flex flex-col items-center px-1 w-full">
        <span
          className={`text-[11px] leading-tight ${
            isOutOfStock
              ? 'text-[#E10600] font-medium'
              : product.originalPrice
              ? 'text-[#9A2E2A]'
              : 'text-neutral-500'
          }`}
        >
          {topKicker}
        </span>

        <p className="text-[11px] font-bold tracking-[0.06em] uppercase text-[#0A0A0A] mt-0.5">
          {product.categoryLabel}
        </p>

        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="cursor-pointer mt-0.5"
        >
          <h3 className="text-[12px] text-neutral-700 group-hover:text-[#0A0A0A] leading-snug line-clamp-2">
            {product.title}
          </h3>
        </button>

        <div className="mt-1.5 flex items-baseline justify-center gap-1.5 tabular-nums text-[12px]">
          <span
            className={
              isOutOfStock
                ? 'text-neutral-400 font-medium'
                : 'text-[#0A0A0A] font-medium'
            }
          >
            {formatBHD(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-neutral-400 line-through">
              {formatBHD(product.originalPrice)}
            </span>
          )}
        </div>

        {showOutlineTag && (
          <span
            className={`mt-2.5 inline-block border px-2.5 py-1 text-[9px] tracking-[0.14em] uppercase ${
              isOutOfStock
                ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                : 'border-neutral-300 text-neutral-700'
            }`}
          >
            {badgeText}
          </span>
        )}
      </div>
    </article>
  );
}
