import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Volume2, VolumeX } from 'lucide-react';
import { audioFX } from '../utils/audioFX';

export default function ZoroIntroOverlay({ onComplete }) {
  const [stage, setStage] = useState('blackout'); // blackout -> line -> slash -> reveal -> finished
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // 1. Thin green line appears at 400ms
    const t1 = setTimeout(() => {
      setStage('line');
    }, 400);

    // 2. Fast diagonal sword slash at 800ms
    const t2 = setTimeout(() => {
      audioFX.playSwordSlash();
      setStage('slash');
    }, 800);

    // 3. Silhouette and titles reveal at 1400ms
    const t3 = setTimeout(() => {
      setStage('reveal');
    }, 1400);

    // 4. Complete transition into hero at 2700ms
    const t4 = setTimeout(() => {
      setStage('finished');
      if (onComplete) onComplete();
    }, 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('finished');
    if (onComplete) onComplete();
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const isM = audioFX.toggleMute();
    setMuted(isM);
  };

  if (stage === 'finished') return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none bg-[#000000]">
      {/* Top right buttons */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="p-2.5 rounded-full bg-[#06100C]/80 border border-[#00FF88]/30 text-[#00FF88] hover:text-white hover:border-[#00FF88] transition-colors"
          title={muted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
        <button
          onClick={handleSkip}
          className="px-4 py-2 rounded-full bg-[#06100C]/80 border border-[#00FF88]/40 text-[11px] font-display text-[#00FF88] hover:bg-[#00FF88]/20 transition-all uppercase tracking-widest"
        >
          SKIP INTRO
        </button>
      </div>

      {/* Floating Emerald Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.6, 0], y: -80 }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
            className="absolute w-1 h-1 rounded-full bg-[#00FF88] shadow-[0_0_6px_#00FF88]"
            style={{
              left: `${15 + (i * 5)}%`,
              top: `${40 + (i % 5) * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Top diagonal half */}
      <motion.div
        initial={{ y: 0, x: 0 }}
        animate={stage === 'reveal' ? { y: '-120%', x: '-50%', opacity: 0 } : { y: 0, x: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#000000] z-20"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 100%)',
        }}
      />

      {/* Bottom diagonal half */}
      <motion.div
        initial={{ y: 0, x: 0 }}
        animate={stage === 'reveal' ? { y: '120%', x: '50%', opacity: 0 } : { y: 0, x: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#000000] z-20"
        style={{
          clipPath: 'polygon(0 100%, 100% 40%, 100% 100%)',
        }}
      />

      {/* Stage 1: Thin emerald line */}
      <AnimatePresence>
        {stage === 'line' && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0, rotate: -35 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[120vw] h-[2px] bg-[#00FF88] shadow-[0_0_20px_#00FF88,0_0_40px_#39FF14]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Explosive Santoryu sword slash */}
      <AnimatePresence>
        {stage === 'slash' && (
          <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden flex items-center justify-center">
            {/* Primary Neon Slash Beam */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0, rotate: -35 }}
              animate={{ scaleX: [0, 1.4, 2], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-[240vw] h-4 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent shadow-[0_0_50px_#00FF88,0_0_100px_#39FF14]"
            />
            {/* Core White-Hot Filament */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0, rotate: -35 }}
              animate={{ scaleX: [0, 1.2, 1.8], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-[200vw] h-1.5 bg-white shadow-[0_0_25px_#FFFFFF]"
            />
            {/* Green Particle Shockwave */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1.6, 2.4] }}
              transition={{ duration: 0.7 }}
              className="absolute w-96 h-96 rounded-full bg-[#00FF88]/30 blur-3xl pointer-events-none"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Stage 3: Silhouette & Title Awakening */}
      <AnimatePresence>
        {(stage === 'slash' || stage === 'reveal') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-16 h-16 rounded-2xl bg-[#06100C] border border-[#00FF88] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,255,136,0.5)]"
            >
              <Swords className="text-[#00FF88]" size={30} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display tracking-[0.35em] text-xs text-[#00FF88] uppercase mb-2 font-bold"
            >
              RORONOA ZORO
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-pirate text-3xl sm:text-5xl text-white tracking-wider"
            >
              THE <span className="text-[#00FF88]">SWORDSMAN</span> AWAKENS
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
