import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Globe, Compass, Calendar, ExternalLink, Send, Sun } from 'lucide-react';
import { audioFX } from '../utils/audioFX';
import toast from 'react-hot-toast';
import { createContactMessage } from '../services/api';

export default function CafeLocationContactSection({ onOpenReservation }) {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    audioFX?.playAdventureClick?.();
    if (!inquiryName || !inquiryEmail || !inquiryMessage) {
      toast.error('Please complete all message fields.');
      return;
    }

    setLoading(true);
    try {
      await createContactMessage({
        name: inquiryName,
        email: inquiryEmail,
        subject: 'General Inquiry / Reservation Request',
        message: inquiryMessage,
      });

      toast.success('Your message has reached our café hosts!', {
        icon: '💌',
        style: {
          background: '#FFFFFF',
          border: '1px solid rgba(214, 168, 95, 0.5)',
          color: '#3D281D',
          boxShadow: '0 8px 24px rgba(61, 40, 29, 0.12)',
        },
      });

      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    } catch (err) {
      toast.error('Could not send message.');
    } finally {
      setLoading(false);
    }
  };

  const openGoogleMaps = () => {
    audioFX?.playAdventureClick?.();
    window.open('https://maps.google.com/?q=Marine+Drive+Mumbai+India', '_blank');
  };

  return (
    <section
      id="contact-destination"
      className="relative py-24 lg:py-32 bg-[#F8F1E5] text-[#3D281D] overflow-hidden border-t border-[#EFE2CC] select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/3 w-[600px] h-[600px] rounded-full bg-[#EFE2CC]/80 blur-[180px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#D6A85F]/10 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#9A6A45_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.22em] uppercase mb-4 shadow-sm"
          >
            <Compass size={13} className="text-[#D6A85F]" />
            <span>VISIT US • LOCATION & RESERVATIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-pirate text-2xl sm:text-5xl lg:text-6xl text-[#3D281D] tracking-wide mb-4 break-words max-w-full"
          >
            FIND YOUR TABLE AT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A45] via-[#D6A85F] to-[#7A4F30]">OUR HARBOR</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-accent italic text-base sm:text-xl text-[#7A4F30] max-w-xl mx-auto"
          >
            We welcome walk-ins daily and offer table reservations for celebrations, family brunches, and private gatherings.
          </motion.p>
        </div>

        {/* Main Grid: Location Info & Message Form */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Location Specs & Hours */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="rounded-3xl bg-[#FFFFFF] border border-[#EFE2CC] p-6 sm:p-8 space-y-6 shadow-warm">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#D6A85F]/30 flex items-center justify-center text-[#9A6A45] flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-pirate text-lg text-[#3D281D] mb-1">
                    Café Location & Harbor Address
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                    42, Grand Line Promenade, Marine Drive Promenade, Mumbai 400001, Maharashtra, India
                  </p>
                  <p className="font-display text-[10px] text-[#9A6A45] uppercase tracking-wider font-semibold mt-1">
                    Near Ocean Harbor Sector • Valet Parking Available
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="border-t border-[#EFE2CC] pt-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#D6A85F]/30 flex items-center justify-center text-[#9A6A45] flex-shrink-0">
                  <Clock size={22} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-pirate text-lg text-[#3D281D]">
                    Café & Kitchen Hours
                  </h4>
                  <p className="font-body text-xs text-[#5A4030]">
                    <span className="font-display text-[#9A6A45] font-bold">Breakfast & Coffee: </span>
                    08:00 AM — 12:00 PM (Daily)
                  </p>
                  <p className="font-body text-xs text-[#5A4030]">
                    <span className="font-display text-[#9A6A45] font-bold">Lunch & Dinner: </span>
                    12:00 PM — 11:30 PM (Kitchen closes 11:00 PM)
                  </p>
                  <p className="text-[11px] font-accent italic text-[#7A4F30]">
                    Open 7 Days a Week • Walk-ins & Reservations Welcome
                  </p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="border-t border-[#EFE2CC] pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] border border-[#EFE2CC] flex items-center justify-center text-[#9A6A45]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-display text-[10px] text-[#9A6A45] uppercase tracking-wider font-bold">
                      Direct Line
                    </p>
                    <a href="tel:+912212345678" className="font-body text-xs text-[#3D281D] hover:text-[#9A6A45] font-semibold">
                      +91 22 1234 5678
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] border border-[#EFE2CC] flex items-center justify-center text-[#9A6A45]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-display text-[10px] text-[#9A6A45] uppercase tracking-wider font-bold">
                      Email Inquiries
                    </p>
                    <a href="mailto:grandline@gmail.com" className="font-body text-xs text-[#3D281D] hover:text-[#9A6A45] font-semibold">
                      grandline@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#EFE2CC] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openGoogleMaps}
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#FAF6EE] border border-[#EFE2CC] text-[#5A4030] font-display text-xs uppercase tracking-wider font-semibold hover:border-[#D6A85F] hover:bg-[#FFFFFF] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ExternalLink size={14} className="text-[#9A6A45]" />
                  <span>Get Directions</span>
                </button>

                <button
                  onClick={() => {
                    audioFX?.playAdventureClick?.();
                    onOpenReservation?.();
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl btn-primary text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Calendar size={14} />
                  <span>Reserve Table</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right: Message Transponder / Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#FFFFFF] border border-[#EFE2CC] p-6 sm:p-8 shadow-warm">
              
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-display text-[#9A6A45] uppercase tracking-wider font-bold mb-1">
                  <Mail size={13} />
                  <span>SEND A NOTE TO OUR TEAM</span>
                </div>
                <h3 className="font-pirate text-2xl text-[#3D281D]">
                  QUESTIONS, CATERING & EVENTS
                </h3>
                <p className="font-body text-xs text-[#7A4F30] mt-1">
                  Reach out regarding private events, custom birthday cakes, or special table arrangements.
                </p>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block font-display text-[11px] uppercase tracking-wider text-[#9A6A45] font-semibold mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Sanji or Sarah"
                    className="w-full px-4 py-3 rounded-2xl input-pirate text-xs"
                  />
                </div>

                <div>
                  <label className="block font-display text-[11px] uppercase tracking-wider text-[#9A6A45] font-semibold mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="w-full px-4 py-3 rounded-2xl input-pirate text-xs"
                  />
                </div>

                <div>
                  <label className="block font-display text-[11px] uppercase tracking-wider text-[#9A6A45] font-semibold mb-1.5">
                    Message / Special Requests
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Tell us about your party size, preferred time, or questions..."
                    className="w-full px-4 py-3 rounded-2xl input-pirate text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  <Send size={14} />
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
