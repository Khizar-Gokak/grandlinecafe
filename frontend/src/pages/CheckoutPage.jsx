import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { User, Mail, Phone, MapPin, Truck, Store, CreditCard, Smartphone, Wallet, CheckCircle, ChevronRight, Coffee } from 'lucide-react';
import toast from 'react-hot-toast';
import { createOrder } from '../services/api';
import { useAuth } from '../context/AuthContext';

const paymentMethods = [
  { id: 'upi', icon: Smartphone, label: 'UPI / GPay / PhonePe', desc: 'Instant & contactless payment' },
  { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
  { id: 'wallet', icon: Wallet, label: 'Digital Wallets', desc: 'Paytm, Amazon Pay' },
  { id: 'cod', icon: Store, label: 'Pay at Counter / Table', desc: 'Settle when you arrive' },
];

function generateOrderId() {
  return 'GLC-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
}

export default function CheckoutPage() {
  const { items, subtotal, tax, serviceCharge, total, clearCart } = useCart();
  const { user, token, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = info, 2 = payment
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [orderId] = useState(generateOrderId);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please log in first to place an order.');
      navigate('/login', {
        state: { from: '/checkout', message: 'Please log in first to place an order.' },
      });
      return;
    }

    setForm(prev => ({
      ...prev,
      name: prev.name || user?.name || '',
      email: prev.email || user?.email || '',
    }));
  }, [isLoggedIn, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.length < 8) e.phone = 'Valid phone required';
    if (deliveryType === 'delivery' && !form.address.trim()) e.address = 'Delivery address required';
    return e;
  };

  const handleNext = () => {
    if (step === 1) {
      const e = validateStep1();
      if (Object.keys(e).length > 0) { setErrors(e); return; }
    }
    setStep(s => s + 1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        orderId,
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
        },
        deliveryType,
        paymentMethod,
        items: items.map(i => ({
          menuItemId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        subtotal,
        tax,
        serviceCharge,
        total,
      };

      const res = await createOrder(orderPayload, token);
      if (res.offline) {
        toast('Order saved locally (backend offline)', { icon: 'ℹ️' });
      } else {
        toast.success('Order placed successfully!');
      }
      setConfirmed(true);
      clearCart();
    } catch (err) {
      toast.error(err.message || 'Could not place order');
    } finally {
      setLoading(false);
    }
  };

  // Empty cart redirect
  if (items.length === 0 && !confirmed) {
    return (
      <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] pt-24 pb-20 flex items-center justify-center page-enter">
        <div className="text-center bg-white rounded-3xl p-10 border border-[#EFE2CC] shadow-warm max-w-md mx-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] flex items-center justify-center mx-auto mb-4 text-3xl">
            ☕
          </div>
          <h2 className="font-pirate text-2xl text-[#3D281D] mb-2">Your Tray is Empty</h2>
          <p className="font-body text-xs text-[#7A4F30] mb-6">Add some delicious dishes or drinks from our menu before checking out.</p>
          <button onClick={() => navigate('/menu')} className="btn-primary px-7 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold shadow-sm">
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  // Order Confirmed Screen
  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] pt-24 pb-20 flex items-center justify-center page-enter">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          className="max-w-lg w-full mx-4 bg-white rounded-3xl p-8 sm:p-10 text-center border border-[#EFE2CC] shadow-warm-lg"
        >
          <div className="w-20 h-20 rounded-full bg-[#88B8A1]/15 border border-[#88B8A1] flex items-center justify-center mx-auto mb-5 text-[#88B8A1]">
            <CheckCircle size={40} />
          </div>

          <h2 className="font-pirate text-2xl lg:text-3xl text-[#3D281D] mb-2">
            ORDER CONFIRMED!
          </h2>

          <p className="font-accent italic text-[#5A4030] text-sm sm:text-base mb-6 leading-relaxed">
            Thank you, <strong className="text-[#9A6A45]">{form.name}</strong>!<br />
            Our kitchen team has received your order and is preparing your meal with care.
          </p>

          <div className="bg-[#FAF6EE] rounded-2xl p-5 mb-6 text-left space-y-2 border border-[#EFE2CC] text-xs">
            <div className="flex justify-between">
              <span className="text-[#7A4F30]">Order Number:</span>
              <span className="font-display text-[#3D281D] font-bold">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A4F30]">Total Amount:</span>
              <span className="font-pirate text-sm text-[#9A6A45] font-bold">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A4F30]">Service Type:</span>
              <span className="text-[#3D281D] font-semibold capitalize">{deliveryType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A4F30]">Est. Preparation Time:</span>
              <span className="text-[#3D281D] font-semibold">15–25 minutes</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate('/')} className="btn-outline flex-1 py-3 rounded-2xl text-xs uppercase tracking-wider font-semibold">
              Return Home
            </button>
            <button onClick={() => navigate('/menu')} className="btn-primary flex-1 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold shadow-sm">
              Explore More Dishes
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] pt-24 pb-20 page-enter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-pirate text-4xl text-[#3D281D] mb-2">COMPLETE YOUR ORDER</h1>
          <p className="font-accent italic text-[#7A4F30] text-sm">Review your items and complete payment details.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {['Customer Info', 'Payment Details'].map((label, i) => {
            const s = i + 1;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all duration-300 ${
                  step === s ? 'btn-primary font-bold shadow-sm' :
                  step > s ? 'bg-[#FAF6EE] text-[#9A6A45] border border-[#D6A85F]' :
                  'bg-white text-[#7A4F30] border border-[#EFE2CC]'
                }`}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {step > s ? '✓' : s}
                  </span>
                  <span>{label}</span>
                </div>
                {i < 1 && <div className={`w-8 h-px transition-all duration-300 ${step > s ? 'bg-[#D6A85F]' : 'bg-[#EFE2CC]'}`} />}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left – Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1 – Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE2CC] shadow-warm"
                >
                  <h2 className="font-display text-xs text-[#9A6A45] tracking-widest uppercase mb-6 flex items-center gap-2 font-bold">
                    <User size={14} className="text-[#D6A85F]" /> Customer Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    {[
                      { name: 'name', label: 'Full Name', icon: User, placeholder: 'e.g. Captain Luffy or Alex' },
                      { name: 'email', label: 'Email Address', icon: Mail, placeholder: 'alex@example.com', type: 'email' },
                      { name: 'phone', label: 'Phone Number', icon: Phone, placeholder: '+91 98765 43210', type: 'tel' },
                    ].map(f => (
                      <div key={f.name} className={f.name === 'email' ? 'sm:col-span-2' : ''}>
                        <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-1.5 flex items-center gap-1.5 font-semibold">
                          <f.icon size={11} className="text-[#D6A85F]" /> {f.label}
                        </label>
                        <input
                          type={f.type || 'text'}
                          name={f.name}
                          value={form[f.name]}
                          onChange={handleChange}
                          placeholder={f.placeholder}
                          className={`input-pirate w-full px-4 py-3 rounded-2xl text-sm ${errors[f.name] ? 'border-red-400' : ''}`}
                        />
                        {errors[f.name] && <p className="font-body text-xs text-red-500 mt-1">{errors[f.name]}</p>}
                      </div>
                    ))}
                  </div>

                  {/* Delivery type */}
                  <div className="mb-6">
                    <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-2.5 flex items-center gap-1.5 font-semibold">
                      <Truck size={11} className="text-[#D6A85F]" /> Dining Option
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'pickup', icon: Store, label: 'Dine-In / Pick Up', desc: 'Enjoy at the café' },
                        { id: 'delivery', icon: Truck, label: 'Takeaway / Delivery', desc: 'Packed fresh for you' },
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDeliveryType(opt.id)}
                          className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                            deliveryType === opt.id
                              ? 'border-[#D6A85F] bg-[#FAF6EE] shadow-sm'
                              : 'border-[#EFE2CC] bg-white hover:border-[#D6A85F]/50'
                          }`}
                        >
                          <opt.icon size={18} className={`mb-1.5 ${deliveryType === opt.id ? 'text-[#9A6A45]' : 'text-[#7A4F30]'}`} />
                          <div className="font-display text-xs text-[#3D281D] font-bold uppercase">{opt.label}</div>
                          <div className="font-body text-xs text-[#7A4F30]">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {deliveryType === 'delivery' && (
                    <div className="mb-6">
                      <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-1.5 flex items-center gap-1.5 font-semibold">
                        <MapPin size={11} className="text-[#D6A85F]" /> Delivery Address
                      </label>
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Enter your complete delivery address..."
                        className={`input-pirate w-full px-4 py-3 rounded-2xl text-sm resize-none ${errors.address ? 'border-red-400' : ''}`}
                      />
                      {errors.address && <p className="font-body text-xs text-red-500 mt-1">{errors.address}</p>}
                    </div>
                  )}

                  <button onClick={handleNext} className="btn-primary w-full py-3.5 rounded-2xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-sm">
                    <span>Continue to Payment</span>
                    <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {/* Step 2 – Payment */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE2CC] shadow-warm"
                >
                  <h2 className="font-display text-xs text-[#9A6A45] tracking-widest uppercase mb-6 flex items-center gap-2 font-bold">
                    <CreditCard size={14} className="text-[#D6A85F]" /> Select Payment Method
                  </h2>
                  <div className="space-y-3 mb-6">
                    {paymentMethods.map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`w-full p-4 rounded-2xl border flex items-center gap-4 text-left transition-all duration-300 cursor-pointer ${
                          paymentMethod === m.id
                            ? 'border-[#D6A85F] bg-[#FAF6EE] shadow-sm'
                            : 'border-[#EFE2CC] bg-white hover:border-[#D6A85F]/50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${paymentMethod === m.id ? 'bg-[#D6A85F]/20 text-[#9A6A45]' : 'bg-[#FAF6EE] text-[#7A4F30]'}`}>
                          <m.icon size={18} />
                        </div>
                        <div>
                          <div className="font-pirate text-sm text-[#3D281D]">{m.label}</div>
                          <div className="font-body text-xs text-[#7A4F30]">{m.desc}</div>
                        </div>
                        {paymentMethod === m.id && (
                          <CheckCircle size={18} className="text-[#88B8A1] ml-auto flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-outline flex-1 py-3.5 rounded-2xl text-xs uppercase tracking-wider font-semibold">
                      Back
                    </button>
                    <button onClick={handlePlaceOrder} disabled={loading} className="btn-primary flex-1 py-3.5 rounded-2xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-sm disabled:opacity-60">
                      {loading ? (
                        <>
                          <div className="spinner w-4 h-4" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Place Order (₹{total.toLocaleString('en-IN')})</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right – Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-[#EFE2CC] shadow-warm sticky top-24">
              <h3 className="font-display text-xs text-[#9A6A45] tracking-widest uppercase mb-4 font-bold">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF6EE]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=80'; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-pirate text-xs text-[#3D281D] leading-snug line-clamp-1">{item.name}</p>
                      <p className="font-body text-xs text-[#7A4F30]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-body text-xs text-[#3D281D] font-bold flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#EFE2CC] pt-4 space-y-2">
                <div className="flex justify-between font-body text-xs text-[#7A4F30]">
                  <span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-body text-xs text-[#7A4F30]">
                  <span>GST (5%)</span><span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-body text-xs text-[#7A4F30]">
                  <span>Service / Packaging</span><span>₹{serviceCharge.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-pirate text-base text-[#3D281D] pt-2 border-t border-[#EFE2CC]">
                  <span>Grand Total</span>
                  <span className="text-[#9A6A45] font-bold">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
