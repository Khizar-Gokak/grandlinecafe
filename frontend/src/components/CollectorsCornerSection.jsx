import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collectorExhibits } from '../data/cafeData';
import { Award, Sparkles, Compass, Eye, BookOpen, Anchor, MapPin } from 'lucide-react';

export default function CollectorsCornerSection() {
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  const wantedBounties = [
    { name: 'MONKEY D. LUFFY', bounty: '฿ 3,000,000,000', epithet: 'Captain • Feast Host', img: '/images/luffy.jpg' },
    { name: 'RORONOA ZORO', bounty: '฿ 1,111,000,000', epithet: 'First Mate • Roast Master', img: '/images/zoro_hero.jpg' },
    { name: 'SANJI', bounty: '฿ 1,032,000,000', epithet: 'Executive Chef', img: '/images/sanji.jpg' },
    { name: 'NICO ROBIN', bounty: '฿ 930,000,000', epithet: 'Reading Salon Host', img: '/images/nami.jpg' },
  ];

  return (
    <section
      id="collectors-corner"
      className="relative py-24 lg:py-32 bg-[#FAF6EE] text-[#3D281D] overflow-hidden border-t border-[#EFE2CC] select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-[#EFE2CC]/80 blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] rounded-full bg-[#D6A85F]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.22em] uppercase mb-4 shadow-sm"
          >
            <Compass size={13} className="text-[#D6A85F]" />
            <span>AUTHENTIC NAUTICAL ACCENTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-pirate text-3xl sm:text-5xl lg:text-6xl text-[#3D281D] tracking-wide mb-4"
          >
            COLLECTOR’S <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A45] via-[#D6A85F] to-[#7A4F30]">CORNER</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-accent italic text-base sm:text-xl text-[#7A4F30] max-w-xl mx-auto"
          >
            Admire handcrafted ship models, vintage navigational instruments, and tasteful memorabilia displayed throughout the café.
          </motion.p>
        </div>

        {/* 4 Exhibit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {collectorExhibits.map((exhibit, idx) => (
            <motion.div
              key={exhibit.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelectedExhibit(exhibit)}
              className="group rounded-3xl bg-[#FFFFFF] border border-[#EFE2CC] hover:border-[#D6A85F] overflow-hidden transition-all duration-400 hover:shadow-warm-hover hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between shadow-warm"
            >
              <div>
                {/* Exhibit Image */}
                <div className="relative h-52 w-full overflow-hidden bg-[#FAF6EE]">
                  <img
                    src={exhibit.image}
                    alt={exhibit.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Scale Badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FFFFFF]/95 backdrop-blur-md border border-[#EFE2CC] text-[10px] font-display uppercase tracking-wider text-[#9A6A45] font-bold shadow-sm">
                    {exhibit.scale}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="font-display text-[10px] text-[#9A6A45] uppercase tracking-widest font-semibold mb-1">
                    {exhibit.category}
                  </p>
                  <h3 className="font-pirate text-lg text-[#3D281D] group-hover:text-[#9A6A45] transition-colors mb-2 leading-snug">
                    {exhibit.title}
                  </h3>
                  <p className="font-body text-xs text-[#7A4F30] leading-relaxed mb-4">
                    {exhibit.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer Location */}
              <div className="px-5 py-3.5 bg-[#FAF6EE] border-t border-[#EFE2CC] flex items-center justify-between text-[11px] font-body text-[#5A4030]">
                <span className="flex items-center gap-1.5">
                  <Compass size={12} className="text-[#D6A85F]" />
                  <span>{exhibit.displayLocation}</span>
                </span>
                <span className="text-[10px] font-display uppercase text-[#88B8A1] font-semibold">On Display</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Framed Wall Gallery */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#EFE2CC] p-6 sm:p-10 relative overflow-hidden shadow-warm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-display text-[#9A6A45] uppercase tracking-widest mb-1 font-semibold">
                <Sparkles size={13} className="text-[#D6A85F]" />
                <span>ARCHIVAL WALL EXHIBIT</span>
              </div>
              <h3 className="font-pirate text-2xl sm:text-3xl text-[#3D281D]">
                STRAW HAT FLEET PORTRAIT ARCHIVE
              </h3>
            </div>
            <p className="text-xs font-body text-[#7A4F30] max-w-sm">
              Framed in aged walnut on our west salon wall. A tribute to the voyagers who call our café home.
            </p>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {wantedBounties.map((poster) => (
              <div
                key={poster.name}
                className="group relative rounded-2xl p-4 bg-[#FAF6EE] border border-[#EFE2CC] hover:border-[#D6A85F] transition-all duration-300 hover:shadow-warm flex flex-col items-center text-center shadow-sm"
              >
                <div className="font-pirate text-xs tracking-[0.25em] text-[#9A6A45] uppercase mb-2 font-bold">
                  GRAND LINE LOG
                </div>

                <div className="w-full h-44 rounded-xl overflow-hidden border border-[#EFE2CC] bg-white mb-3">
                  <img
                    src={poster.img}
                    alt={poster.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02] brightness-[0.98]"
                  />
                </div>

                <h4 className="font-pirate text-base text-[#3D281D] mb-0.5">
                  {poster.name}
                </h4>
                <p className="font-display text-[10px] text-[#9A6A45] uppercase tracking-wider mb-2 font-semibold">
                  {poster.epithet}
                </p>

                <div className="w-full py-1.5 rounded-xl bg-[#FFFFFF] border border-[#EFE2CC] font-pirate text-xs text-[#7A4F30] font-bold shadow-sm">
                  {poster.bounty}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal Lightbox for Selected Exhibit */}
      <AnimatePresence>
        {selectedExhibit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#EFE2CC] p-5 sm:p-6 text-[#3D281D] shadow-2xl"
            >
              <button
                onClick={() => setSelectedExhibit(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-[#3D281D] flex items-center justify-center hover:text-[#9A6A45] cursor-pointer"
              >
                ✕
              </button>

              <div className="h-56 rounded-2xl overflow-hidden mb-4 border border-[#EFE2CC]">
                <img
                  src={selectedExhibit.image}
                  alt={selectedExhibit.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-[10px] font-display text-[#9A6A45] uppercase tracking-wider mb-2 font-bold">
                {selectedExhibit.scale}
              </div>

              <h3 className="font-pirate text-2xl text-[#3D281D] mb-2">
                {selectedExhibit.title}
              </h3>

              <p className="font-body text-xs text-[#7A4F30] leading-relaxed mb-4">
                {selectedExhibit.desc}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#EFE2CC] text-xs space-y-1.5 mb-4">
                <div>
                  <span className="text-[#9A6A45] font-display font-bold">Craft & Materials: </span>
                  <span className="text-[#5A4030]">{selectedExhibit.material}</span>
                </div>
                <div>
                  <span className="text-[#9A6A45] font-display font-bold">Location in Café: </span>
                  <span className="text-[#5A4030]">{selectedExhibit.displayLocation}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedExhibit(null)}
                className="w-full py-3 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold shadow-sm"
              >
                Close Exhibit
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
