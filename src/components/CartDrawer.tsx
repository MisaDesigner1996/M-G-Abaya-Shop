import { useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import {
  BAHRAIN_BRANCHES,
  type CartItem,
  formatBHD,
} from '../data/catalog';
import { SmartImage } from './SmartImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

const FREE_DELIVERY_THRESHOLD = 15.0;
const DELIVERY_FEE = 1.5;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [fulfillment, setFulfillment] = useState<'cod' | 'pickup'>('cod');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressOrBranch, setAddressOrBranch] = useState(BAHRAIN_BRANCHES[0]);
  const [orderNumber, setOrderNumber] = useState('MG-4821');
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const qualifiesFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || fulfillment === 'pickup';
  const deliveryCost = items.length === 0 || qualifiesFreeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryCost;
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  useEffect(() => {
    if (!isOpen) {
      if (checkoutStep === 'confirmed') {
        setCheckoutStep('bag');
      }
    }
  }, [isOpen, checkoutStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = `MG-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(randomId);
    setConfirmedTotal(total);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-black/8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#0A0A0A]" />
            <h2 className="text-base font-semibold text-[#0A0A0A]">
              {checkoutStep === 'bag'
                ? 'Shopping Bag'
                : checkoutStep === 'checkout'
                ? 'Delivery & Branch Pickup'
                : 'Order Confirmed'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="h-9 w-9 rounded-md hover:bg-neutral-100 flex items-center justify-center text-[#0A0A0A] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Free Delivery Progress */}
        {checkoutStep === 'bag' && items.length > 0 && (
          <div className="px-6 py-3 bg-[#F8F8F7] border-b border-black/8 text-xs">
            {remainingForFree > 0 ? (
              <p className="text-neutral-700">
                Add{' '}
                <span className="font-semibold text-[#E10600] tabular-nums">
                  {formatBHD(remainingForFree)}
                </span>{' '}
                more for complimentary Bahrain delivery.
              </p>
            ) : (
              <p className="font-medium text-[#0A0A0A]">
                Your order qualifies for complimentary Bahrain delivery.
              </p>
            )}
            <div className="mt-2 h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E10600] transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {checkoutStep === 'confirmed' ? (
            <div className="py-10 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-[#0A0A0A] text-white mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-[#FF4D47]" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-[#0A0A0A]">
                Order #{orderNumber} Confirmed
              </h3>
              <p className="text-sm text-neutral-600 max-w-xs mx-auto leading-relaxed">
                Thank you{customerName ? `, ${customerName}` : ''}. Your order of{' '}
                <span className="font-semibold text-[#0A0A0A] tabular-nums">
                  {formatBHD(confirmedTotal)}
                </span>{' '}
                is being prepared{' '}
                {fulfillment === 'pickup'
                  ? `for pickup at ${addressOrBranch}.`
                  : 'for Cash on Delivery in Bahrain.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setCheckoutStep('bag');
                  onClose();
                }}
                className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-[#0A0A0A] hover:bg-[#E10600] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="h-10 w-10 text-neutral-300 mx-auto" />
              <p className="text-base font-semibold text-[#0A0A0A]">
                Your bag is currently empty
              </p>
              <p className="text-sm text-neutral-500 max-w-xs mx-auto">
                Explore everyday abayas starting from BHD 2.500 or browse our
                evening wear collection.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 inline-flex items-center px-5 py-2.5 bg-[#0A0A0A] text-white text-xs font-semibold rounded-md hover:bg-[#E10600] transition-colors cursor-pointer"
              >
                Browse Offers
              </button>
            </div>
          ) : checkoutStep === 'bag' ? (
            <ul className="divide-y divide-black/8">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="py-4 flex gap-4"
                >
                  <div className="h-24 w-20 rounded-md overflow-hidden bg-[#F4F3F1] shrink-0">
                    <SmartImage
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#0A0A0A] line-clamp-2">
                          {item.product.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          aria-label={`Remove ${item.product.title}`}
                          className="text-neutral-400 hover:text-[#E10600] p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Size {item.size} · {item.product.fabric}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-black/15 rounded-md">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.product.id, item.size, -1)
                          }
                          aria-label="Decrease quantity"
                          className="h-7 w-7 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.product.id, item.size, 1)
                          }
                          aria-label="Increase quantity"
                          className="h-7 w-7 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#0A0A0A] tabular-nums">
                        {formatBHD(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <form
              id="cod-checkout-form"
              onSubmit={handleConfirmOrder}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#F4F3F1] rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setFulfillment('cod');
                    setAddressOrBranch('');
                  }}
                  className={`py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    fulfillment === 'cod'
                      ? 'bg-white text-[#0A0A0A] shadow-sm'
                      : 'text-neutral-600 hover:text-[#0A0A0A]'
                  }`}
                >
                  Cash on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFulfillment('pickup');
                    setAddressOrBranch(BAHRAIN_BRANCHES[0]);
                  }}
                  className={`py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    fulfillment === 'pickup'
                      ? 'bg-white text-[#0A0A0A] shadow-sm'
                      : 'text-neutral-600 hover:text-[#0A0A0A]'
                  }`}
                >
                  Branch Pickup (Free)
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Fatima Al Khalifa"
                  className="w-full h-11 px-3.5 border border-black/15 rounded-md text-sm focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">
                  Bahrain Mobile (+973)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+973 3300 0000"
                  className="w-full h-11 px-3.5 border border-black/15 rounded-md text-sm focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>

              {fulfillment === 'pickup' ? (
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">
                    Select Pickup Branch (20 Locations)
                  </label>
                  <select
                    value={addressOrBranch}
                    onChange={(e) => setAddressOrBranch(e.target.value)}
                    className="w-full h-11 px-3 border border-black/15 rounded-md text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
                  >
                    {BAHRAIN_BRANCHES.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">
                    Delivery Block, Road &amp; House / Flat
                  </label>
                  <input
                    type="text"
                    required
                    value={addressOrBranch}
                    onChange={(e) => setAddressOrBranch(e.target.value)}
                    placeholder="Riffa, Block 912, Road 1204, House 45"
                    className="w-full h-11 px-3.5 border border-black/15 rounded-md text-sm focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => setCheckoutStep('bag')}
                className="text-xs font-semibold text-neutral-600 hover:text-[#0A0A0A] underline cursor-pointer"
              >
                Back to bag items
              </button>
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && checkoutStep !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-black/8 bg-[#F8F8F7] space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#0A0A0A]">
                  {formatBHD(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>
                  {fulfillment === 'pickup'
                    ? 'Branch Pickup'
                    : 'Bahrain Delivery'}
                </span>
                <span className="tabular-nums font-medium text-[#0A0A0A]">
                  {deliveryCost === 0 ? 'Free' : formatBHD(deliveryCost)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-black/10 text-base font-bold text-[#0A0A0A]">
                <span>Total</span>
                <span className="tabular-nums">{formatBHD(total)}</span>
              </div>
            </div>

            {checkoutStep === 'bag' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="w-full h-12 bg-[#E10600] hover:bg-[#B80500] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
              >
                Proceed to Cash on Delivery / Pickup
              </button>
            ) : (
              <button
                type="submit"
                form="cod-checkout-form"
                className="w-full h-12 bg-[#0A0A0A] hover:bg-[#E10600] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
              >
                Confirm Order · {formatBHD(total)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
