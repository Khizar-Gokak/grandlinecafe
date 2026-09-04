import { motion } from 'framer-motion';
import { Swords, Wind, Flame, Sparkles, ChevronRight } from 'lucide-react';
import { audioFX } from '../utils/audioFX';

const techniques = [
  {
    id: 'onigiri',
    kanji: '鬼斬り',
    name: 'ONIGIRI',
    subtitle: 'Three-Sword Strike',
    description:
      'Zoro crosses two katanas across his chest and bites the third blade, hurtling forward with lethal velocity to slice his opponent across three vital points simultaneously.',
    icon: Swords,
    stats: 'Lethal Precision',
    blade: 'Wado Ichimonji / Sandai Kitetsu',
  },
  {
    id: 'tatsumaki',
    kanji: '龍巻き',
    name: 'TATSUMAKI',
    subtitle: 'Whirling Blade Technique',
    description:
      'Spinning his three blades with hurricane force, Zoro generates a fierce vortex of slicing vacuum wind that lifts enemies into the air, shredding their defenses.',
    icon: Wind,
    stats: 'Area Whirlwind',
    blade: 'Dragon Wind Shear',
  },
  {
    id: 'asura',
    kanji: '阿修羅',
    name: 'ASURA',
    subtitle: 'The Demon Within (Nine-Sword Style)',
    description:
      'Manifesting the demonic aura of the nine-bladed god of war Asura, Zoro creates the illusion of three heads and six arms to deliver an inescapable storm of steel.',
    icon: Flame,
    stats: 'Demonic Awakening',
    blade: 'King of Hell Spirit',
  },
];

export default function TheWayOfTheSword() {
  const handleCardClick = () => {
    audioFX.playSwordSlash();
  };

  return (
    <section id="way-of-the-sword" className="relative py-24 lg:py-32 bg-[#020605] overflow-hidden border-t border-[#00FF88]/15">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,136,0.06)_0%,_transparent_70%)]" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00C96B]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Vertical Green Sword Line */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          
          {/* Vertical Green Sword-Line Decoration */}
          <div className="flex justify-center mb-6">
            <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-[#00FF88] to-transparent shadow-[0_0_12px_#00FF88]" />
          </div>

          <div className="inline-flex items-center gap-2.5 badge-zoro px-4 py-1.5 rounded-full mb-4">
            <Swords size={13} className="text-[#00FF88]" />
            <span className="text-xs font-bold tracking-[0.25em]">SANTORYU SECRET ARTS</span>
          </div>

          <h2 className="font-pirate text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide mb-6">
            THE WAY OF THE <span className="text-[#00FF88] drop-shadow-[0_0_20px_rgba(0,255,136,0.4)]">SWORD</span>
          </h2>

          <p className="font-accent italic text-[#E8FFF3]/90 text-lg sm:text-xl leading-relaxed">
            "Three swords. One promise.<br />
            A warrior who refuses to lose sight of his goal."
          </p>
        </div>

        {/* 3 Cinematic Technique Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {techniques.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                onClick={handleCardClick}
                className="group relative bg-[#06100C] rounded-2xl p-7 lg:p-8 border border-[#00FF88]/25 hover:border-[#00FF88] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] cursor-pointer flex flex-col justify-between"
              >
                {/* Kanji Watermark */}
                <div className="absolute top-4 right-5 text-4xl sm:text-5xl font-pirate text-[#00FF88]/10 group-hover:text-[#00FF88]/20 transition-colors pointer-events-none select-none">
                  {tech.kanji}
                </div>

                <div>
                  {/* Icon Header */}
                  <div className="w-12 h-12 rounded-xl bg-[#020605] border border-[#00FF88]/40 flex items-center justify-center text-[#00FF88] mb-6 group-hover:bg-[#00FF88] group-hover:text-[#020605] group-hover:shadow-[0_0_20px_#00FF88] transition-all duration-300">
                    <Icon size={22} />
                  </div>

                  <span className="font-display text-[10px] text-[#7E998B] tracking-[0.25em] uppercase block mb-1">
                    {tech.subtitle}
                  </span>

                  <h3 className="font-pirate text-2xl lg:text-3xl text-white group-hover:text-[#00FF88] transition-colors mb-4">
                    {tech.name}
                  </h3>

                  <p className="font-body text-[#E8FFF3]/75 text-sm leading-relaxed mb-6">
                    {tech.description}
                  </p>
                </div>

                {/* Card Footer Tag */}
                <div className="pt-4 border-t border-[#00FF88]/15 flex items-center justify-between text-xs font-display">
                  <span className="text-[#00FF88] tracking-wider font-semibold">{tech.stats}</span>
                  <span className="text-[#7E998B] group-hover:text-[#E8FFF3] transition-colors flex items-center gap-1">
                    Trigger SFX <ChevronRight size={14} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Zoro Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-8 rounded-3xl bg-[#06100C]/80 border border-[#00FF88]/30 text-center max-w-4xl mx-auto shadow-[0_0_30px_rgba(0,255,136,0.15)]"
        >
          <p className="font-pirate text-xl sm:text-2xl text-[#E8FFF3] mb-2 leading-snug">
            "If I die here, then that's all the man I was destined to be."
          </p>
          <span className="font-display text-xs text-[#00FF88] tracking-[0.3em] uppercase">
            — RORONOA ZORO • KING OF HELL
          </span>
        </motion.div>

      </div>
    </section>
  );
}
