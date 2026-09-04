import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CafeIntroOverlay from './components/CafeIntroOverlay';
import CafeAIChatbot from './components/CafeAIChatbot';
import GrandLineReservationModal from './components/GrandLineReservationModal';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import CrewPage from './pages/CrewPage';
import AboutPage from './pages/AboutPage';
import ReservationPage from './pages/ReservationPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/admin/AdminPage';
import ConfirmedNotificationModal from './components/ConfirmedNotificationModal';

// Scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppLayout() {
  const [showIntro, setShowIntro] = useState(true);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/reservations' && location.state?.openModal) {
      setShowReservationModal(true);
    }
  }, [location.pathname, location.state]);

  return (
    <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] overflow-x-hidden selection:bg-[#D6A85F]/30 selection:text-[#24160E]">
      {/* ===== FULLSCREEN INTRO OVERLAY (ZORO 3 SWORDS + LUFFY STRAW HAT) ===== */}
      {showIntro && (
        <CafeIntroOverlay onComplete={() => setShowIntro(false)} />
      )}

      <Navbar onReplayIntro={() => setShowIntro(true)} />
      <CartDrawer />
      <ConfirmedNotificationModal />

      {/* ===== GRAND LINE CAFÉ ASSISTANT AI CHATBOT ===== */}
      <CafeAIChatbot onOpenReservation={() => setShowReservationModal(true)} />

      {/* ===== GLOBAL TABLE RESERVATION MODAL ===== */}
      <GrandLineReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
      />

      <main className="relative pt-20">
        <Routes>
          <Route path="/" element={<Home onReplayIntro={() => setShowIntro(true)} onOpenReservation={() => setShowReservationModal(true)} />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/crew" element={<CrewPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-screen section-cream flex flex-col items-center justify-center pt-28 pb-20 px-4 text-center">
              <div className="text-7xl mb-5">☕🌊</div>
              <h1 className="font-pirate text-5xl text-gold-gradient mb-3">404</h1>
              <h2 className="font-display text-2xl text-[#3D281D] mb-3">Lost in the Grand Line?</h2>
              <p className="font-body text-[#7A4F30] mb-8 max-w-md leading-relaxed">
                Even seasoned navigators take an unexpected route. Let us guide you back to our cozy harbor and fresh coffee.
              </p>
              <a href="/" className="btn-primary px-8 py-3.5 rounded-full text-sm inline-block shadow-md">
                Return to Grand Line Café
              </a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FFFFFF',
            border: '1px solid rgba(214, 168, 95, 0.4)',
            color: '#3D281D',
            fontFamily: 'Raleway, sans-serif',
            borderRadius: '16px',
            fontSize: '13px',
            boxShadow: '0 10px 30px rgba(61, 40, 29, 0.12)',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <ScrollToTop />
            <AppLayout />
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
