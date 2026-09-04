import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Coffee, Sparkles, X, CheckCircle2, Compass } from 'lucide-react';
import toast from 'react-hot-toast';
import { audioFX } from '../utils/audioFX';
import { createReservation } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function GrandLineReservationModal({ isOpen, onClose }) {
  const { user, token, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    guests: '2 Guests',
    date: '',
    time: '18:00 (Dinner)',
    seatingPreference: 'Window Garden Booth',
    specialNotes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !isLoggedIn) {
      toast.error('Please log in first to reserve a table.');
      onClose();
      navigate('/login', {
        state: { from: '/reservations', openModal: true, message: 'Please log in first to reserve a table.' },
      });
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [isOpen, isLoggedIn, user, onClose, navigate]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    audioFX?.playAdventureClick?.();

    if (!formData.name || !formData.email || !formData.date) {
      toast.error('Please enter name, email and reservation date.');
      return;
    }

    setLoading(true);
    try {
      await createReservation({
        ...formData,
        requests: `${formData.seatingPreference} - ${formData.specialNotes}`,
      }, token);

      setSubmitted(true);
      toast.success('Your table has been reserved at Grand Line Café!', {
        icon: '☕',
        style: {
          background: '#FFFFFF',
          border: '1px solid rgba(214, 168, 95, 0.5)',
          color: '#3D281D',
          boxShadow: '0 8px 24px rgba(61, 40, 29, 0.12)',
        },
      });
    } catch (err) {
      toast.error('Could not save reservation');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="relative max-w-xl w-full rounded-3xl bg-[#FFFFFF] border border-[#EFE2CC] p-6 sm:p-8 text-[#3D281D] shadow-2xl max-h-[92vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-[#3D281D] flex items-center justify-center hover:text-[#9A6A45] transition-colors cursor-pointer shadow-sm"
          >
            <X size={18} />
          </button>

          {!submitted ? (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-[10px] font-display uppercase tracking-widest text-[#9A6A45] mb-2 font-bold">
                  <Compass size={12} className="text-[#D6A85F]" />
                  <span>TABLE RESERVATION LOG</span>
                </div>
                <h3 className="font-pirate text-2xl sm:text-3xl text-[#3D281D]">
                  BOOK YOUR CAFÉ TABLE
                </h3>
                <p className="font-accent italic text-xs sm:text-sm text-[#7A4F30] mt-1">
                  Enjoy welcoming seating in our sunlit dining room or cozy window booths.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Captain Luffy or Alex"
                      className="w-full px-3.5 py-2.5 rounded-xl input-pirate text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl input-pirate text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
                      Party Size
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl input-pirate text-xs cursor-pointer"
                    >
                      <option value="1 Guest">1 Guest (Solo Table)</option>
                      <option value="2 Guests">2 Guests (Couple Table)</option>
                      <option value="3-4 Guests">3-4 Guests (Booth)</option>
                      <option value="5-8 Guests">5-8 Guests (Large Table)</option>
                      <option value="9+ Guests">9+ Guests (Private Area)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl input-pirate text-xs cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
                      Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl input-pirate text-xs cursor-pointer"
                    >
                      <option value="09:00 (Morning Breakfast)">09:00 AM</option>
                      <option value="11:30 (Brunch)">11:30 AM</option>
                      <option value="13:30 (Lunch)">1:30 PM</option>
                      <option value="16:00 (Afternoon Tea)">4:00 PM</option>
                      <option value="18:30 (Dinner)">6:30 PM</option>
                      <option value="20:30 (Late Dinner)">8:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
                    Seating Preference
                  </label>
                  <select
                    value={formData.seatingPreference}
                    onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl input-pirate text-xs cursor-pointer"
                  >
                    <option value="Window Garden Booth (Sunlit & Quiet)">Window Garden Booth (Sunlit & Quiet)</option>
                    <option value="Main Dining Room (Spacious & Warm)">Main Dining Room (Spacious & Warm)</option>
                    <option value="Coffee Bar Counter (Watch Master Baristas)">Coffee Bar Counter (Watch Master Baristas)</option>
                    <option value="Collector Corner Alcove">Collector Corner Alcove</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
                    Special Notes or Dietary Preferences
                  </label>
                  <input
                    type="text"
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    placeholder="Birthday celebration, high chair needed, oat milk, allergen notes..."
                    className="w-full px-3.5 py-2.5 rounded-xl input-pirate text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60"
                  >
                    <Calendar size={15} />
                    <span>{loading ? 'Securing Table...' : 'Confirm Table Reservation'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#88B8A1]/15 border border-[#88B8A1] flex items-center justify-center mx-auto text-[#88B8A1]">
                <CheckCircle2 size={36} />
              </div>

              <h3 className="font-pirate text-3xl text-[#3D281D]">
                RESERVATION CONFIRMED!
              </h3>

              <p className="font-body text-xs sm:text-sm text-[#5A4030] max-w-sm mx-auto leading-relaxed">
                Dear <span className="text-[#9A6A45] font-bold">{formData.name}</span>, your table for <span className="text-[#9A6A45] font-semibold">{formData.guests}</span> is secured for <span className="text-[#9A6A45] font-semibold">{formData.date} at {formData.time}</span>.
              </p>

              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#EFE2CC] text-xs text-left max-w-sm mx-auto space-y-1.5">
                <p><span className="text-[#9A6A45] font-display font-bold">Seating Area:</span> {formData.seatingPreference}</p>
                <p><span className="text-[#9A6A45] font-display font-bold">Confirmation Email:</span> Sent to {formData.email}</p>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold shadow-sm"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
