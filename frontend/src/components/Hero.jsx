import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, UtensilsCrossed, Users, MapPin, ChevronDown, Sparkles, Star, Sun, Compass } from 'lucide-react';
import { audioFX } from '../utils/audioFX';

export default function Hero({ onReplayIntro }) {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleExploreMenu = () => {
    audioFX?.playAdventureClick?.();
    const elem = document.getElementById('signature-menu');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/menu');
    }
  };

  const handleMeetCrew = () => {
    audioFX?.playAdventureClick?.();
    const elem = document.getElementById('crew-favorites');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/crew');
    }
  };

  const handleVisitCafe = () => {
    audioFX?.playAdventureClick?.();
    const elem = document.getElementById('cafe-intro');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/reservations');
    }
  };

  return (
    <section
      id="cafe-hero"
      className="relative w-full overflow-hidden bg-[#F8F1E5] select-none pt-0 pb-8 lg:pb-12"
    >
      {/* ===== 1. WARM SUNLIT AMBIENT BACKGROUND ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft morning sunlit background glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#EFE2CC]/80 blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[#D6A85F]/15 blur-[160px]" />
        <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-[#7897A5]/10 blur-[150px]" />

        {/* Subtle decorative nautical map grid pattern */}
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#9A6A45_1px,transparent_1px)] [background-size:32px_32px]" />

        {/* Soft rising steam particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`steam-${i}`}
            initial={{
              x: `${35 + i * 10}%`,
              y: '90%',
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              y: '20%',
              opacity: [0, 0.2, 0],
              scale: [0.6, 1.4, 2.0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.6,
              ease: 'easeInOut',
            }}
            className="absolute w-24 h-24 rounded-full bg-[#EFE2CC]/60 blur-2xl pointer-events-none"
          />
        ))}
      </div>

      {/* ===== 2. HERO CONTENT CONTAINER ===== */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-4 lg:pb-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ===== LEFT COLUMN: HERO HEADLINE & ACTIONS ===== */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">

            {/* Subtle Nautical & Cafe Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#FFFFFF]/90 border border-[#EFE2CC] text-[#9A6A45] mb-3 max-w-full shadow-sm text-left"
            >
              <Coffee size={13} className="text-[#D6A85F] flex-shrink-0" />
              <span className="hero-badge text-[9px] sm:text-[11px] font-display font-bold tracking-[0.02em] sm:tracking-[0.04em] uppercase text-[#5A4030] leading-tight break-words max-w-full">
                COZY CAFÉ & FULL-SERVICE RESTAURANT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F] flex-shrink-0" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-pirate text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-4 text-[#3D281D] break-words max-w-full"
            >
              <span className="text-[#7A4F30] block text-lg sm:text-3xl lg:text-4xl font-normal mb-1">
                WELCOME TO
              </span>
              <span className="hero-brand text-transparent bg-clip-text bg-gradient-to-r from-[#3D281D] via-[#9A6A45] to-[#D6A85F] block tracking-[-0.02em] text-2xl sm:text-5xl lg:text-7xl break-words">
                GRAND LINE CAFÉ
              </span>
            </motion.h1>

            {/* Supporting Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-accent text-lg sm:text-2xl lg:text-3xl text-[#5A4030] italic font-medium mb-4 leading-snug break-words max-w-full"
            >
              “Where every cup, plate & story begins an adventure.”
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="font-body text-xs sm:text-base text-[#5A4030]/85 max-w-xl mb-8 leading-relaxed break-words max-w-full"
            >
              A cozy Grand Line-inspired café & restaurant serving handcrafted drinks, comforting meals, delicious desserts, and unforgettable moments with friends.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-10 w-full sm:w-auto max-w-full"
            >
              {/* Button 1: Explore Menu */}
              <button
                onClick={handleExploreMenu}
                className="w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl btn-primary text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md group"
              >
                <UtensilsCrossed size={16} className="group-hover:rotate-12 transition-transform flex-shrink-0" />
                <span>EXPLORE MENU</span>
              </button>

              {/* Button 2: Meet the Crew */}
              <button
                onClick={handleMeetCrew}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[#FFFFFF] border border-[#D6A85F]/50 text-[#3D281D] font-display text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:border-[#D6A85F] hover:bg-[#FAF6EE] transition-all cursor-pointer shadow-sm group"
              >
                <Users size={16} className="text-[#9A6A45] group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>MEET THE CREW</span>
              </button>

              {/* Button 3: Play Intro Animation */}
              {onReplayIntro && (
                <button
                  onClick={() => {
                    audioFX?.playAdventureClick?.();
                    onReplayIntro();
                  }}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[#FFFFFF] border-2 border-[#D6A85F] text-[#9A6A45] font-display text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:bg-[#FAF6EE] transition-all cursor-pointer shadow-md group"
                >
                  <Sparkles size={16} className="text-[#D6A85F] group-hover:rotate-45 transition-transform flex-shrink-0" />
                  <span className="truncate">PLAY INTRO ANIMATION ⚔️👒</span>
                </button>
              )}
            </motion.div>

            {/* Feature Highlights Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[#EFE2CC] max-w-lg"
            >
              <div className="bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-[#EFE2CC]/60 sm:border-0">
                <div className="font-pirate text-sm sm:text-base lg:text-lg text-[#9A6A45]">FULL RESTAURANT</div>
                <div className="font-body text-[10px] sm:text-[11px] text-[#7A4F30] tracking-wider uppercase">Breakfast to Dinner</div>
              </div>
              <div className="bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-[#EFE2CC]/60 sm:border-0">
                <div className="font-pirate text-sm sm:text-base lg:text-lg text-[#9A6A45]">ARTISAN COFFEE</div>
                <div className="font-body text-[10px] sm:text-[11px] text-[#7A4F30] tracking-wider uppercase">Single Origin Roasts</div>
              </div>
              <div className="bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-[#EFE2CC]/60 sm:border-0">
                <div className="font-pirate text-sm sm:text-base lg:text-lg text-[#9A6A45]">COZY VIBES</div>
                <div className="font-body text-[10px] sm:text-[11px] text-[#7A4F30] tracking-wider uppercase">Grand Line Warmth</div>
              </div>
            </motion.div>

          </div>

          {/* ===== RIGHT COLUMN: WARM CAFÉ & FOOD COMPOSITION CARD ===== */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none">

              {/* Soft warm ambient shadow behind showcase card */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#D6A85F]/20 via-[#EFE2CC]/50 to-[#7897A5]/15 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

              {/* Main Visual Showcase Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl overflow-hidden border border-[#EFE2CC] bg-[#FFFFFF] shadow-warm-lg flex flex-col justify-between"
              >
                {/* Main Image: Warm sunlit cafe interior & food */}
                <div className="relative h-[340px] sm:h-[400px] w-full overflow-hidden bg-[#FAF6EE]">
                  <motion.div
                    animate={{
                      x: mousePos.x * -0.2,
                      y: mousePos.y * -0.2,
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 60 }}
                    className="w-full h-full"
                  >
                    <img
                      src="/images/grand_line_hero.jpg"
                      alt="Luffy and Zoro enjoying a feast at Grand Line Café — burgers, pizza, pasta and coffee"
                      className="w-full h-full object-cover object-center brightness-[1.0] contrast-[1.02] scale-105"
                    />
                  </motion.div>

                  {/* Gentle gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24160E]/80 via-transparent to-black/10" />

                  {/* Top Badge: Open for Dine-in */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#EFE2CC] text-[11px] font-display uppercase tracking-wider text-[#5A4030] font-semibold shadow-sm">
                    <Sun size={13} className="text-[#D6A85F]" />
                    <span>Dine-in • Takeout • Coffee Bar</span>
                  </div>

                  {/* Floating One Piece Nautical Motif Pill */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#EFE2CC] text-[10px] font-display uppercase tracking-wider text-[#9A6A45] font-bold shadow-sm">
                    <Compass size={12} className="text-[#7897A5]" />
                    <span>Grand Line Harbor</span>
                  </div>
                </div>

                {/* Bottom Featured Food & Story Pairing Strip */}
                <div className="p-5 sm:p-6 bg-[#FFFFFF] border-t border-[#EFE2CC]">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#EFE2CC] bg-[#FAF6EE] flex-shrink-0">
                        <img
                          src="/images/grand_line_hero.jpg"
                          alt="Grand Line Cafe Feast"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <span className="font-display text-[10px] uppercase tracking-widest text-[#9A6A45] font-bold">
                          Chef & Barista Pairing
                        </span>
                        <h4 className="font-pirate text-base text-[#3D281D]">
                          Sanji's Pasta × Zoro's Espresso
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-body text-[#88B8A1] font-semibold bg-[#88B8A1]/10 px-2.5 py-1 rounded-full">
                        <Star size={11} className="fill-current" />
                        4.9 Rated
                      </span>
                    </div>
                  </div>

                  <p className="font-body text-xs text-[#7A4F30] leading-relaxed line-clamp-2">
                    Handmade seafood linguine paired with micro-roasted single-origin espresso. Served fresh all day in our quiet harbor salon.
                  </p>
                </div>

              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* ===== 3. BOTTOM SCROLL INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="font-display text-[10px] text-[#9A6A45] tracking-[0.25em] uppercase font-semibold">
          DISCOVER OUR TASTES
        </span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown size={15} className="text-[#D6A85F]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
