import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calendar, ShoppingBag, X, Sparkles, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserReservations, getUserOrders } from '../services/api';

export default function ConfirmedNotificationModal() {
  const { user, isLoggedIn } = useAuth();
  const [confirmedItem, setConfirmedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !user?.email) return;

    let isMounted = true;

    async function checkConfirmedItems() {
      try {
        const [userReservations, userOrders] = await Promise.all([
          getUserReservations(user.email),
          getUserOrders(user.email),
        ]);

        const acknowledged = JSON.parse(localStorage.getItem('acknowledged_confirmations') || '[]');

        // Check for confirmed reservations first
        const confirmedRes = userReservations.find(r => r.status === 'confirmed' && !acknowledged.includes(r._id));
        if (confirmedRes) {
          if (isMounted) {
            setConfirmedItem({ type: 'reservation', data: confirmedRes });
            setIsOpen(true);
          }
          return;
        }

        // Check for confirmed orders next
        const confirmedOrd = userOrders.find(o => o.status === 'confirmed' && !acknowledged.includes(o._id || o.orderId));
        if (confirmedOrd) {
          if (isMounted) {
            setConfirmedItem({ type: 'order', data: confirmedOrd });
            setIsOpen(true);
          }
          return;
        }
      } catch (err) {
        console.warn('Could not check confirmed items:', err);
      }
    }

    checkConfirmedItems();

    return () => { isMounted = false; };
  }, [isLoggedIn, user]);

  if (!isOpen || !confirmedItem) return null;

  const handleAcknowledge = () => {
    const acknowledged = JSON.parse(localStorage.getItem('acknowledged_confirmations') || '[]');
    const itemId = confirmedItem.data._id || confirmedItem.data.orderId;
    if (itemId) {
      acknowledged.push(itemId);
      localStorage.setItem('acknowledged_confirmations', JSON.stringify(acknowledged));
    }
    setIsOpen(false);
  };

  const isReservation = confirmedItem.type === 'reservation';
  const itemData = confirmedItem.data;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-md w-full rounded-3xl bg-white border border-[#EFE2CC] p-6 sm:p-8 text-[#3D281D] shadow-2xl text-center"
        >
          {/* Close Icon */}
          <button
            onClick={handleAcknowledge}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-[#3D281D] flex items-center justify-center hover:text-[#9A6A45] transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <CheckCircle2 size={36} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-[10px] font-display uppercase tracking-widest text-[#9A6A45] mb-2 font-bold">
            <Sparkles size={12} className="text-[#D6A85F]" />
            <span>ADMIN APPROVED</span>
          </div>

          <h3 className="font-pirate text-3xl text-[#3D281D] mb-2">
            {isReservation ? 'RESERVATION CONFIRMED!' : 'ORDER CONFIRMED!'}
          </h3>

          <p className="font-accent italic text-xs sm:text-sm text-[#7A4F30] mb-6 leading-relaxed">
            Dear <strong className="text-[#9A6A45]">{user.name}</strong>, your {isReservation ? 'table reservation' : 'cafe order'} has been officially confirmed by Grand Line Café admin!
          </p>

          {/* Details Card */}
          <div className="bg-[#FAF6EE] rounded-2xl p-4 mb-6 border border-[#EFE2CC] text-xs text-left space-y-2">
            {isReservation ? (
              <>
                <div className="flex justify-between border-b border-[#EFE2CC] pb-1.5">
                  <span className="text-[#7A4F30]">Date & Time:</span>
                  <span className="font-bold text-[#3D281D]">{itemData.date} at {itemData.time}</span>
                </div>
                <div className="flex justify-between border-b border-[#EFE2CC] pb-1.5">
                  <span className="text-[#7A4F30]">Party Size:</span>
                  <span className="font-bold text-[#3D281D]">{itemData.guests}</span>
                </div>
                {itemData.requests && (
                  <div className="flex justify-between">
                    <span className="text-[#7A4F30]">Special Notes:</span>
                    <span className="text-[#3D281D] font-semibold">{itemData.requests}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-between border-b border-[#EFE2CC] pb-1.5">
                  <span className="text-[#7A4F30]">Order Reference:</span>
                  <span className="font-bold text-[#3D281D]">{itemData.orderId}</span>
                </div>
                <div className="flex justify-between border-b border-[#EFE2CC] pb-1.5">
                  <span className="text-[#7A4F30]">Items Ordered:</span>
                  <span className="font-bold text-[#3D281D]">{itemData.items?.length || 0} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A4F30]">Total Paid/Amount:</span>
                  <span className="font-bold text-emerald-700">₹{itemData.total}</span>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleAcknowledge}
            className="w-full py-3.5 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold shadow-md cursor-pointer"
          >
            Awesome! Got it ☕
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
