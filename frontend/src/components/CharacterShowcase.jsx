import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Flame, Zap, Crosshair, Crown, Sparkles, ChevronRight } from 'lucide-react';
import { audioFX } from '../utils/audioFX';

const characters = [
  {
    id: 'zoro',
    name: 'Roronoa Zoro',
    title: 'King of Hell • Master Swordsman',
    role: 'First Mate & Combatant',
    bounty: '1,111,000,000 ฿',
    image: '/images/zoro_hero.jpg',
    theme: 'emerald',
    badgeColor: 'border-[#00FF88]/50 bg-[#00FF88]/10 text-[#00FF88]',
    glowColor: 'shadow-[0_0_30px_rgba(0,255,136,0.35)]',
    borderColor: 'border-[#00FF88]/50',
    activeGlow: 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]',
    accentColor: '#00FF88',
    icon: Swords,
    quote: 'Scars on the back are a swordsman’s shame.',
    description:
      'The legendary master of Santoryu (Three-Sword Style) who wields Enma, Wado Ichimonji, and Sandai Kitetsu. Possessor of Advanced Conqueror’s Haki.',
    stats: [
      { label: 'Attack', value: 98 },
      { label: 'Haki Mastery', value: 96 },
      { label: 'Durability', value: 99 },
      { label: 'Sense of Direction', value: 3 },
    ],
    signatureMove: 'Three-Sword Style: King of Hell Dragon Damnation',
  },
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    title: 'Emperor of the Sea • Sun God Nika',
    role: 'Captain of the Straw Hat Pirates',
    bounty: '3,000,000,000 ฿',
    image: '/images/luffy.jpg',
    theme: 'emerald',
    badgeColor: 'border-[#00FF88]/40 bg-[#00FF88]/10 text-[#00FF88]',
    glowColor: 'shadow-[0_0_30px_rgba(0,255,136,0.25)]',
    borderColor: 'border-[#00FF88]/30',
    activeGlow: 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]',
    accentColor: '#00FF88',
    icon: Crown,
    quote: 'I’m going to become the King of the Pirates!',
    description:
      'Bearer of the legendary Mythical Zoan Fruit Hito Hito no Mi: Model Nika. Channels Gear 5 freedom and Advanced Conqueror’s Haki.',
    stats: [
      { label: 'Attack', value: 100 },
      { label: 'Haki Mastery', value: 99 },
      { label: 'Durability', value: 98 },
      { label: 'Appetite', value: 100 },
    ],
    signatureMove: 'Gum-Gum Bajrang Gun',
  },
  {
    id: 'sanji',
    name: 'Vinsmoke Sanji',
    title: 'Black Leg • Stealth General',
    role: 'Chef of the Straw Hats',
    bounty: '1,032,000,000 ฿',
    image: '/images/sanji.jpg',
    theme: 'emerald',
    badgeColor: 'border-[#00FF88]/40 bg-[#00FF88]/10 text-[#00FF88]',
    glowColor: 'shadow-[0_0_30px_rgba(0,255,136,0.25)]',
    borderColor: 'border-[#00FF88]/30',
    activeGlow: 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]',
    accentColor: '#00C96B',
    icon: Flame,
    quote: 'Cooking is a gift from the gods. Spices are a gift from the devil.',
    description:
      'Master of Black Leg style martial arts with blue-fire Ifrit Jambe and superhuman Germa exoskeleton durability.',
    stats: [
      { label: 'Attack', value: 95 },
      { label: 'Speed', value: 99 },
      { label: 'Culinary Art', value: 100 },
      { label: 'Chivalry', value: 100 },
    ],
    signatureMove: 'Ifrit Jambe: Bœuf Burst',
  },
  {
    id: 'nami',
    name: 'Cat Burglar Nami',
    title: 'Weather Empress • Sorceress',
    role: 'Chief Navigator',
    bounty: '366,000,000 ฿',
    image: '/images/nami.jpg',
    theme: 'emerald',
    badgeColor: 'border-[#00FF88]/40 bg-[#00FF88]/10 text-[#00FF88]',
    glowColor: 'shadow-[0_0_30px_rgba(0,255,136,0.25)]',
    borderColor: 'border-[#00FF88]/30',
    activeGlow: 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]',
    accentColor: '#39FF14',
    icon: Zap,
    quote: 'What good is treasure if you’re alone?',
    description:
      'Brilliant meteorologist wielding the Sorcery Clima-Tact paired with Zeus the Thundercloud to command atmospheric storms.',
    stats: [
      { label: 'Navigation', value: 100 },
      { label: 'Tactics', value: 96 },
      { label: 'Thunder Attack', value: 92 },
      { label: 'Money Radar', value: 100 },
    ],
    signatureMove: 'Thunderbolt Tempo: Zeus Surge',
  },
  {
    id: 'usopp',
    name: 'God Usopp',
    title: 'Sniper King • Master Tactician',
    role: 'Sniper & Engineer',
    bounty: '500,000,000 ฿',
    image: '/images/usopp.jpg',
    theme: 'emerald',
    badgeColor: 'border-[#00FF88]/40 bg-[#00FF88]/10 text-[#00FF88]',
    glowColor: 'shadow-[0_0_30px_rgba(0,255,136,0.25)]',
    borderColor: 'border-[#00FF88]/30',
    activeGlow: 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]',
    accentColor: '#00FF88',
    icon: Crosshair,
    quote: 'I am the brave warrior of the sea!',
    description:
      'Uncanny marksman wielding the Kuro Kabuto and Pop Green biological plants, with awakening Observation Haki.',
    stats: [
      { label: 'Accuracy', value: 99 },
      { label: 'Creativity', value: 98 },
      { label: 'Luck', value: 100 },
      { label: 'Bravery', value: 88 },
    ],
    signatureMove: 'Special Firebird Star: Pop Green Forest',
  },
];

export default function CharacterShowcase() {
  const [selectedId, setSelectedId] = useState('zoro');
  const activeChar = characters.find((c) => c.id === selectedId) || characters[0];

  const handleSelect = (id) => {
    audioFX.playAdventureClick();
    setSelectedId(id);
  };

  return (
    <section id="characters-section" className="relative py-24 lg:py-32 section-ocean overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeChar.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-zoro px-4 py-2 rounded-full mb-4">
            <Sparkles size={12} className="text-emerald-400" />
            <span>THE STRAW HAT CREW</span>
          </div>
          <h2 className="font-pirate text-3xl sm:text-5xl lg:text-6xl text-gold-gradient mb-4">
            LEGENDS OF THE SEA
          </h2>
          <p className="font-accent italic text-parchment-300 text-lg max-w-xl mx-auto">
            Choose a crew member to inspect their bounty, stats, and signature mastery.
          </p>
        </div>

        {/* Character Selection Pills */}
        <div className="flex justify-center gap-3 mb-14 overflow-x-auto pb-2 scrollbar-hide">
          {characters.map((c) => {
            const Icon = c.icon;
            const isSelected = c.id === selectedId;
            return (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-display text-sm transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? `${c.activeGlow} shadow-lg scale-105 border`
                    : 'glass text-parchment-400 border border-gold-500/20 hover:border-gold-500/40 hover:text-parchment-200'
                }`}
              >
                <Icon size={16} style={{ color: isSelected ? c.accentColor : 'inherit' }} />
                <span>{c.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Character Showcase Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChar.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className={`glass rounded-3xl p-6 lg:p-10 border ${activeChar.borderColor} ${activeChar.glowColor}`}
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Character Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden glass border border-white/10 aspect-[3/4] group">
                  <img
                    src={activeChar.image}
                    alt={activeChar.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-transparent to-transparent opacity-80" />
                  
                  {/* Bounty Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 glass p-3 rounded-xl border border-white/15">
                    <span className="font-display text-[10px] text-parchment-400 uppercase tracking-widest block">
                      OFFICIAL WORLD GOVERNMENT BOUNTY
                    </span>
                    <span className="font-pirate text-xl text-gold-gradient font-bold">
                      {activeChar.bounty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Character Lore & Attributes */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-display mb-3 border bg-white/5 border-white/15">
                    <activeChar.icon size={13} style={{ color: activeChar.accentColor }} />
                    <span style={{ color: activeChar.accentColor }}>{activeChar.role}</span>
                  </div>
                  <h3 className="font-pirate text-3xl sm:text-4xl text-parchment-100 mb-1">
                    {activeChar.name}
                  </h3>
                  <p className="font-accent italic text-base text-parchment-300">
                    "{activeChar.quote}"
                  </p>
                </div>

                <p className="font-body text-parchment-300 text-sm sm:text-base leading-relaxed">
                  {activeChar.description}
                </p>

                {/* Signature Attack Box */}
                <div className="p-4 rounded-xl glass border border-white/10">
                  <span className="font-display text-xs text-parchment-400 uppercase tracking-wider block mb-1">
                    ⚡ Signature Ultimate
                  </span>
                  <p className="font-pirate text-base text-parchment-100 font-semibold" style={{ color: activeChar.accentColor }}>
                    {activeChar.signatureMove}
                  </p>
                </div>

                {/* Stats Matrix */}
                <div className="space-y-3 pt-2">
                  <span className="font-display text-xs text-gold-400 uppercase tracking-widest block">
                    Combat & Skill Metrics
                  </span>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {activeChar.stats.map((stat) => (
                      <div key={stat.label} className="glass-light p-3 rounded-xl">
                        <div className="flex justify-between text-xs font-display mb-1.5">
                          <span className="text-parchment-300">{stat.label}</span>
                          <span style={{ color: activeChar.accentColor }} className="font-bold">
                            {stat.value}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.value}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: activeChar.accentColor }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
