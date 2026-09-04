import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryPhotos } from '../data/cafeData';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { audioFX } from '../utils/audioFX';

const categories = ['All', 'Ambiance', 'Coffee & Drinks', 'Feast & Mains', 'Pastries & Desserts'];

export default function CafeGallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLightboxIdx, setActiveLightboxIdx] = useState(null);

  const filteredPhotos = activeCategory === 'All'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === activeCategory);

  const handleOpenLightbox = (index) => {
    audioFX?.playAdventureClick?.();
    setActiveLightboxIdx(index);
  };

  const handleNext = () => {
    if (activeLightboxIdx === null) return;
    setActiveLightboxIdx((activeLightboxIdx + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (activeLightboxIdx === null) return;
    setActiveLightboxIdx((activeLightboxIdx - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section
      id="gallery-section"
      className="relative py-24 lg:py-32 bg-[#FAF6EE] text-[#3D281D] overflow-hidden border-t border-[#EFE2CC] select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#EFE2CC]/80 blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-[#D6A85F]/10 blur-[150px]" />
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
            <Camera size={13} className="text-[#D6A85F]" />
            <span>VISUAL MEMORIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-pirate text-3xl sm:text-5xl lg:text-6xl text-[#3D281D] tracking-wide mb-4"
          >
            EDITORIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A45] via-[#D6A85F] to-[#7A4F30]">GALLERY</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-accent italic text-base sm:text-xl text-[#7A4F30] max-w-xl mx-auto"
          >
            A glimpse into our sunlit dining spaces, handcrafted dishes, artisan coffee, and cozy seaside moments.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  audioFX?.playAdventureClick?.();
                  setActiveCategory(cat);
                }}
                className={`px-5 py-2.5 rounded-2xl font-display text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'btn-primary font-bold shadow-sm scale-105'
                    : 'bg-[#FFFFFF] text-[#5A4030] border border-[#EFE2CC] hover:border-[#D6A85F] hover:bg-[#FAF6EE] shadow-sm'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid (Editorial Mixed Dimensions) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => handleOpenLightbox(index)}
              className="group relative rounded-3xl overflow-hidden bg-[#FAF6EE] border border-[#EFE2CC] hover:border-[#D6A85F] transition-all duration-500 shadow-warm hover:shadow-warm-hover cursor-pointer h-72"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-[0.98] group-hover:brightness-105"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-85 transition-opacity" />

              {/* Hover Inspect Icon */}
              <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#EFE2CC] flex items-center justify-center text-[#9A6A45] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 shadow-sm">
                <Eye size={15} />
              </div>

              {/* Bottom Caption Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-display uppercase tracking-widest text-[#E6BD7B] font-bold block mb-1">
                  {photo.category}
                </span>
                <h4 className="font-pirate text-sm sm:text-base text-white line-clamp-1 group-hover:text-[#E6BD7B] transition-colors">
                  {photo.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <button
              onClick={() => setActiveLightboxIdx(null)}
              className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-[#FFFFFF]/90 border border-[#EFE2CC] text-[#3D281D] flex items-center justify-center hover:text-[#9A6A45] transition-colors cursor-pointer shadow-lg"
            >
              <X size={20} />
            </button>

            {/* Prev/Next Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#FFFFFF]/90 border border-[#EFE2CC] text-[#3D281D] flex items-center justify-center hover:bg-[#D6A85F] hover:text-[#24160E] transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#FFFFFF]/90 border border-[#EFE2CC] text-[#3D281D] flex items-center justify-center hover:bg-[#D6A85F] hover:text-[#24160E] transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight size={22} />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              key={activeLightboxIdx}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#EFE2CC] shadow-2xl"
            >
              <div className="relative h-[250px] sm:h-[420px] lg:h-[500px] bg-[#FAF6EE]">
                <img
                  src={filteredPhotos[activeLightboxIdx]?.image}
                  alt={filteredPhotos[activeLightboxIdx]?.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-[#FFFFFF] border-t border-[#EFE2CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-display text-[#9A6A45] uppercase tracking-widest block mb-1 font-bold">
                    {filteredPhotos[activeLightboxIdx]?.category}
                  </span>
                  <h3 className="font-pirate text-xl text-[#3D281D]">
                    {filteredPhotos[activeLightboxIdx]?.title}
                  </h3>
                  <p className="font-body text-xs text-[#7A4F30] mt-1">
                    {filteredPhotos[activeLightboxIdx]?.caption}
                  </p>
                </div>

                <span className="text-xs font-display text-[#9A6A45] px-3.5 py-1 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] font-semibold">
                  {activeLightboxIdx + 1} / {filteredPhotos.length}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
