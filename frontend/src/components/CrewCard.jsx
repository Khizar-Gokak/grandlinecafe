import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function CrewCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="crew-card rounded-3xl overflow-hidden group cursor-default bg-white border border-[#EFE2CC] shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Avatar Header */}
        <div className="relative h-36 bg-gradient-to-br from-[#FAF6EE] to-[#EFE2CC] flex flex-col items-center justify-center overflow-hidden border-b border-[#EFE2CC]">
          {/* Subtle background symbol */}
          <div className="absolute top-2 right-4 text-4xl opacity-20 rotate-12">{member.symbol}</div>
          <div className="absolute bottom-2 left-4 text-2xl opacity-20 -rotate-12">{member.emoji}</div>

          {/* Avatar circle */}
          <div
            className="relative z-10 w-18 h-18 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-[#D6A85F]/40 bg-white transition-transform duration-300 group-hover:scale-105"
          >
            {member.avatar}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Name + Role */}
          <div className="mb-3">
            <h3 className="font-pirate text-lg text-[#3D281D] group-hover:text-[#9A6A45] transition-colors">
              {member.name}
            </h3>
            <p className="font-display text-xs text-[#9A6A45] font-bold tracking-wider mt-0.5">
              {member.role}
            </p>
          </div>

          {/* Traits */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {[member.trait1, member.trait2, member.trait3].map(t => (
              <span
                key={t}
                className="font-body text-[11px] px-2.5 py-0.5 rounded-lg bg-[#FAF6EE] border border-[#EFE2CC] text-[#7A4F30] font-semibold"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Personality */}
          <p className="font-body text-xs text-[#7A4F30] leading-relaxed line-clamp-3 mb-3.5">
            {member.personality}
          </p>

          {/* Favourite Dish */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF6EE] border border-[#EFE2CC] mb-3">
            <span className="text-base">🍽️</span>
            <div>
              <span className="font-display text-[10px] text-[#9A6A45] tracking-wider uppercase font-bold block">
                FAVORITE DISH
              </span>
              <span className="font-body text-xs text-[#3D281D] font-semibold">{member.favoriteDish}</span>
            </div>
          </div>

          {/* Quote */}
          <div className="relative p-3 rounded-2xl bg-[#FAF6EE]/50 border border-[#EFE2CC]/70">
            <Quote size={12} className="text-[#D6A85F] absolute top-2.5 left-2.5 opacity-60" />
            <p className="font-accent italic text-xs text-[#5A4030] leading-relaxed pl-4">
              {member.quote}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
