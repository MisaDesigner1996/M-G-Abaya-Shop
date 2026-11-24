import { useMemo, useState } from 'react';
import {
  Award,
  Flame,
  Gem,
  Percent,
  Tag,
  TrendingUp,
} from 'lucide-react';
import {
  CATEGORIES,
  type CartItem,
  type CategorySlug,
  PRODUCTS,
  type Product,
} from './data/catalog';
import { Navbar } from './components/Navbar';
import { BannerMosaic } from './components/BannerMosaic';
import { CategoryStrip } from './components/CategoryStrip';
import { ProductSection } from './components/ProductSection';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

import { ModernNavbar } from './components/modern/ModernNavbar';
import { ModernHeroAndBanners } from './components/modern/ModernHeroAndBanners';
import { ModernCategories } from './components/modern/ModernCategories';
import { ModernProductSection } from './components/modern/ModernProductSection';
import { ModernProductCard } from './components/modern/ModernProductCard';
import { ModernFooter } from './components/modern/ModernFooter';
import { FarfetchHomepage } from './components/farfetch/FarfetchHomepage';
import { ModaHomepage } from './components/moda/ModaHomepage';

type DesignOption = 'classic' | 'modern' | 'marketplace' | 'moda';

export default function App() {
  const [designOption, setDesignOption] = useState<DesignOption>('moda');
  const [activeCategory, setActiveCategory] = useState<CategorySlug | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [showingWishlistOnly, setShowingWishlistOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2200);
  };

  const handleAddToBag = (
    product: Product,
    size = product.sizes[1] || product.sizes[0] || '54'
  ) => {
    if (product.inStock === false) {
      showToast(`"${product.title}" is currently out of stock`);
      return;
    }
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    showToast(`Added "${product.title}" (Size ${size}) to bag`);
  };

  const handleUpdateQty = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const isFiltering = Boolean(activeCategory || searchQuery.trim());

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCat = activeCategory ? p.category === activeCategory : true;
      const matchesQuery = query
        ? p.title.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query)
        : true;
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);

  const specialOffers = useMemo(
    () => PRODUCTS.filter((p) => p.section === 'special-offers'),
    []
  );
  const trending = useMemo(
    () => PRODUCTS.filter((p) => p.section === 'trending'),
    []
  );
  const bestSellers = useMemo(
    () => PRODUCTS.filter((p) => p.section === 'best-sellers'),
    []
  );
  const newArrivals = useMemo(
    () => PRODUCTS.filter((p) => p.section === 'new-arrivals'),
    []
  );
  const hotOffers = useMemo(
    () => PRODUCTS.filter((p) => p.section === 'hot-offers'),
    []
  );
  const eveningWear = useMemo(
    () => PRODUCTS.filter((p) => p.section === 'evening-wear'),
    []
  );

  const modernSpecialOffers = useMemo(
    () => specialOffers.slice(0, 4),
    [specialOffers]
  );
  const modernTrending = useMemo(() => {
    const sp5 = PRODUCTS.find((p) => p.id === 'sp-5');
    return sp5 ? [...trending, sp5] : trending;
  }, [trending]);
  const modernNewArrivals = useMemo(() => {
    const sp6 = PRODUCTS.find((p) => p.id === 'sp-6');
    return sp6 ? [...newArrivals, sp6] : newArrivals;
  }, [newArrivals]);

  const isModernFiltering = Boolean(
    activeCategory || searchQuery.trim() || showingWishlistOnly
  );
  const modernDisplayFiltered = useMemo(
    () =>
      showingWishlistOnly
        ? PRODUCTS.filter((p) => wishlistIds.includes(p.id))
        : filteredProducts,
    [showingWishlistOnly, wishlistIds, filteredProducts]
  );

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-[#0A0A0A]">
      {designOption === 'modern' ? (
        <>
          <ModernNavbar
            cartCount={cartCount}
            onOpenCart={() => setCartOpen(true)}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            wishlistCount={wishlistIds.length}
            showingWishlistOnly={showingWishlistOnly}
            onToggleWishlistFilter={() => setShowingWishlistOnly((prev) => !prev)}
          />

          <main className="flex-1">
            {/* 1. Full-Bleed Multi-Abaya Header + Compact Bento Banners */}
            <ModernHeroAndBanners
              onSelectProduct={setSelectedProduct}
              onQuickAdd={(p) => handleAddToBag(p)}
            />

            {/* 2. Categories */}
            <ModernCategories
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Interactive Filter View */}
            {isModernFiltering && (
              <section className="bg-white border-b border-black/8 py-12">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div>
                      <p className="text-xs font-semibold text-[#E10600] mb-1">
                        {showingWishlistOnly ? 'Saved Items' : 'Filtered Results'}
                      </p>
                      <h2 className="text-3xl font-bold tracking-tight text-[#0A0A0A]">
                        {showingWishlistOnly
                          ? `Saved Pieces (${modernDisplayFiltered.length})`
                          : activeCategoryObj
                          ? activeCategoryObj.name
                          : `Search: "${searchQuery}"`}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(null);
                        setSearchQuery('');
                        setShowingWishlistOnly(false);
                      }}
                      className="px-4 py-2 text-xs font-semibold border border-black/15 rounded-full hover:bg-[#0A0A0A] hover:text-white transition-colors cursor-pointer"
                    >
                      Clear Filter
                    </button>
                  </div>

                  {modernDisplayFiltered.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                      {modernDisplayFiltered.map((product) => (
                        <ModernProductCard
                          key={product.id}
                          product={product}
                          isWishlisted={wishlistIds.includes(product.id)}
                          onToggleWishlist={toggleWishlist}
                          onQuickAdd={handleAddToBag}
                          onSelectProduct={setSelectedProduct}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center border border-dashed border-black/15 rounded-2xl">
                      <p className="text-base font-semibold text-[#0A0A0A] mb-1">
                        {showingWishlistOnly
                          ? 'No saved items yet'
                          : 'No matching pieces found'}
                      </p>
                      <p className="text-sm text-neutral-500 mb-4">
                        {showingWishlistOnly
                          ? 'Tap the heart icon on any abaya or kaftan to save it here.'
                          : 'Try another keyword or reset to browse all 20-branch collections.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCategory(null);
                          setSearchQuery('');
                          setShowingWishlistOnly(false);
                        }}
                        className="px-5 py-2.5 bg-[#0A0A0A] text-white text-xs font-semibold rounded-full cursor-pointer"
                      >
                        Reset Catalog View
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 3. Special Offers */}
            <ModernProductSection
              id="special-offers"
              indexLabel="Starting From BHD 2.500"
              title="Special Offers"
              subtitle="Quick-selling everyday abayas, shaylas, and essentials priced for daily Bahrain value."
              icon={Tag}
              products={modernSpecialOffers}
              surface="white"
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
              onQuickAdd={handleAddToBag}
              onSelectProduct={setSelectedProduct}
            />

            {/* 4. Trending */}
            <ModernProductSection
              id="trending"
              indexLabel="Bahrain Favorites"
              title="Trending Now"
              subtitle="High-demand silhouettes moving fastest across Manama, Riffa, and Muharraq."
              icon={TrendingUp}
              products={modernTrending}
              surface="subtle"
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
              onQuickAdd={handleAddToBag}
              onSelectProduct={setSelectedProduct}
            />

            {/* 5. Best Sellers */}
            <ModernProductSection
              id="best-sellers"
              indexLabel="Customer Staples"
              title="Best Sellers"
              subtitle="Trusted Korean Nida and crepe essentials loved for everyday comfort and drape."
              icon={Award}
              products={bestSellers}
              surface="white"
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
              onQuickAdd={handleAddToBag}
              onSelectProduct={setSelectedProduct}
            />

            {/* 6. New Arrivals */}
            <ModernProductSection
              id="new-arrivals"
              indexLabel="Fresh Weekly Drop"
              title="New Arrivals"
              subtitle="Newly tailored trench cuts, kimono silhouettes, and breathable linen layers."
              icon={Percent}
              products={modernNewArrivals}
              surface="subtle"
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
              onQuickAdd={handleAddToBag}
              onSelectProduct={setSelectedProduct}
            />

            {/* 7. Hot Offers */}
            <ModernProductSection
              id="hot-offers"
              indexLabel="Limited Branch Stock"
              title="Hot Offers"
              subtitle="Markdowns on French lace sleeve abayas, embroidered jalabiyas, and organza kaftans."
              icon={Flame}
              products={hotOffers}
              surface="white"
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
              onQuickAdd={handleAddToBag}
              onSelectProduct={setSelectedProduct}
            />

            {/* 8. Evening Wear */}
            <ModernProductSection
              id="evening-wear"
              indexLabel="Occasion & Majlis Couture"
              title="Evening Wear"
              subtitle="Hand-beaded silk velvet abayas, antique gold organza bishts, and crystal kaftans."
              icon={Gem}
              products={eveningWear}
              surface="black"
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
              onQuickAdd={handleAddToBag}
              onSelectProduct={setSelectedProduct}
            />
          </main>

          <ModernFooter />
        </>
      ) : designOption === 'classic' ? (
        <>
          <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

          <main className="flex-1">
            {/* 1. Banners of Different Sizes */}
            <BannerMosaic />

            {/* 2. Categories (from screenshot) + Search */}
            <CategoryStrip
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Conditional Interactive Filter Results */}
            {isFiltering && (
              <section className="bg-white border-b border-black/8 py-12">
                <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div>
                      <p className="text-xs font-semibold text-[#E10600] mb-1">
                        Filtered View
                      </p>
                      <h2 className="font-display text-3xl font-semibold text-[#0A0A0A]">
                        {activeCategoryObj
                          ? activeCategoryObj.name
                          : `Search: "${searchQuery}"`}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(null);
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 text-xs font-semibold border border-black/15 rounded-md hover:bg-[#0A0A0A] hover:text-white transition-colors cursor-pointer"
                    >
                      Clear Filter · Show All Homepage Sections
                    </button>
                  </div>

                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onQuickAdd={(p) => handleAddToBag(p)}
                          onSelectProduct={setSelectedProduct}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center border border-dashed border-black/15 rounded-lg">
                      <p className="text-base font-semibold text-[#0A0A0A] mb-1">
                        No matching pieces found
                      </p>
                      <p className="text-sm text-neutral-500 mb-4">
                        Try another keyword or clear filters to view all 20-branch collections.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCategory(null);
                          setSearchQuery('');
                        }}
                        className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-semibold rounded-md cursor-pointer"
                      >
                        Reset Catalog View
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 3. Special Offers (As cheap as BHD 2.500) */}
            <ProductSection
              id="special-offers"
              eyebrow="Starting From BHD 2.500"
              title="Special Offers"
              subtitle="Fast-moving everyday abayas priced for daily value across all 20 Bahrain branches."
              products={specialOffers}
              surface="white"
              onQuickAdd={(p) => handleAddToBag(p)}
              onSelectProduct={setSelectedProduct}
            />

            {/* 4. Trending */}
            <ProductSection
              id="trending"
              eyebrow="Bahrain Favorites"
              title="Trending Now"
              subtitle="High-demand silhouettes moving quickest in our Riffa, Manama, and Muharraq stores."
              products={trending}
              surface="subtle"
              onQuickAdd={(p) => handleAddToBag(p)}
              onSelectProduct={setSelectedProduct}
            />

            {/* 5. Best Sellers */}
            <ProductSection
              id="best-sellers"
              eyebrow="Customer Staples"
              title="Best Sellers"
              subtitle="Reliable Korean Nida and everyday crepe abayas loved for durability and effortless drape."
              products={bestSellers}
              surface="white"
              onQuickAdd={(p) => handleAddToBag(p)}
              onSelectProduct={setSelectedProduct}
            />

            {/* 6. New Arrivals */}
            <ProductSection
              id="new-arrivals"
              eyebrow="Fresh In-Store Drop"
              title="New Arrivals"
              subtitle="Newly tailored trenches, kimono cuts, and linen layers arriving weekly."
              products={newArrivals}
              surface="subtle"
              onQuickAdd={(p) => handleAddToBag(p)}
              onSelectProduct={setSelectedProduct}
            />

            {/* 7. Hot Offers */}
            <ProductSection
              id="hot-offers"
              eyebrow="Limited Stock Value"
              title="Hot Offers"
              subtitle="Marked-down lace abayas, embroidered jalabiyas, and festive kaftans while stock lasts."
              products={hotOffers}
              surface="white"
              onQuickAdd={(p) => handleAddToBag(p)}
              onSelectProduct={setSelectedProduct}
            />

            {/* 8. Evening Wear */}
            <ProductSection
              id="evening-wear"
              eyebrow="Occasion & Majlis Couture"
              title="Evening Wear"
              subtitle="Hand-beaded silk velvet abayas, antique gold organza bishts, and crystal-trimmed kaftans."
              products={eveningWear}
              surface="black"
              onQuickAdd={(p) => handleAddToBag(p)}
              onSelectProduct={setSelectedProduct}
            />
          </main>

          {/* 9. Black Background Footer with White Text */}
          <Footer />
        </>
      ) : designOption === 'marketplace' ? (
        <FarfetchHomepage
          cartCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
          onQuickAdd={(p) => handleAddToBag(p)}
          onSelectProduct={setSelectedProduct}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredProducts={filteredProducts}
        />
      ) : (
        <ModaHomepage
          cartCount={cartCount}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
          onOpenCart={() => setCartOpen(true)}
          onQuickAdd={(p) => handleAddToBag(p)}
          onSelectProduct={setSelectedProduct}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredProducts={filteredProducts}
        />
      )}

      {/* Non-intrusive 4-Option Design Switcher */}
      <div
        role="group"
        aria-label="Homepage Design Options"
        className="fixed bottom-4 left-4 z-40 inline-flex items-center p-1 bg-[#0A0A0A]/90 backdrop-blur-md border border-white/15 rounded-full shadow-lg text-xs"
      >
        <button
          type="button"
          onClick={() => {
            setDesignOption('classic');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
            designOption === 'classic'
              ? 'bg-white text-[#0A0A0A]'
              : 'text-white/75 hover:text-white'
          }`}
        >
          Option 1
        </button>
        <button
          type="button"
          onClick={() => {
            setDesignOption('modern');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
            designOption === 'modern'
              ? 'bg-white text-[#0A0A0A]'
              : 'text-white/75 hover:text-white'
          }`}
        >
          Option 2
        </button>
        <button
          type="button"
          onClick={() => {
            setDesignOption('marketplace');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
            designOption === 'marketplace'
              ? 'bg-[#E10600] text-white'
              : 'text-white/75 hover:text-white'
          }`}
        >
          Option 3
        </button>
        <button
          type="button"
          onClick={() => {
            setDesignOption('moda');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
            designOption === 'moda'
              ? 'bg-[#E10600] text-white'
              : 'text-white/75 hover:text-white'
          }`}
        >
          Option 4
        </button>
      </div>

      {/* Shared Product Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToBag={handleAddToBag}
      />

      {/* Shared Slide-Over Bag & COD / Branch Pickup Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      {/* Subtle Add-to-Bag Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#0A0A0A] text-white px-4 py-3 rounded-xl shadow-xl border border-white/15 flex items-center gap-3 text-xs sm:text-sm"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="text-[#FF4D47] font-semibold hover:underline whitespace-nowrap cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
