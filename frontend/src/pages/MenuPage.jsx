import { motion } from 'framer-motion';
import { Compass, Anchor } from 'lucide-react';
import TreasureMapMenu from '../components/TreasureMapMenu';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] pt-20 pb-20 page-enter">
      {/* Page Header */}
      <div className="relative py-10 sm:py-14 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-[#EFE2CC]/80 blur-[80px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.2em] uppercase mb-4 shadow-sm font-bold">
            <Anchor size={13} className="text-[#D6A85F]" />
            <span>PIRATE TREASURE MAP & FEAST MENU</span>
          </div>
          <h1 className="font-pirate text-4xl sm:text-5xl lg:text-6xl text-[#3D281D] mb-3">
            GRAND LINE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A45] via-[#D6A85F] to-[#7A4F30]">TREASURE CHART</span>
          </h1>
          <p className="font-accent italic text-[#7A4F30] text-base sm:text-lg max-w-xl mx-auto">
            Navigate the Five Seas of culinary excellence — artisan coffee, handcrafted burgers, wood-fired pizzas, pasta, Asian & Indian specials, and sky-island desserts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TreasureMapMenu />
      </div>
    </div>
  );
}
