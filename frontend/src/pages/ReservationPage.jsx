import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Mail, Phone, User, MessageSquare, CheckCircle, Compass } from 'lucide-react';
import toast from 'react-hot-toast';
import { createReservation } from '../services/api';
import { useAuth } from '../context/AuthContext';

const timeSlots = [
  '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM',
  '12:30 PM', '01:30 PM', '02:30 PM', '03:30 PM',
  '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM',
];

const guestOptions = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '7 Guests', '8+ Guests'];

function InputField({ label, icon: Icon, error, ...props }) {
  return (
    <div>
      <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-1.5 flex items-center gap-1.5 font-semibold">
        <Icon size={12} className="text-[#D6A85F]" />
        {label}
      </label>
      <input
        className={`input-pirate w-full px-4 py-3 rounded-2xl text-sm ${error ? 'border-red-400' : ''}`}
        {...props}
      />
      {error && <p className="font-body text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function ReservationPage() {
  const { user, token, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    date: '',
    time: '',
    guests: '2 Guests',
    requests: '',
  });

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please log in first to reserve a table.');
      navigate('/login', {
        state: { from: '/reservations', message: 'Please log in first to reserve a table.' },
      });
    } else {
      setForm(prev => ({
        ...prev,
        name: prev.name || user?.name || '',
        email: prev.email || user?.email || '',
      }));
    }
  }, [isLoggedIn, user, navigate]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || !/^[\d\s+\-()]{8,}$/.test(form.phone)) e.phone = 'Valid phone number required';
    if (!form.date) e.date = 'Please select a date';
    if (!form.time) e.time = 'Please select a time slot';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      toast.error('Please fill in all required fields.', {
        style: { background: '#FFFFFF', border: '1px solid rgba(239,68,68,0.4)', color: '#3D281D', borderRadius: '16px' },
      });
      return;
    }
    setLoading(true);
    try {
      const res = await createReservation(form, token);
      if (res.offline) {
        toast('Reservation saved locally (backend offline)', { icon: 'ℹ️' });
      } else {
        toast.success('Reservation submitted! Pending admin approval.');
      }
      setSubmitted(true);
    } catch (err) {
      toast.error(err.message || 'Could not save reservation');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] pt-24 pb-20 flex items-center justify-center page-enter">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="max-w-lg w-full mx-4 bg-white rounded-3xl p-10 text-center border border-[#EFE2CC] shadow-warm-lg"
        >
          <div className="w-18 h-18 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto mb-5 text-amber-700">
            <Clock size={36} />
          </div>
          <h2 className="font-pirate text-2xl text-[#3D281D] mb-3">RESERVATION SUBMITTED!</h2>
          <p className="font-accent italic text-[#5A4030] text-base mb-6 leading-relaxed">
            Dear <strong className="text-[#9A6A45]">{form.name}</strong>,<br />
            Your table request for <strong className="text-[#9A6A45]">{form.guests}</strong> on{' '}
            <strong className="text-[#9A6A45]">{form.date}</strong> at{' '}
            <strong className="text-[#9A6A45]">{form.time}</strong> is <strong className="text-amber-700">Pending Admin Approval</strong>.
          </p>
          <div className="bg-[#FAF6EE] rounded-2xl p-4 mb-6 text-left space-y-2 border border-[#EFE2CC] text-xs">
            <div className="flex justify-between">
              <span className="text-[#7A4F30]">Status:</span>
              <span className="text-amber-700 font-display font-bold">Pending Admin Approval</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A4F30]">Confirmation sent to:</span>
              <span className="text-[#3D281D] font-semibold">{form.email}</span>
            </div>
          </div>
          <p className="font-body text-xs text-[#7A4F30] mb-6">
            We look forward to welcoming you to Grand Line Café & Restaurant! ☕
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', date:'', time:'', guests:'2 Guests', requests:'' }); }}
            className="btn-primary px-7 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold shadow-sm"
          >
            Make Another Booking
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] pt-24 pb-20 page-enter">
      {/* Header */}
      <div className="relative py-12 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-[#EFE2CC]/80 blur-[80px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.2em] uppercase mb-4 shadow-sm font-bold">
            <Calendar size={13} className="text-[#D6A85F]" />
            <span>TABLE RESERVATIONS</span>
          </div>
          <h1 className="font-pirate text-4xl sm:text-5xl text-[#3D281D] mb-4">
            RESERVE YOUR TABLE
          </h1>
          <div className="rope-divider max-w-xs mx-auto mb-4">
            <span className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-xs text-[#D6A85F]">☕</span>
          </div>
          <p className="font-accent italic text-[#7A4F30] text-base max-w-md mx-auto">
            Book your favorite dining spot in our sunlit café lounge or intimate evening booths.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.form
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE2CC] shadow-warm"
        >
          {/* Personal Details */}
          <div className="mb-8">
            <h3 className="font-display text-xs text-[#9A6A45] tracking-widest uppercase mb-5 flex items-center gap-2 font-bold">
              <User size={14} className="text-[#D6A85F]" />
              Guest Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                icon={User}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Captain Luffy or Alex"
                error={errors.name}
              />
              <InputField
                label="Email Address"
                icon={Mail}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                error={errors.email}
              />
              <InputField
                label="Phone Number"
                icon={Phone}
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                error={errors.phone}
              />
              <div>
                <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-1.5 flex items-center gap-1.5 font-semibold">
                  <Users size={12} className="text-[#D6A85F]" />
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className="input-pirate w-full px-4 py-3 rounded-2xl text-sm appearance-none cursor-pointer"
                >
                  {guestOptions.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="mb-8">
            <h3 className="font-display text-xs text-[#9A6A45] tracking-widest uppercase mb-5 flex items-center gap-2 font-bold">
              <Calendar size={14} className="text-[#D6A85F]" />
              Date & Seating Time
            </h3>
            <div className="mb-4">
              <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-1.5 flex items-center gap-1.5 font-semibold">
                <Calendar size={12} className="text-[#D6A85F]" />
                Select Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                min={today}
                onChange={handleChange}
                className={`input-pirate w-full px-4 py-3 rounded-2xl text-sm ${errors.date ? 'border-red-400' : ''}`}
              />
              {errors.date && <p className="font-body text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-2.5 flex items-center gap-1.5 font-semibold">
                <Clock size={12} className="text-[#D6A85F]" />
                Select Time Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => { setForm(p => ({ ...p, time: slot })); if (errors.time) setErrors(p => ({ ...p, time: '' })); }}
                    className={`py-2 px-3 rounded-xl font-body text-xs transition-all duration-200 cursor-pointer ${
                      form.time === slot
                        ? 'btn-primary font-bold shadow-sm'
                        : 'bg-[#FAF6EE] hover:bg-[#EFE2CC] border border-[#EFE2CC] text-[#5A4030]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time && <p className="font-body text-xs text-red-500 mt-2">{errors.time}</p>}
            </div>
          </div>

          {/* Special Requests */}
          <div className="mb-8">
            <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-1.5 flex items-center gap-1.5 font-semibold">
              <MessageSquare size={12} className="text-[#D6A85F]" />
              Special Requests (Optional)
            </label>
            <textarea
              name="requests"
              value={form.requests}
              onChange={handleChange}
              rows={3}
              placeholder="Birthday celebration, window table preference, allergen notes..."
              className="input-pirate w-full px-4 py-3 rounded-2xl text-sm resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <div className="spinner w-5 h-5" />
                <span>Securing Your Table...</span>
              </>
            ) : (
              <>
                <Calendar size={16} />
                <span>Confirm Table Reservation</span>
              </>
            )}
          </button>

          <p className="font-body text-xs text-[#7A4F30] text-center mt-4">
            Walk-ins are also welcome daily during open café hours.
          </p>
        </motion.form>
      </div>
    </div>
  );
}
