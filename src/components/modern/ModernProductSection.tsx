import type { LucideIcon } from 'lucide-react';
import type { Product } from '../../data/catalog';
import { ModernProductCard } from './ModernProductCard';

interface ModernProductSectionProps {
  id: string;
  indexLabel: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  products: Product[];
  surface?: 'white' | 'subtle' | 'black';
  wishlistIds?: string[];
  onToggleWishlist?: (id: string) => void;
  onQuickAdd: (product: Product, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export function ModernProductSection({
  id,
  indexLabel,
  title,
  subtitle,
  icon: Icon,
  products,
  surface = 'white',
  wishlistIds = [],
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
}: ModernProductSectionProps) {
  const isDark = surface === 'black';

  const bgClass =
    surface === 'black'
      ? 'bg-[#09090B] text-white'
      : surface === 'subtle'
      ? 'bg-[#F5F5F4] text-[#0A0A0A] border-t border-black/8'
      : 'bg-white text-[#0A0A0A] border-t border-black/8';

  const gridColsClass =
    products.length >= 4
      ? 'grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6';

  return (
    <section id={id} className={`${bgClass} py-12 sm:py-16`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="flex items-start gap-4">
            <div
              className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 border ${
                isDark
                  ? 'border-white/15 bg-white/5 text-[#FF5752]'
                  : 'border-black/10 bg-[#F5F5F4] text-[#E10600]'
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p
                className={`text-xs font-semibold tracking-wider mb-1 ${
                  isDark ? 'text-[#FF5752]' : 'text-[#E10600]'
                }`}
              >
                {indexLabel}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em]">
                {title}
              </h2>
              <p
                className={`mt-1 text-sm max-w-2xl ${
                  isDark ? 'text-white/65' : 'text-neutral-600'
                }`}
              >
                {subtitle}
              </p>
            </div>
          </div>

          <span
            className={`text-xs font-medium tabular-nums shrink-0 ${
              isDark ? 'text-white/50' : 'text-neutral-500'
            }`}
          >
            {products.length} pieces in edit
          </span>
        </div>

        <div className={`grid ${gridColsClass}`}>
          {products.map((product) => (
            <ModernProductCard
              key={product.id}
              product={product}
              darkTheme={isDark}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickAdd={onQuickAdd}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
