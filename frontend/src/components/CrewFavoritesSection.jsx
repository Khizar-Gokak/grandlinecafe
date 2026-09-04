import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { crewFavorites } from '../data/cafeData';
import { Utensils, Star, Plus, Coffee, Heart, Compass, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { audioFX } from '../utils/audioFX';

export default function CrewFavoritesSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeCrew = crewFavorites[selectedIdx];
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleOrder = (crew) => {
    audioFX?.playAdventureClick?.();
    const priceNum = parseInt(crew.priceINR?.replace(/[^0-9]/g, '')) || 450;

    addItem({
      id: `crew-${crew.character.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${crew.character}'s Choice (${crew.itemTitle.split('&')[0].trim()})`,
      price: priceNum,
      image: crew.image,
      category: 'Crew Favorite',
      japaneseName: crew.japaneseName,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);

    toast.success(`Added ${crew.character}'s favorite to order!`, {
      icon: '☕',
      style: {
        background: '#FFFFFF',
        border: '1px solid rgba(214, 168, 95, 0.5)',
        color: '#3D281D',
        boxShadow: '0 8px 24px rgba(61, 40, 29, 0.12)',
      },
    });
  };

  return (
    <section
      id="crew-favorites"
      className="relative py-24 lg:py-32 bg-[#FAF6EE] text-[#3D281D] overflow-hidden border-t border-[#EFE2CC] select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#EFE2CC]/80 blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#D6A85F]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.22em] uppercase mb-4 shadow-sm"
          >
            <Heart size={13} className="text-[#D6A85F]" />
            <span>CAFÉ PERSONALITIES & FAVORITE DISHES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-pirate text-2xl sm:text-5xl lg:text-6xl text-[#3D281D] tracking-wide mb-4 break-words max-w-full"
          >
            THE CREW’S <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A45] via-[#D6A85F] to-[#7A4F30]">FAVORITE TABLES</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-accent italic text-base sm:text-xl text-[#7A4F30] max-w-xl mx-auto"
          >
            Discover what our favorite voyagers order when they pull up a chair, relax, and savor comforting meals.
          </motion.p>
        </div>

        {/* Character Tab Selector */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 sm:pb-0 gap-3 mb-12 scrollbar-hide">
          {crewFavorites.map((crew, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={crew.character}
                onClick={() => {
                  audioFX?.playAdventureClick?.();
                  setSelectedIdx(idx);
                }}
                className={`flex-shrink-0 px-4 sm:px-5 py-3 rounded-2xl transition-all duration-300 flex items-center gap-3 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#D6A85F] shadow-warm scale-105'
                    : 'bg-[#FAF6EE] border-[#EFE2CC] text-[#7A4F30] hover:border-[#D6A85F]/50 hover:bg-[#FFFFFF]'
                }`}
              >
                {/* Character Avatar */}
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#EFE2CC] bg-[#EFE2CC] flex-shrink-0">
                  <img
                    src={crew.figureImg}
                    alt={crew.character}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className={`font-pirate text-xs sm:text-sm leading-tight ${isSelected ? 'text-[#9A6A45] font-bold' : 'text-[#3D281D]'}`}>
                    {crew.character}
                  </p>
                  <p className="font-body text-[10px] text-[#7A4F30] uppercase tracking-wider">
                    {crew.role.split('/')[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Character & Dish Showcase Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCrew.character}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[#FFFFFF] border border-[#EFE2CC] overflow-hidden shadow-warm-lg"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-10 items-center">
              
              {/* Left Column: Dish Photography */}
              <div className="lg:col-span-5 relative group">
                <div className="relative rounded-2xl overflow-hidden border border-[#EFE2CC] bg-[#FAF6EE] shadow-sm">
                  <img
                    src={activeCrew.image}
                    alt={activeCrew.itemTitle}
                    className="w-full h-[320px] sm:h-[380px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-[#FFFFFF]/95 backdrop-blur-md border border-[#EFE2CC] text-right shadow-sm">
                    <p className="font-pirate text-base text-[#3D281D] font-bold leading-none">
                      {activeCrew.priceINR}
                    </p>
                    <p className="font-body text-[10px] text-[#9A6A45] leading-none mt-1">
                      {activeCrew.priceUSD} USD
                    </p>
                  </div>

                  {/* Japanese Title */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#FFFFFF]/95 backdrop-blur-md border border-[#EFE2CC] text-xs font-display text-[#9A6A45] tracking-widest uppercase font-semibold shadow-sm">
                    {activeCrew.japaneseName}
                  </div>
                </div>
              </div>

              {/* Center/Right Column: Character Lore & Tasting Card */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                
                {/* Header info */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-wider bg-[#D6A85F]/15 text-[#7A4F30] border border-[#D6A85F]/30">
                      FAVORITE: {activeCrew.favoriteFood}
                    </span>

                    <span className="text-xs font-display text-[#9A6A45] uppercase tracking-wider font-semibold">
                      {activeCrew.role}
                    </span>
                  </div>

                  <h3 className="font-pirate text-3xl sm:text-4xl text-[#3D281D] mb-1">
                    {activeCrew.itemTitle}
                  </h3>
                  <p className="font-display text-xs tracking-[0.18em] text-[#9A6A45] uppercase font-bold mb-4">
                    LOVED BY {activeCrew.character.toUpperCase()}
                  </p>

                  {/* Character Quote */}
                  <div className="p-4 rounded-2xl bg-[#FAF6EE] border-l-3 border-[#D6A85F] text-xs sm:text-sm font-accent italic text-[#5A4030] leading-relaxed mb-5">
                    {activeCrew.quote}
                  </div>

                  {/* Story Lore */}
                  <p className="font-body text-xs sm:text-sm text-[#7A4F30] leading-relaxed mb-6">
                    {activeCrew.lore}
                  </p>
                </div>

                {/* Flavor & Dish Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EFE2CC]">
                  
                  {/* Flavor Notes */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#EFE2CC]">
                    <p className="font-display text-[10px] text-[#9A6A45] uppercase tracking-wider font-bold mb-1">
                      Flavor Profile
                    </p>
                    <p className="font-body text-xs text-[#5A4030]">
                      {activeCrew.flavorProfile}
                    </p>
                  </div>

                  {/* Serving notes */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#EFE2CC] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#EFE2CC] bg-white flex items-center justify-center text-[#9A6A45] flex-shrink-0">
                      <Coffee size={20} />
                    </div>
                    <div>
                      <p className="font-display text-[10px] text-[#9A6A45] uppercase tracking-wider font-bold">
                        Kitchen Craft
                      </p>
                      <p className="font-body text-xs text-[#5A4030]">
                        Freshly prepared upon every order
                      </p>
                    </div>
                  </div>

                </div>

                {/* Order Button */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    onClick={() => handleOrder(activeCrew)}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {added ? <Check size={15} /> : <Plus size={15} />}
                    <span>{added ? 'Added to Order!' : `Order ${activeCrew.character}'s Specialty`}</span>
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
