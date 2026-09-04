import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Globe, Share2, Link2, Play, Mail, Phone, MapPin, Clock, Send, Heart, Compass } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/#cafe-intro', label: 'About the Café' },
  { to: '/menu', label: 'Full Menu' },
  { to: '/crew', label: 'Our Crew' },
  { to: '/about', label: 'Our Story' },
];

const menuHighlights = [
  { to: '/menu', label: 'Breakfast & Brunch' },
  { to: '/menu', label: 'Gourmet Burgers' },
  { to: '/menu', label: 'Wood-Fired Pizza' },
  { to: '/menu', label: 'Handmade Pasta' },
  { to: '/menu', label: 'Indian & Asian Specials' },
  { to: '/menu', label: 'Artisan Coffee & Desserts' },
];

const socials = [
  { Icon: Globe, href: '#', label: 'Instagram', color: 'hover:text-[#D6A85F]' },
  { Icon: Share2, href: '#', label: 'Twitter / X', color: 'hover:text-[#7897A5]' },
  { Icon: Link2, href: '#', label: 'Facebook', color: 'hover:text-[#9A6A45]' },
  { Icon: Play, href: '#', label: 'YouTube', color: 'hover:text-[#D6A85F]' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleReservationClick = () => {
    if (!isLoggedIn) {
      toast.error('Please log in first to reserve a table.');
      navigate('/login', { state: { from: '/reservations', message: 'Please log in first to reserve a table.' } });
      return;
    }
    navigate('/reservations');
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Welcome to the Grand Line Café newsletter!', {
      icon: '☕',
      style: {
        background: '#FFFFFF',
        border: '1px solid rgba(214, 168, 95, 0.4)',
        color: '#3D281D',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(61, 40, 29, 0.1)',
      },
    });
    setEmail('');
  };

  return (
    <footer className="relative bg-[#FAF6EE] text-[#3D281D] border-t border-[#EFE2CC] pt-16 pb-8 overflow-hidden select-none">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D6A85F]/50 to-transparent" />
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#EFE2CC]/80 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#D6A85F]/10 blur-[120px] pointer-events-none" />

      {/* Decorative ship wheel motif in corner */}
      <div className="absolute top-8 right-8 opacity-[0.06] pointer-events-none text-[#9A6A45]">
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={angle}
                x1={50 + 14 * Math.cos(rad)}
                y1={50 + 14 * Math.sin(rad)}
                x2={50 + 45 * Math.cos(rad)}
                y2={50 + 45 * Math.sin(rad)}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#D6A85F] to-[#E6BD7B] shadow-sm overflow-hidden">
                <img
                  src="/grand_line_logo.jpg"
                  alt="Grand Line Café Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-pirate text-xl text-[#3D281D] block leading-none">Grand Line</span>
                <span className="font-display text-[9px] text-[#9A6A45] tracking-[0.24em] font-bold block mt-1 uppercase">
                  CAFÉ & RESTAURANT
                </span>
              </div>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#7A4F30] leading-relaxed mb-5">
              Where every cup, plate & story begins an adventure. Serving handcrafted drinks, comforting food, and unforgettable moments.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl bg-white border border-[#EFE2CC] flex items-center justify-center text-[#7A4F30] ${color} transition-all duration-300 hover:border-[#D6A85F] hover:shadow-sm`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xs text-[#9A6A45] tracking-widest mb-4 uppercase font-bold">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="font-body text-xs sm:text-sm text-[#5A4030] hover:text-[#9A6A45] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F]/50 group-hover:bg-[#D6A85F] transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleReservationClick}
                  className="font-body text-xs sm:text-sm text-[#5A4030] hover:text-[#9A6A45] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F]/50 group-hover:bg-[#D6A85F] transition-colors" />
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="font-body text-xs sm:text-sm text-[#5A4030] hover:text-[#9A6A45] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F]/50 group-hover:bg-[#D6A85F] transition-colors" />
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-xs text-[#9A6A45] tracking-widest mb-4 uppercase font-bold">
              Visit Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#D6A85F] flex-shrink-0 mt-0.5" />
                <span className="font-body text-xs sm:text-sm text-[#5A4030]">
                  42 Grand Line Promenade, Marine Drive, Mumbai 400001
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#D6A85F] flex-shrink-0" />
                <a href="tel:+912212345678" className="font-body text-xs sm:text-sm text-[#5A4030] hover:text-[#9A6A45] transition-colors">
                  +91 22 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#D6A85F] flex-shrink-0" />
                <a href="mailto:grandline@gmail.com" className="font-body text-xs sm:text-sm text-[#5A4030] hover:text-[#9A6A45] transition-colors">
                  grandline@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={15} className="text-[#D6A85F] flex-shrink-0 mt-0.5" />
                <div className="font-body text-xs sm:text-sm text-[#5A4030]">
                  <p>Daily: 08:00 AM – 11:30 PM</p>
                  <p className="text-[11px] text-[#7A4F30]">Kitchen closes at 11:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-xs text-[#9A6A45] tracking-widest mb-4 uppercase font-bold">
              Join Our Café Circle
            </h4>
            <p className="font-body text-xs sm:text-sm text-[#7A4F30] mb-3.5 leading-relaxed">
              Receive seasonal menu announcements, special chef tasting invites, and fresh coffee news.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-2xl input-pirate text-xs pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl btn-primary flex items-center justify-center shadow-sm"
                  aria-label="Subscribe"
                >
                  <Send size={13} />
                </button>
              </div>
              <p className="font-body text-[11px] text-[#7A4F30]/70">
                Warm stories only. No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="rope-divider mb-6">
          <span className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-xs text-[#D6A85F]">
            ☕
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center text-xs text-[#7A4F30]">
          <p>
            © 2026 Grand Line Café & Restaurant. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Inspired by One Piece • Crafted with <Heart size={12} className="text-red-400 fill-current inline" /> for food & adventure
          </p>
        </div>
      </div>
    </footer>
  );
}
