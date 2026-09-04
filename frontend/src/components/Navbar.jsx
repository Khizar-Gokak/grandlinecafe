import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Coffee, Compass, Sparkles, User, LogIn, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useScrollPosition } from '../hooks/useScrollPosition';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/#cafe-intro', label: 'Café' },
  { to: '/menu', label: 'Menu' },
  { to: '/#crew-favorites', label: 'Crew' },
  { to: '/#cafe-experience', label: 'Experience' },
  { to: '/#gallery-section', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ onReplayIntro }) {
  const { itemCount, openCart } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const { isScrolled } = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (to) => {
    setMenuOpen(false);
    if (to === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (to.startsWith('/#')) {
      const hash = to.split('#')[1];
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const e2 = document.getElementById(hash);
          if (e2) e2.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
      return;
    }
    navigate(to);
  };

  const handleReserveClick = () => {
    setMenuOpen(false);
    if (!isLoggedIn) {
      toast.error('Please log in first to reserve a table.');
      navigate('/login', {
        state: { from: '/reservations', message: 'Please log in first to reserve a table.' },
      });
    } else {
      navigate('/reservations');
    }
  };

  const handleCartClick = () => {
    openCart();
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 select-none ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(61,40,29,0.08)] border-b border-[#EFE2CC]'
            : 'bg-gradient-to-b from-[#FAF6EE]/95 via-[#FAF6EE]/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Cafe Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group min-w-0 max-w-[65vw] sm:max-w-none"
              onClick={() => setMenuOpen(false)}
            >
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#D6A85F] to-[#E6BD7B] shadow-sm group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <img
                    src="/grand_line_logo.jpg"
                    alt="Grand Line Café Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-0 min-w-0">
                <span className="brand-title font-pirate text-sm sm:text-xl text-[#3D281D] tracking-[-0.02em] leading-[1] block group-hover:text-[#9A6A45] transition-colors truncate">
                  GRAND LINE
                </span>
                <span className="brand-subtitle block font-display text-[8px] sm:text-[10px] text-[#9A6A45] tracking-[0.06em] sm:tracking-[0.08em] leading-[1] uppercase font-bold truncate">
                  CAFÉ & RESTAURANT
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1.5">
              {navLinks.map(({ to, label }) => (
                <button
                  key={label}
                  onClick={() => handleNavClick(to)}
                  className="relative px-3 py-2 font-display text-xs tracking-wider uppercase transition-all duration-300 rounded-lg text-[#5A4030] hover:text-[#9A6A45] hover:bg-[#EFE2CC]/50 cursor-pointer font-semibold group"
                >
                  {label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-[#D6A85F] transition-all duration-300 rounded-full w-0 group-hover:w-3/5" />
                </button>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2.5">
              {/* Table reservation link button */}
              <button
                onClick={handleReserveClick}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D6A85F]/60 text-xs font-display uppercase tracking-wider text-[#5A4030] hover:bg-[#D6A85F]/15 transition-colors cursor-pointer font-semibold"
              >
                <Compass size={13} className="text-[#9A6A45]" />
                <span>Reserve</span>
              </button>

              {/* User Account / Auth Actions */}
              {isLoggedIn ? (
                <div className="hidden sm:flex items-center gap-2 bg-[#FAF6EE] border border-[#EFE2CC] rounded-full px-3 py-1 text-xs">
                  <span className="font-display font-semibold text-[#3D281D] truncate max-w-[100px]">
                    {user?.name || 'User'}
                  </span>
                  <button
                    onClick={logout}
                    title="Log Out"
                    className="text-[#9A6A45] hover:text-red-600 transition-colors cursor-pointer p-0.5"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-xs font-display uppercase tracking-wider text-[#5A4030] hover:bg-[#EFE2CC] transition-colors cursor-pointer font-semibold"
                >
                  <LogIn size={13} className="text-[#9A6A45]" />
                  <span>Log In</span>
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={handleCartClick}
                className="relative p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EFE2CC] text-[#3D281D] hover:text-[#9A6A45] hover:border-[#D6A85F] hover:shadow-warm-sm transition-all duration-300 cursor-pointer shadow-sm"
                aria-label="Open Cart"
              >
                <ShoppingCart size={19} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#D6A85F] to-[#E6BD7B] text-[#24160E] text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                className="lg:hidden p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EFE2CC] text-[#3D281D] hover:text-[#9A6A45] transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <div className="lg:hidden bg-[#FDFBF7] border-b border-[#EFE2CC] px-4 py-5 space-y-2 shadow-lg max-h-[calc(100vh-4.5rem)] overflow-y-auto">

            {navLinks.map(({ to, label }) => (
              <button
                key={label}
                onClick={() => handleNavClick(to)}
                className="w-full text-left px-4 py-3 rounded-xl font-display text-sm uppercase tracking-wider text-[#3D281D] hover:bg-[#EFE2CC] hover:text-[#9A6A45] transition-all cursor-pointer font-semibold"
              >
                {label}
              </button>
            ))}

            <div className="pt-3 border-t border-[#EFE2CC] space-y-2">
              <button
                onClick={handleReserveClick}
                className="w-full py-3 rounded-xl btn-primary text-xs uppercase tracking-widest text-center block"
              >
                Reserve a Table
              </button>

              {isLoggedIn ? (
                <div className="flex items-center justify-between px-4 py-3 bg-[#FAF6EE] rounded-xl text-xs font-display">
                  <span className="text-[#3D281D] font-bold">Logged in as {user?.name}</span>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="text-red-600 font-semibold flex items-center gap-1"
                  >
                    <LogOut size={13} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setMenuOpen(false); navigate('/login'); }}
                  className="w-full py-3 rounded-xl bg-[#FAF6EE] border border-[#EFE2CC] text-[#3D281D] font-display text-xs uppercase tracking-wider text-center block font-semibold"
                >
                  Log In / Create Account
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
