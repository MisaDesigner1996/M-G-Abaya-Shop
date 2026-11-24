import { useEffect, useState } from 'react';
import { Check, MapPin, ShoppingBag, X } from 'lucide-react';
import { formatBHD, type Product } from '../data/catalog';
import { SmartImage } from './SmartImage';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToBag: (product: Product, size: string) => void;
}

export function QuickViewModal({
  product,
  onClose,
  onAddToBag,
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('54');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[1] || product.sizes[0] || '54');
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-3.5 right-3.5 z-10 h-9 w-9 rounded-md bg-white/95 hover:bg-neutral-100 text-[#0A0A0A] border border-black/10 flex items-center justify-center cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left: Studio Product Image */}
        <div className="aspect-[3/4] md:aspect-auto md:h-full bg-[#F4F3F1]">
          <SmartImage
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-top"
          />
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{product.fabric}</span>
            </div>

            <h2
              id="quick-view-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#0A0A0A] leading-tight mb-3"
            >
              {product.title}
            </h2>

            <div className="flex items-baseline gap-3 tabular-nums mb-4">
              <span
                className={`text-xl font-bold ${
                  product.originalPrice ? 'text-[#E10600]' : 'text-[#0A0A0A]'
                }`}
              >
                {formatBHD(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatBHD(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size / Length Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-semibold text-[#0A0A0A]">
                  Select Abaya Length / Size
                </span>
                <span className="text-neutral-500">Gulf Standard Fit</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 text-sm font-semibold rounded-md border transition-colors cursor-pointer tabular-nums ${
                        active
                          ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                          : 'bg-white text-[#0A0A0A] border-black/15 hover:border-black/40'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/8">
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <MapPin className="h-3.5 w-3.5 text-[#E10600] shrink-0" />
              <span>Ready for pickup across 20 Bahrain branches or COD delivery</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <Check className="h-3.5 w-3.5 text-[#0A0A0A] shrink-0" />
              <span>Includes 7-day branch exchange & matching shayla</span>
            </div>

            <button
              type="button"
              disabled={product.inStock === false}
              onClick={() => {
                if (product.inStock === false) return;
                onAddToBag(product, selectedSize);
                onClose();
              }}
              className={`w-full h-12 mt-2 inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-md transition-colors ${
                product.inStock === false
                  ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                  : 'bg-[#E10600] hover:bg-[#B80500] text-white cursor-pointer'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>
                {product.inStock === false
                  ? 'Out of Stock · Restocking Soon'
                  : `Add to Bag · ${formatBHD(product.price)}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
