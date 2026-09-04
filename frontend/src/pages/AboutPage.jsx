import { motion } from 'framer-motion';
import { Coffee, Heart, Star, Globe, Users, Award, Compass, Utensils, Cake, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const stats = [
  { icon: Users, value: '25,000+', label: 'Warm Meals & Cups Served', color: 'text-[#9A6A45]', bg: 'bg-[#FAF6EE]' },
  { icon: Utensils, value: '50+', label: 'Handcrafted Dishes', color: 'text-[#D6A85F]', bg: 'bg-[#FAF6EE]' },
  { icon: Coffee, value: '100% Single-Origin', label: 'Artisan Arabica Roasts', color: 'text-[#7A4F30]', bg: 'bg-[#FAF6EE]' },
  { icon: Star, value: '4.9 / 5', label: 'Guest Hospitality Rating', color: 'text-[#B8873E]', bg: 'bg-[#FAF6EE]' },
];

const values = [
  {
    icon: Utensils,
    title: 'Comfort Food with Passion',
    desc: 'Every plate is prepared fresh by chefs who truly love what they do. Food cooked with passion tastes like adventure.',
    color: 'text-[#9A6A45]',
  },
  {
    icon: Coffee,
    title: 'Master Coffee Roasts',
    desc: 'Single-origin beans roasted over Japanese oak and slow-steeped to extract deep, aromatic chocolate and floral notes.',
    color: 'text-[#7A4F30]',
  },
  {
    icon: Cake,
    title: 'Daily Handmade Pastries',
    desc: 'From Devil Fruit berry cheesecakes to delicate French mille-feuille, our bakery prepares everything fresh at dawn.',
    color: 'text-[#D6A85F]',
  },
  {
    icon: Heart,
    title: 'Friendship & Community',
    desc: 'Grand Line Café is designed as a peaceful sanctuary where friends, families, and solo voyagers always feel welcomed.',
    color: 'text-[#B8873E]',
  },
];

const timeline = [
  { year: '2020', title: 'The Dream Takes Root', desc: 'Inspired by the Grand Line, our founders set out to create a warm sanctuary combining comforting restaurant dining with specialty coffee.' },
  { year: '2021', title: 'First Recipes Perfected', desc: 'Sanji’s seafood pasta, the Going Merry burger, and our single-origin Three-Sword espresso blend made their debut.' },
  { year: '2023', title: 'A Beloved Local Harbor', desc: 'Awarded "Best Themed Café & Comfort Food" by Coastal Culinary Magazine. Expanded our breakfast and dinner menu.' },
  { year: '2025', title: 'Expanded Dining & Salon', desc: 'Introduced the Wano Tea & Syphon bar, reading corner, and full Asian & Indian culinary specialties.' },
  { year: '2026', title: 'Welcoming Every Voyager', desc: 'Continuing to bring good food, great coffee, and the spirit of adventure to every table.' },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleReservationClick = () => {
    if (!isLoggedIn) {
      toast.error('Please log in first to reserve a table.');
      navigate('/login', { state: { from: '/reservations', message: 'Please log in first to reserve a table.' } });
      return;
    }
    navigate('/reservations');
  };

  return (
    <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] pt-24 pb-20 page-enter">
      {/* Hero Header */}
      <div className="relative py-12 lg:py-20 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#EFE2CC]/80 blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EFE2CC] text-[#9A6A45] text-xs font-display tracking-[0.2em] uppercase mb-4 shadow-sm font-bold">
            <Compass size={13} className="text-[#D6A85F]" />
            <span>OUR STORY & PASSION</span>
          </div>
          <h1 className="font-pirate text-4xl sm:text-5xl lg:text-6xl text-[#3D281D] mb-4 leading-tight">
            MORE THAN A CAFÉ.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A45] via-[#D6A85F] to-[#7A4F30]">
              AN ADVENTURE AT EVERY TABLE.
            </span>
          </h1>
          <div className="rope-divider max-w-xs mx-auto mb-6">
            <span className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-xs text-[#D6A85F]">☕</span>
          </div>
          <p className="font-accent italic text-[#7A4F30] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            “Born somewhere between the sea and the city, Grand Line Café brings the spirit of adventure to the comfort of your favorite table.”
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 lg:mb-24">
          {stats.map(({ icon: Icon, value, label, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-3xl p-6 text-center border border-[#EFE2CC] shadow-warm"
            >
              <div className={`w-12 h-12 rounded-2xl ${bg} border border-[#EFE2CC] flex items-center justify-center mx-auto mb-3`}>
                <Icon size={22} className={color} />
              </div>
              <div className="font-pirate text-2xl lg:text-3xl text-[#3D281D] mb-1">{value}</div>
              <div className="font-body text-xs text-[#7A4F30] font-semibold tracking-wide">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Story Content & Photo */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-pirate text-3xl text-[#3D281D] mb-4">HOW OUR HARBOR BEGAN</h2>
            <p className="font-body text-[#5A4030] leading-relaxed mb-4 text-sm sm:text-base">
              It started with a simple vision: create a place where the thrill of adventure and the deep comfort of home come together over exceptional food and drinks. We wanted a space inspired by the Grand Line where you could genuinely slow down, breathe in the fragrance of roasted coffee, and enjoy a nourishing meal.
            </p>
            <p className="font-body text-[#7A4F30] leading-relaxed mb-4 text-sm sm:text-base">
              Over the years, our kitchen has evolved into a complete dining experience—serving fluffy morning pancakes, sourdough pizzas, wok-fired noodles, rich butter chicken, and handcrafted Devil Fruit berry cheesecakes.
            </p>
            <p className="font-body text-[#7A4F30] leading-relaxed text-sm sm:text-base">
              Every detail, from our hand-carved cedar booths to our quiet reading nook, was created with warmth so that every guest leaves happier than when they arrived.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden h-80 lg:h-96 border border-[#EFE2CC] shadow-warm-lg bg-[#FAF6EE]">
              <img
                src="/images/cafe_interior.jpg"
                alt="Grand Line Café warm dining atmosphere"
                className="w-full h-full object-cover brightness-[0.98] contrast-[1.02]"
              />
            </div>
            <div className="absolute bottom-3 left-3 sm:-bottom-4 sm:-left-4 bg-white rounded-2xl p-3.5 sm:p-4 border border-[#EFE2CC] shadow-warm">
              <div className="font-display text-xs text-[#9A6A45] tracking-wide font-bold uppercase mb-0.5">ESTABLISHED</div>
              <div className="font-pirate text-2xl text-[#3D281D]">2020</div>
              <div className="font-body text-xs text-[#7A4F30]">Marine Promenade, Mumbai</div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-pirate text-3xl text-[#3D281D]">OUR CULINARY CREED</h2>
            <p className="font-accent italic text-[#7A4F30] text-sm mt-1">What we stand for every single day.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-3xl p-6 border border-[#EFE2CC] shadow-warm hover:shadow-warm-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#EFE2CC] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-pirate text-base text-[#3D281D] mb-2">{title}</h3>
                <p className="font-body text-xs text-[#7A4F30] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-pirate text-3xl text-[#3D281D] mb-1">OUR JOURNEY</h2>
            <p className="font-accent italic text-[#7A4F30] text-sm">Milestones along the Grand Line.</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-white rounded-2xl p-5 border border-[#EFE2CC] shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <span className="font-pirate text-2xl text-[#9A6A45] sm:w-24 flex-shrink-0 font-bold">{item.year}</span>
                  <div className="flex-1">
                    <h3 className="font-pirate text-base text-[#3D281D] mb-1">{item.title}</h3>
                    <p className="font-body text-xs text-[#7A4F30] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-3xl p-10 border border-[#EFE2CC] shadow-warm max-w-2xl mx-auto"
        >
          <div className="text-4xl mb-3">☕🍽️</div>
          <h2 className="font-pirate text-2xl text-[#3D281D] mb-3">PULL UP A CHAIR AT OUR HARBOR</h2>
          <p className="font-body text-xs sm:text-sm text-[#7A4F30] mb-6 leading-relaxed">
            Reserve your favorite table today or drop by during our daily voyages. We look forward to serving you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <button
              onClick={handleReservationClick}
              className="btn-primary px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider font-bold shadow-sm"
            >
              Book a Table
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="btn-outline px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider font-semibold"
            >
              Explore Menu
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
