import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Utensils } from 'lucide-react';
import FoodCard from './FoodCard';
import { getMenuItems } from '../services/api';
import { menuItems } from '../data/menuItems';

const fallbackFeatured = menuItems.filter(i => i.featured).slice(0, 6);

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function FeaturedDishes() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(fallbackFeatured);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const data = await getMenuItems({ featured: true });
        if (isMounted && data && data.length > 0) {
          setFeatured(data.slice(0, 6));
        }
      } catch (e) {
        console.error('Featured dishes fetch error:', e);
      }
    }
    loadFeatured();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="relative py-20 lg:py-28 section-ocean overflow-hidden">
      {/* Decorative anchor top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-gold-500/40" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gold-500/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 badge-gold px-4 py-2 rounded-full mb-4">
            <Utensils size={12} className="text-gold-400" />
            <span className="text-xs">SIGNATURE DISHES</span>
          </div>
          <h2 className="font-pirate text-3xl sm:text-4xl lg:text-5xl text-gold-gradient mb-4">
            FEAST LIKE A PIRATE
          </h2>
          <div className="rope-divider max-w-xs mx-auto mb-4">
            <span className="relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy-900 border border-gold-500/40 text-xs text-gold-500">
              ⚓
            </span>
          </div>
          <p className="font-accent text-base lg:text-lg text-parchment-300 max-w-xl mx-auto italic">
            Legends of the sea, prepared fresh every day. Each dish tells a tale of adventure.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featured.map(item => (
            <motion.div key={item.id} variants={cardVariants}>
              <FoodCard item={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* View Full Menu CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/menu')}
            className="btn-outline inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm"
          >
            View Full Menu
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0,20 C300,0 900,40 1200,20 L1200,40 L0,40 Z" fill="rgba(4,13,26,0.7)" />
        </svg>
      </div>
    </section>
  );
}
