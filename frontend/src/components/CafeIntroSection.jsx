import { motion } from 'framer-motion';
import { Coffee, Utensils, Heart, Sparkles, BookOpen, Clock, Compass, ChevronRight, Cake, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { audioFX } from '../utils/audioFX';

export default function CafeIntroSection({ onOpenReservation }) {
  const navigate = useNavigate();

  const storyPillars = [
    {
      icon: Utensils,
      title: 'Freshly Prepared Meals',
      desc: 'Comfort food cooked with heart, from golden morning breakfasts to hearty dinner platters.',
    },
    {
      icon: Coffee,
      title: 'Artisan Micro-Roasts',
      desc: 'Ethically sourced single-origin beans roasted to enhance nuanced caramel and floral notes.',
    },
    {
      icon: Cake,
      title: 'Handcrafted Pastries',
      desc: 'Devil Fruit-inspired berry cheesecakes and French mille-feuille baked daily at dawn.',
    },
    {
      icon: Heart,
      title: 'Warmth & Friendship',
      desc: 'A relaxed coastal haven where friends and families gather to talk, laugh, and savor great food.',
    },
  ];

  const handleScrollToMenu = () => {
    audioFX?.playAdventureClick?.();
    const elem = document.getElementById('signature-menu');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/menu');
    }
  };

  return (
    <section
      id="cafe-intro"
      className="relative py-24 lg:py-32 bg-[#FAF6EE] text-[#3D281D] overflow-hidden border-t border-[#EFE2CC] select-none"
    >
      {/* Background Soft Lighting Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#EFE2CC]/70 blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-[#D6A85F]/10 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#9A6A45_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.22em] uppercase mb-4 shadow-sm"
          >
            <Compass size={13} className="text-[#D6A85F]" />
            <span>OUR STORY & PHILOSOPHY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-pirate text-2xl sm:text-5xl lg:text-6xl text-[#3D281D] tracking-wide leading-tight mb-4 break-words max-w-full"
          >
            BORN BETWEEN THE SEA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A45] via-[#D6A85F] to-[#7A4F30]">
              AND THE COMFORT OF HOME
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-accent italic text-lg sm:text-2xl text-[#7A4F30] font-medium"
          >
            “Born somewhere between the sea and the city, Grand Line Café brings the spirit of adventure to the comfort of your favorite table.”
          </motion.p>
        </div>

        {/* Main Showcase Grid: Interior, Dining Table, Story */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          
          {/* Left: Warm Dining Interior Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group"
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-[#D6A85F]/20 via-[#EFE2CC] to-[#7897A5]/15 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
            
            <div className="relative rounded-3xl overflow-hidden border border-[#EFE2CC] bg-[#FFFFFF] shadow-warm-lg">
              <img
                src="/images/cafe_interior.jpg"
                alt="Grand Line Café warm dining tables and cozy corners"
                className="w-full h-[380px] sm:h-[460px] lg:h-[490px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 brightness-[0.98] contrast-[1.02]"
              />

              {/* Gentle bottom scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#24160E]/75 via-transparent to-transparent opacity-80" />

              {/* Floating caption card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-[#FFFFFF]/95 backdrop-blur-md border border-[#EFE2CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] border border-[#D6A85F]/30 flex items-center justify-center text-[#9A6A45]">
                    <Sun size={20} />
                  </div>
                  <div>
                    <p className="font-display text-xs tracking-wider uppercase text-[#3D281D] font-bold">
                      The Harbor Salon & Dining Room
                    </p>
                    <p className="font-body text-xs text-[#7A4F30]">
                      Warm cedar tables, natural daylight, and coastal ease
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-display text-[#88B8A1] bg-[#88B8A1]/15 px-3 py-1 rounded-full font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#88B8A1] animate-pulse" />
                  All Day Service
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: The Emotional Story Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="space-y-6">
              <div className="border-l-3 border-[#D6A85F] pl-4">
                <p className="font-display text-xs tracking-[0.2em] text-[#9A6A45] uppercase font-bold">
                  A PORT FOR EVERY TRAVELER
                </p>
                <h3 className="font-pirate text-2xl sm:text-3xl text-[#3D281D] mt-1">
                  GOOD FOOD. WARM STORIES. GREAT ADVENTURES.
                </h3>
              </div>

              <p className="font-body text-[#5A4030] text-sm sm:text-base leading-relaxed">
                Grand Line Café was imagined as the sanctuary every traveler dreams of finding along their journey—a sunlit harbor where you can rest after navigating life's adventures, share generous meals, and celebrate friendship.
              </p>

              <p className="font-body text-[#7A4F30] text-xs sm:text-sm leading-relaxed">
                Whether you visit for an artisan pour-over coffee, a signature sourdough pizza, or a comforting plate of butter chicken with warm garlic naan, everything we prepare is rooted in generous hospitality and culinary care.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <button
                  onClick={handleScrollToMenu}
                  className="px-6 py-3.5 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Explore Our Menu</span>
                  <ChevronRight size={15} />
                </button>

                <button
                  onClick={() => {
                    audioFX?.playAdventureClick?.();
                    onOpenReservation?.();
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-[#FFFFFF] border border-[#D6A85F]/50 text-[#3D281D] font-display text-xs uppercase tracking-widest font-semibold hover:border-[#D6A85F] hover:bg-[#FAF6EE] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Book a Table</span>
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Story Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {storyPillars.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFE2CC] hover:border-[#D6A85F]/70 transition-all duration-300 group hover:shadow-warm hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] border border-[#D6A85F]/25 flex items-center justify-center text-[#9A6A45] mb-4 group-hover:scale-110 group-hover:bg-[#EFE2CC] transition-all">
                <Icon size={22} />
              </div>
              <h4 className="font-pirate text-lg text-[#3D281D] mb-2 group-hover:text-[#9A6A45] transition-colors">
                {title}
              </h4>
              <p className="font-body text-xs text-[#7A4F30] leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
