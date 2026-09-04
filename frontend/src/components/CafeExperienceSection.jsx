import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cafeExperiences } from '../data/cafeData';
import { Sparkles, Compass, Clock, Heart, Calendar } from 'lucide-react';
import { audioFX } from '../utils/audioFX';

export default function CafeExperienceSection({ onOpenReservation }) {
  const [activeExp, setActiveExp] = useState(cafeExperiences[0]);

  const experienceImages = {
    'exp-1': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
    'exp-2': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80',
    'exp-3': '/images/cafe_interior.jpg',
    'exp-4': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80',
    'exp-5': 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=900&q=80',
  };

  return (
    <section
      id="cafe-experience"
      className="relative py-24 lg:py-32 bg-[#F8F1E5] text-[#3D281D] overflow-hidden border-t border-[#EFE2CC] select-none"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#EFE2CC]/80 blur-[180px]" />
        <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-[#D6A85F]/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.22em] uppercase mb-4 shadow-sm"
          >
            <Sparkles size={13} className="text-[#D6A85F]" />
            <span>VISITING GRAND LINE CAFÉ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-pirate text-3xl sm:text-5xl lg:text-6xl text-[#3D281D] tracking-wide mb-4"
          >
            THE CAFÉ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A45] via-[#D6A85F] to-[#7A4F30]">EXPERIENCE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-accent italic text-base sm:text-xl text-[#7A4F30] max-w-xl mx-auto"
          >
            “Good Food. Good Coffee. Great Adventures.” — Discover what makes a visit to our café unforgettable.
          </motion.p>
        </div>

        {/* Experience Interactive Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive Experience Cards */}
          <div className="lg:col-span-6 space-y-3.5">
            {cafeExperiences.map((exp) => {
              const isSelected = activeExp.id === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => {
                    audioFX?.playAdventureClick?.();
                    setActiveExp(exp);
                  }}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-[#D6A85F] shadow-warm scale-[1.01]'
                      : 'bg-[#FAF6EE] border-[#EFE2CC] hover:border-[#D6A85F]/50 hover:bg-[#FFFFFF]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-all ${
                      isSelected ? 'bg-gradient-to-tr from-[#D6A85F] to-[#E6BD7B] text-[#24160E] shadow-sm' : 'bg-[#EFE2CC] text-[#9A6A45]'
                    }`}>
                      {exp.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className={`font-pirate text-lg sm:text-xl ${isSelected ? 'text-[#3D281D]' : 'text-[#5A4030]'}`}>
                          {exp.title}
                        </h4>
                        <span className="text-[10px] font-display uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-[#9A6A45] font-semibold">
                          {exp.highlight}
                        </span>
                      </div>

                      <p className="font-display text-[11px] text-[#9A6A45] uppercase tracking-wider font-semibold mb-1.5">
                        {exp.subtitle}
                      </p>

                      <p className="font-body text-xs text-[#7A4F30] leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Experience Showcase Card */}
          <div className="lg:col-span-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden border border-[#EFE2CC] bg-[#FFFFFF] shadow-warm-lg"
              >
                {/* Image */}
                <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden bg-[#FAF6EE]">
                  <img
                    src={experienceImages[activeExp.id] || '/images/cafe_interior.jpg'}
                    alt={activeExp.title}
                    className="w-full h-full object-cover object-center brightness-[0.98] contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Atmosphere Tag */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/95 backdrop-blur-md border border-[#EFE2CC] flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#88B8A1] animate-pulse" />
                    <span className="font-display text-xs text-[#5A4030] uppercase tracking-wider font-bold">
                      {activeExp.highlight}
                    </span>
                  </div>
                </div>

                {/* Bottom Card Copy */}
                <div className="p-6 sm:p-8 bg-[#FFFFFF] border-t border-[#EFE2CC]">
                  <div className="flex items-center gap-2 text-2xl mb-1">
                    <span>{activeExp.icon}</span>
                    <h3 className="font-pirate text-2xl text-[#3D281D]">
                      {activeExp.title}
                    </h3>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#7A4F30] leading-relaxed mb-6">
                    {activeExp.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#EFE2CC]">
                    <div className="flex items-center gap-2 text-xs font-display text-[#9A6A45] font-semibold">
                      <Compass size={14} />
                      <span>Open Daily for Walk-ins & Reservations</span>
                    </div>

                    <button
                      onClick={() => {
                        audioFX?.playAdventureClick?.();
                        onOpenReservation?.();
                      }}
                      className="px-5 py-2.5 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold shadow-sm cursor-pointer"
                    >
                      Reserve a Table
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
