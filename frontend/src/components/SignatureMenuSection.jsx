import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import TreasureMapMenu from './TreasureMapMenu';

export default function SignatureMenuSection() {
  return (
    <section
      id="signature-menu"
      className="relative py-20 lg:py-28 bg-[#F8F1E5] text-[#3D281D] overflow-hidden border-t border-[#EFE2CC]"
    >
      {/* Background Soft Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full bg-[#EFE2CC]/80 blur-[150px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-[#D6A85F]/12 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#9A6A45_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.22em] uppercase mb-4 shadow-sm font-bold"
          >
            <Sparkles size={13} className="text-[#D6A85F]" />
            <span>PIRATE TREASURE MAP MENU</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-pirate text-2xl sm:text-5xl lg:text-6xl text-[#3D281D] tracking-wide mb-4 break-words max-w-full"
          >
            GRAND LINE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A45] via-[#D6A85F] to-[#7A4F30]">TREASURE MAP</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-accent italic text-base sm:text-xl text-[#7A4F30] max-w-xl mx-auto"
          >
            Chart your journey across the Five Seas — from East Blue coffee & Grand Line starters to New World feasting, Sky Island desserts & Fish-Man refreshers.
          </motion.p>
        </div>

        {/* Interactive Treasure Map Menu */}
        <TreasureMapMenu />

      </div>
    </section>
  );
}
