import { motion } from 'framer-motion';
import { Users, Heart, Coffee } from 'lucide-react';
import CrewCard from '../components/CrewCard';
import { crewMembers } from '../data/crewMembers';

export default function CrewPage() {
  return (
    <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] pt-24 pb-20 page-enter">
      {/* Page Header */}
      <div className="relative py-12 lg:py-16 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-[#EFE2CC]/80 blur-[80px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.2em] uppercase mb-4 shadow-sm font-bold">
            <Users size={13} className="text-[#D6A85F]" />
            <span>THE STRAW HAT CAFÉ TEAM</span>
          </div>
          <h1 className="font-pirate text-4xl sm:text-5xl lg:text-6xl text-[#3D281D] mb-4">
            MEET OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A45] via-[#D6A85F] to-[#7A4F30]">CREW</span>
          </h1>
          <div className="rope-divider max-w-xs mx-auto mb-4">
            <span className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-xs text-[#D6A85F]">☕</span>
          </div>
          <p className="font-accent italic text-[#7A4F30] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Eight companions united by a love of great food, comforting coffee, and shared adventures.
            Get to know their favorite comfort dishes and café personalities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {crewMembers.map((member, i) => (
            <CrewCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* Crew Promise Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white rounded-3xl p-8 lg:p-12 text-center border border-[#EFE2CC] shadow-warm relative overflow-hidden"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF6EE] border border-[#D6A85F]/30 flex items-center justify-center mx-auto mb-4 text-[#9A6A45]">
              <Coffee size={24} />
            </div>
            <h2 className="font-pirate text-2xl lg:text-3xl text-[#3D281D] mb-4">
              OUR CAFÉ PROMISE
            </h2>
            <p className="font-accent italic text-[#5A4030] text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              "We don't just serve food and coffee. We create a welcoming space where you can pause, celebrate friendship, and feel right at home. Every guest who walks through our doors is family."
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-12 h-px bg-[#D6A85F]" />
              <Heart size={14} className="text-[#D6A85F] fill-[#D6A85F]" />
              <div className="w-12 h-px bg-[#D6A85F]" />
            </div>
            <p className="font-display text-xs text-[#9A6A45] mt-2 tracking-widest uppercase font-bold">— THE GRAND LINE CAFÉ TEAM</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
