import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Globe, Share2, Link2, Play, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { createContactMessage } from '../services/api';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Location',
    lines: ['42, Grand Line Promenade,', 'Marine Drive,', 'Mumbai 400001, India'],
    color: 'text-[#9A6A45]',
    bg: 'bg-[#FAF6EE]',
  },
  {
    icon: Phone,
    title: 'Phone Numbers',
    lines: ['+91 22 1234 5678', '+91 98765 43210'],
    color: 'text-[#88B8A1]',
    bg: 'bg-[#FAF6EE]',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['grandline@gmail.com'],
    color: 'text-[#7897A5]',
    bg: 'bg-[#FAF6EE]',
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    lines: ['Daily: 08:00 AM – 11:30 PM', 'Breakfast: 08:00 AM – 12:00 PM', 'Kitchen closes at 11:00 PM'],
    color: 'text-[#D6A85F]',
    bg: 'bg-[#FAF6EE]',
  },
];

const socials = [
  { Icon: Globe, href: '#', label: 'Instagram', color: 'hover:text-[#D6A85F]' },
  { Icon: Share2, href: '#', label: 'Twitter', color: 'hover:text-[#7897A5]' },
  { Icon: Link2, href: '#', label: 'Facebook', color: 'hover:text-[#9A6A45]' },
  { Icon: Play, href: '#', label: 'YouTube', color: 'hover:text-[#D6A85F]' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 5) e.message = 'Message must be at least 5 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fill in all required fields.', {
        style: { background: '#FFFFFF', border: '1px solid rgba(239,68,68,0.4)', color: '#3D281D', borderRadius: '16px' },
      });
      return;
    }
    setLoading(true);
    try {
      const res = await createContactMessage(form);
      if (res.offline) {
        toast('Message recorded locally (backend offline)', { icon: 'ℹ️' });
      } else {
        toast.success('Message sent! Our hosts will reply soon.', {
          style: { background: '#FFFFFF', border: '1px solid rgba(214,168,95,0.4)', color: '#3D281D', borderRadius: '16px' },
        });
      }
      setSent(true);
    } catch (err) {
      toast.error(err.message || 'Could not send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] pt-24 pb-20 page-enter">
      {/* Header */}
      <div className="relative py-12 lg:py-16 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-[#EFE2CC]/80 blur-[80px] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.2em] uppercase mb-4 shadow-sm font-bold">
            <Mail size={13} className="text-[#D6A85F]" />
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="font-pirate text-4xl sm:text-5xl lg:text-6xl text-[#3D281D] mb-4">CONTACT US</h1>
          <div className="rope-divider max-w-xs mx-auto mb-4">
            <span className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-xs text-[#D6A85F]">☕</span>
          </div>
          <p className="font-accent italic text-[#7A4F30] text-base sm:text-lg max-w-lg mx-auto">
            Questions, event bookings, or feedback? We’re always delighted to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {contactInfo.map(({ icon: Icon, title, lines, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-[#EFE2CC] shadow-warm hover:shadow-warm-hover transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-2xl ${bg} border border-[#EFE2CC] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} className={color} />
              </div>
              <h3 className="font-pirate text-base text-[#3D281D] mb-2">{title}</h3>
              {lines.map((line, j) => (
                <p key={j} className="font-body text-xs text-[#7A4F30] leading-relaxed">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE2CC] shadow-warm">
              <h2 className="font-display text-xs text-[#9A6A45] tracking-widest uppercase mb-6 flex items-center gap-2 font-bold">
                <Send size={14} className="text-[#D6A85F]" /> Send a Note to Our Hosts
              </h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#88B8A1]/15 border border-[#88B8A1] flex items-center justify-center mx-auto mb-4 text-[#88B8A1]">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-pirate text-xl text-[#3D281D] mb-2">MESSAGE SENT!</h3>
                  <p className="font-body text-xs sm:text-sm text-[#7A4F30] mb-6 max-w-xs mx-auto">
                    Thank you for reaching out. Our café team will respond to your email within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="btn-primary px-6 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-bold shadow-sm"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: 'Your Name', placeholder: 'e.g. Captain Luffy or Alex' },
                      { name: 'email', label: 'Email Address', placeholder: 'alex@example.com', type: 'email' },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-1.5 block font-semibold">{f.label}</label>
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

                  <div>
                    <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-1.5 block font-semibold">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Table reservation, catering inquiry, feedback..."
                      className={`input-pirate w-full px-4 py-3 rounded-2xl text-sm ${errors.subject ? 'border-red-400' : ''}`}
                    />
                    {errors.subject && <p className="font-body text-xs text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="font-display text-xs text-[#9A6A45] tracking-wider uppercase mb-1.5 block font-semibold">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Write your note or question here..."
                      className={`input-pirate w-full px-4 py-3 rounded-2xl text-sm resize-none ${errors.message ? 'border-red-400' : ''}`}
                    />
                    {errors.message && <p className="font-body text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <><div className="spinner w-5 h-5" /> Sending...</>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right – Map + Social */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Map Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#EFE2CC] shadow-warm flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="font-pirate text-lg text-[#3D281D] mb-1">OUR HARBOR LOCATION</h3>
              <p className="font-body text-xs text-[#7A4F30] mb-4 max-w-xs leading-relaxed">
                42 Grand Line Promenade, Marine Drive, Mumbai, Maharashtra 400001
              </p>
              <a
                href="https://maps.google.com/?q=Marine+Drive+Mumbai+India"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5"
              >
                <MapPin size={13} className="text-[#D6A85F]" />
                Open in Google Maps
              </a>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-3xl p-6 border border-[#EFE2CC] shadow-warm">
              <h3 className="font-display text-xs text-[#9A6A45] tracking-widest uppercase mb-4 font-bold">Follow Our Harbor</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF6EE] border border-[#EFE2CC] text-[#5A4030] transition-all duration-300 ${color} hover:bg-white hover:border-[#D6A85F]`}
                  >
                    <Icon size={16} />
                    <span className="font-body text-xs font-semibold">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
