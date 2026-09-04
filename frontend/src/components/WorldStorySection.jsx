import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Anchor, Ship, Navigation, Wind, ShieldAlert, Sparkles } from 'lucide-react';
import { audioFX } from '../utils/audioFX';

const waypoints = [
  {
    id: 'east-blue',
    sea: 'East Blue',
    name: 'Loguetown — Town of Beginnings',
    desc: 'Where the Pirate King Gol D. Roger was born and executed. The departure gate to the Grand Line.',
    dangerLevel: 'Safe Waters',
    color: '#34d399',
    icon: Anchor,
  },
  {
    id: 'alabasta',
    sea: 'Paradise',
    name: 'Alabasta Kingdom',
    desc: 'Desert empire threatened by Crocodile and Baroque Works. Where the crew declared their unbreakable bond with Princess Vivi.',
    dangerLevel: 'Warlord Territory',
    color: '#fbbf24',
    icon: Wind,
  },
  {
    id: 'enies-lobby',
    sea: 'Grand Line',
    name: 'Enies Lobby & Water 7',
    desc: 'The Judicial Island of the World Government. Where Luffy ordered Sogeking to shoot down the Government flag to rescue Nico Robin.',
    dangerLevel: 'CP9 Stronghold',
    color: '#f97316',
    icon: Navigation,
  },
  {
    id: 'marineford',
    sea: 'Red Line',
    name: 'Marineford Summit War',
    desc: 'The greatest clash in modern pirate history between the Whitebeard Pirates and the Marine Headquarters.',
    dangerLevel: 'War Zone',
    color: '#ef4444',
    icon: ShieldAlert,
  },
  {
    id: 'wano',
    sea: 'New World',
    name: 'Wano Country — Land of Samurai',
    desc: 'Closed borders guarded by the Beast Pirates. Where Zoro mastered Enma and Luffy unleashed the Drums of Liberation (Gear 5).',
    dangerLevel: 'Emperor Fortress',
    color: '#10b981',
    icon: Sparkles,
  },
  {
    id: 'egghead',
    sea: 'Final Sea',
    name: 'Egghead — Future Island',
    desc: 'Dr. Vegapunk’s high-tech scientific island holding the ancient secrets of the Void Century.',
    dangerLevel: 'Gorosei Incursion',
    color: '#a855f7',
    icon: Ship,
  },
];

export default function WorldStorySection() {
  const [selectedWp, setSelectedWp] = useState(waypoints[4]); // Wano selected by default

  const handleSelect = (wp) => {
    audioFX.playAdventureClick();
    setSelectedWp(wp);
  };

  return (
    <section id="story-section" className="relative py-24 lg:py-32 section-deep overflow-hidden">
      {/* Background stars & gradient */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-gold px-4 py-2 rounded-full mb-4">
            <Compass size={12} className="text-gold-400" />
            <span>THE GRAND LINE SAGA</span>
          </div>
          <h2 className="font-pirate text-3xl sm:text-5xl lg:text-6xl text-gold-gradient mb-4">
            THE WORLD & VOYAGE
          </h2>
          <p className="font-accent italic text-parchment-300 text-lg max-w-xl mx-auto">
            Trace the path of the Thousand Sunny across mythical seas and forbidden islands.
          </p>
        </div>

        {/* Interactive Voyage Map Route */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Waypoints Navigator Column */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-display text-xs text-gold-400 tracking-widest uppercase block mb-2">
              Log Pose Waypoints
            </span>
            {waypoints.map((wp, idx) => {
              const Icon = wp.icon;
              const isSelected = wp.id === selectedWp.id;
              return (
                <button
                  key={wp.id}
                  onClick={() => handleSelect(wp)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      : 'border-white/10 glass hover:border-white/20'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${wp.color}22`, color: wp.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs text-parchment-400 uppercase tracking-wider">{wp.sea}</span>
                      <span className="font-display text-[10px] px-2 py-0.5 rounded-full border border-white/10" style={{ color: wp.color }}>
                        {wp.dangerLevel}
                      </span>
                    </div>
                    <h4 className="font-pirate text-sm sm:text-base text-parchment-100 truncate mt-0.5">
                      {wp.name.split('—')[0]}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Waypoint Display Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedWp.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="glass rounded-3xl p-8 lg:p-10 border border-emerald-500/30 relative overflow-hidden"
              >
                {/* Background Compass Watermark */}
                <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
                  <Compass size={320} className="text-emerald-400" />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full badge-zoro text-xs font-display">
                      LOG POSE LOCKED • {selectedWp.sea}
                    </span>
                    <span className="font-display text-xs text-emerald-400">
                      CURRENT COORDINATES
                    </span>
                  </div>

                  <div>
                    <h3 className="font-pirate text-2xl sm:text-4xl text-parchment-100 mb-2">
                      {selectedWp.name}
                    </h3>
                    <p className="font-body text-parchment-300 text-base sm:text-lg leading-relaxed">
                      {selectedWp.desc}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="glass-light p-4 rounded-xl">
                      <span className="font-display text-xs text-parchment-400 block mb-1">Status Threat</span>
                      <span className="font-pirate text-lg" style={{ color: selectedWp.color }}>
                        {selectedWp.dangerLevel}
                      </span>
                    </div>
                    <div className="glass-light p-4 rounded-xl">
                      <span className="font-display text-xs text-parchment-400 block mb-1">Next Destination</span>
                      <span className="font-pirate text-lg text-emerald-400">
                        Laugh Tale (The One Piece)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
