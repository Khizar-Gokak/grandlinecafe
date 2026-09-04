import { X, Trash2, Plus, Minus, ShoppingBag, ChevronRight, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, tax, serviceCharge, total, itemCount, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 bg-[#FDFBF7] border-l border-[#EFE2CC] shadow-2xl flex flex-col text-[#3D281D]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#EFE2CC] bg-[#FAF6EE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D6A85F] to-[#E6BD7B] flex items-center justify-center text-[#24160E] shadow-sm">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h2 className="font-pirate text-base text-[#3D281D]">Your Order Tray</h2>
                  <p className="font-body text-xs text-[#7A4F30]">{itemCount} item{itemCount !== 1 ? 's' : ''} selected</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs font-body text-red-500/80 hover:text-red-600 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-2 rounded-xl bg-white border border-[#EFE2CC] text-[#7A4F30] hover:text-[#3D281D] transition-colors shadow-sm"
                  aria-label="Close cart"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-64 gap-4 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] flex items-center justify-center text-3xl">
                      ☕
                    </div>
                    <h3 className="font-pirate text-lg text-[#3D281D]">Your tray is empty</h3>
                    <p className="font-body text-xs text-[#7A4F30] max-w-xs">
                      Explore our handcrafted coffee, comforting meals, and delicious desserts to start your order.
                    </p>
                    <button
                      onClick={() => { closeCart(); navigate('/menu'); }}
                      className="btn-primary px-6 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-bold mt-2 shadow-sm"
                    >
                      Browse the Menu
                    </button>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-3 p-3.5 rounded-2xl bg-white border border-[#EFE2CC] group shadow-sm"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF6EE]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=80'; }}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-pirate text-xs text-[#3D281D] leading-snug mb-1 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="font-body text-xs text-[#9A6A45] font-bold">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>

                        {/* Qty Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-[#FAF6EE] border border-[#EFE2CC] flex items-center justify-center hover:bg-[#EFE2CC] text-[#5A4030] transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-display text-xs text-[#3D281D] font-bold w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-[#FAF6EE] border border-[#EFE2CC] flex items-center justify-center hover:bg-[#EFE2CC] text-[#5A4030] transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                          <span className="ml-auto font-body text-xs text-[#3D281D] font-semibold">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start p-1.5 rounded-lg opacity-40 group-hover:opacity-100 hover:bg-red-50 text-red-500 transition-all"
                        aria-label="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#EFE2CC] p-5 space-y-3 bg-[#FAF6EE]">
                {/* Totals */}
                <div className="space-y-1.5 text-xs font-body">
                  <div className="flex justify-between text-[#7A4F30]">
                    <span>Item Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#7A4F30]">
                    <span>GST (5%)</span>
                    <span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#7A4F30]">
                    <span>Packaging / Service</span>
                    <span>₹{serviceCharge.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#3D281D] font-pirate text-base pt-2 border-t border-[#EFE2CC]">
                    <span>Total Amount</span>
                    <span className="text-[#9A6A45] font-bold">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-2xl btn-primary flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
