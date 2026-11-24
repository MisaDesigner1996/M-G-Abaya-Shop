import type { Product } from '../data/catalog';
import { ProductCard } from './ProductCard';

interface ProductSectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  products: Product[];
  surface?: 'white' | 'subtle' | 'black';
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export function ProductSection({
  id,
  eyebrow,
  title,
  subtitle,
  products,
  surface = 'white',
  onQuickAdd,
  onSelectProduct,
}: ProductSectionProps) {
  const isDark = surface === 'black';

  const bgClass =
    surface === 'black'
      ? 'bg-[#0D0D0D] text-white'
      : surface === 'subtle'
      ? 'bg-[#F8F8F7] text-[#0A0A0A] border-t border-black/8'
      : 'bg-white text-[#0A0A0A] border-t border-black/8';

  return (
    <section id={id} className={`${bgClass} py-12 sm:py-16`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            {eyebrow && (
              <p
                className={`text-xs font-semibold tracking-wider mb-1.5 ${
                  isDark ? 'text-[#FF5752]' : 'text-[#E10600]'
                }`}
              >
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              {title}
            </h2>
            <p
              className={`mt-1.5 text-sm sm:text-base max-w-2xl ${
                isDark ? 'text-white/70' : 'text-neutral-600'
              }`}
            >
              {subtitle}
            </p>
          </div>

          <span
            className={`text-xs font-medium tabular-nums shrink-0 ${
              isDark ? 'text-white/55' : 'text-neutral-500'
            }`}
          >
            {products.length} curated pieces
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              darkTheme={isDark}
              onQuickAdd={onQuickAdd}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
