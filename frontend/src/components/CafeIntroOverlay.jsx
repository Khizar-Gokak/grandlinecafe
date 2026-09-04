import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CafeIntroOverlay({ onComplete }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Keep intro visible for 2.5 seconds (2-3 seconds total animation) unless user clicks "Enter Café"
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, 2500);

    const finishTimer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  const handleEnterNow = () => {
    setFadingOut(true);
    setTimeout(() => {
      onComplete?.();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadingOut ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F8F1E5] text-[#3D281D] select-none overflow-hidden ${
        fadingOut ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* Warm Ambient Radial Light Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#EFE2CC] via-[#D6A85F]/30 to-transparent blur-[100px] animate-pulse" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#9A6A45_1.5px,transparent_1.5px)] [background-size:28px_28px]" />
      </div>

      {/* Main Animation Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-md">

        {/* 1. LUFFY'S STRAW HAT (Positioned above the swords) */}
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.1 }}
          className="relative mb-3 z-20"
        >
          <svg viewBox="0 0 100 60" width="120" height="72" className="drop-shadow-md">
            {/* Straw Hat Brim Shadow */}
            <ellipse cx="50" cy="48" rx="48" ry="10" fill="rgba(61,40,29,0.2)" />
            {/* Straw Hat Brim */}
            <ellipse cx="50" cy="44" rx="48" ry="10" fill="#E5B842" stroke="#8A5A2B" strokeWidth="1.5" />
            {/* Crown */}
            <path
              d="M 20 43 Q 18 24 25 14 Q 34 5 50 5 Q 66 5 75 14 Q 82 24 80 43"
              fill="#F3C853"
              stroke="#8A5A2B"
              strokeWidth="1.5"
            />
            {/* Luffy's Red Ribbon */}
            <path
              d="M 20 43 Q 50 38 80 43 Q 50 36 20 43 Z"
              fill="#D92B2B"
            />
            {/* Straw Texture Highlights */}
            <path d="M 30 20 Q 50 12 70 20" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* 2. ZORO'S SANTORYU THREE SWORDS (Revolving Wheel) */}
        <div className="relative w-60 h-60 flex items-center justify-center mb-6">

          {/* Outer Glowing Gold Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#D6A85F]"
          />
          <div className="absolute inset-4 rounded-full border border-[#9A6A45]/40" />

          {/* Revolving 3 Katana Swords */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Sword 1 (0 deg - Wado Ichimonji) */}
            <div className="absolute w-52 h-5 transform origin-center rotate-0">
              <svg viewBox="0 0 200 16" className="w-full h-full overflow-visible drop-shadow-md">
                <path d="M 30 8 L 195 6 L 200 8 L 195 10 L 30 8 Z" fill="#E8E2D5" stroke="#3D281D" strokeWidth="1" />
                <ellipse cx="28" cy="8" rx="6" ry="8" fill="#D6A85F" stroke="#3D281D" strokeWidth="1" />
                <rect x="2" y="5" width="24" height="6" rx="3" fill="#3D281D" />
                <line x1="8" y1="5" x2="8" y2="11" stroke="#D6A85F" strokeWidth="1" />
                <line x1="14" y1="5" x2="14" y2="11" stroke="#D6A85F" strokeWidth="1" />
                <line x1="20" y1="5" x2="20" y2="11" stroke="#D6A85F" strokeWidth="1" />
              </svg>
            </div>

            {/* Sword 2 (120 deg - Sandai Kitetsu) */}
            <div className="absolute w-52 h-5 transform origin-center rotate-[120deg]">
              <svg viewBox="0 0 200 16" className="w-full h-full overflow-visible drop-shadow-md">
                <path d="M 30 8 L 195 6 L 200 8 L 195 10 L 30 8 Z" fill="#D5D8E8" stroke="#3D281D" strokeWidth="1" />
                <ellipse cx="28" cy="8" rx="6" ry="8" fill="#C84B31" stroke="#3D281D" strokeWidth="1" />
                <rect x="2" y="5" width="24" height="6" rx="3" fill="#1F2421" />
                <line x1="8" y1="5" x2="8" y2="11" stroke="#C84B31" strokeWidth="1" />
                <line x1="14" y1="5" x2="14" y2="11" stroke="#C84B31" strokeWidth="1" />
                <line x1="20" y1="5" x2="20" y2="11" stroke="#C84B31" strokeWidth="1" />
              </svg>
            </div>

            {/* Sword 3 (240 deg - Shusui) */}
            <div className="absolute w-52 h-5 transform origin-center rotate-[240deg]">
              <svg viewBox="0 0 200 16" className="w-full h-full overflow-visible drop-shadow-md">
                <path d="M 30 8 L 195 6 L 200 8 L 195 10 L 30 8 Z" fill="#3A3B3C" stroke="#D6A85F" strokeWidth="1" />
                <ellipse cx="28" cy="8" rx="6" ry="8" fill="#D6A85F" stroke="#3D281D" strokeWidth="1" />
                <rect x="2" y="5" width="24" height="6" rx="3" fill="#8B0000" />
                <line x1="8" y1="5" x2="8" y2="11" stroke="#D6A85F" strokeWidth="1" />
                <line x1="14" y1="5" x2="14" y2="11" stroke="#D6A85F" strokeWidth="1" />
                <line x1="20" y1="5" x2="20" y2="11" stroke="#D6A85F" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>

          {/* Center Emblem: Luffy's Meat Bone 🍖 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 220 }}
            className="absolute w-16 h-16 rounded-full bg-[#FFFFFF] border-2 border-[#D6A85F] shadow-xl flex items-center justify-center text-3xl z-10"
          >
            🍖
          </motion.div>
        </div>

        {/* 3. BRAND TYPOGRAPHY */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#D6A85F] text-[#9A6A45] text-[11px] font-display font-bold tracking-[0.25em] uppercase shadow-sm">
            <span>⚔️ ZORO SANTORYU × LUFFY 👒</span>
          </div>

          <h1 className="font-pirate text-3xl sm:text-5xl text-[#3D281D] tracking-wider leading-none drop-shadow-sm">
            GRAND LINE CAFÉ
          </h1>

          <p className="font-accent italic text-sm sm:text-base text-[#7A4F30] font-medium">
            “Where every cup, plate & story begins an adventure.”
          </p>
        </motion.div>

        {/* Enter Cafe Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleEnterNow}
          className="mt-6 px-8 py-3.5 rounded-full btn-primary font-display text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#24160E] shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>ENTER CAFÉ ⚓</span>
        </motion.button>

      </div>
    </motion.div>
  );
}
