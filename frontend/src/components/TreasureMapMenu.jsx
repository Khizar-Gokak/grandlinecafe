import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Sparkles, Coffee, Utensils, Cake, Search, Star, Anchor, Waves, Crosshair, ChevronRight, X, Flame } from 'lucide-react';
import FoodCard from './FoodCard';
import { menuItems } from '../data/menuItems';
import { signatureMenuItems } from '../data/cafeData';
import { audioFX } from '../utils/audioFX';

// ===== TREASURE MAP ISLAND CONFIGURATION =====
export const ISLANDS = [
  {
    id: 'all',
    name: 'All Islands',
    pirateName: 'The Grand Line Chart',
    categoryLabel: '🗺️ Full Menu Chart',
    icon: '🗺️',
    coords: '00°N 00°E • World Ocean',
    tagline: 'Explore All Destinations',
    description: 'Chart your route across all 5 seas to discover every handcrafted dish, artisan coffee, and sweet delicacy.',
    bgGradient: 'from-[#D6A85F]/20 to-[#9A6A45]/20',
    color: '#9A6A45',
    accentBorder: 'border-[#D6A85F]',
    badgeBg: 'bg-[#9A6A45]',
    categories: ['all'],
    mapX: 50,
    mapY: 15,
  },
  {
    id: 'east-blue',
    name: 'East Blue',
    pirateName: 'East Blue Sea',
    categoryLabel: '☕ Coffee & Breakfast',
    icon: '☕',
    coords: '01°N 45°E • East Blue Haven',
    tagline: 'Artisan Micro-Roasts & Dawn Flapjacks',
    description: 'The tranquil sea of origins. Savor three-sword pour-overs, sakura cotton candy lattes, and golden pancakes.',
    bgGradient: 'from-[#E6BD7B]/30 to-[#9A6A45]/20',
    color: '#9A6A45',
    accentBorder: 'border-[#D6A85F]',
    badgeBg: 'bg-[#9A6A45]',
    categories: ['Breakfast', 'Coffee', 'breakfast'],
    mapX: 18,
    mapY: 42,
  },
  {
    id: 'grand-line',
    name: 'Grand Line',
    pirateName: 'Grand Line Passage',
    categoryLabel: '🍽️ Starters & Bites',
    icon: '🍽️',
    coords: '12°S 88°E • Outpost Island',
    tagline: 'Crispy Wings & Loaded Pirate Burgers',
    description: 'Navigate the great route! Loaded fries, baratie glazed wings, sourdough garlic bread & gourmet burgers.',
    bgGradient: 'from-[#C85A32]/25 to-[#8C3B1E]/20',
    color: '#C85A32',
    accentBorder: 'border-[#C85A32]',
    badgeBg: 'bg-[#C85A32]',
    categories: ['Starters', 'Burgers', 'bites'],
    mapX: 38,
    mapY: 68,
  },
  {
    id: 'new-world',
    name: 'New World',
    pirateName: 'New World Dominion',
    categoryLabel: '🍝 Main Course & Feasts',
    icon: '🍝',
    coords: '44°N 120°E • Emperor Realm',
    tagline: 'Handmade Pastas, Wood-Fired Pizza & Curries',
    description: 'The sea of Emperors! Feast on Black Leg seafood pasta, wood-fired sourdough pizza, ramen, and rich curries.',
    bgGradient: 'from-[#A83232]/25 to-[#6E2222]/20',
    color: '#A83232',
    accentBorder: 'border-[#A83232]',
    badgeBg: 'bg-[#A83232]',
    categories: ['Main Course', 'Pasta', 'Pizza', 'Asian', 'Indian', 'mains', 'pizza-pasta'],
    mapX: 62,
    mapY: 35,
  },
  {
    id: 'sky-island',
    name: 'Sky Island',
    pirateName: 'Skypiea Sanctuary',
    categoryLabel: '🍰 Desserts & Pastries',
    icon: '🍰',
    coords: '10,000m Above • Skypiea',
    tagline: 'Cloud-Soft Cakes & Devil Fruit Tarts',
    description: 'Floating high above the clouds! Indulge in Devil Fruit berry tarts, lava cakes, and matcha mille-feuille.',
    bgGradient: 'from-[#7897A5]/30 to-[#4A6D7C]/20',
    color: '#4A6D7C',
    accentBorder: 'border-[#7897A5]',
    badgeBg: 'bg-[#7897A5]',
    categories: ['Desserts', 'desserts'],
    mapX: 82,
    mapY: 22,
  },
  {
    id: 'fishman-island',
    name: 'Fish-Man Island',
    pirateName: 'Ryugu Kingdom',
    categoryLabel: '🥤 Drinks & Refreshers',
    icon: '🥤',
    coords: '10,000m Undersea • Deep Cove',
    tagline: 'Iced Citrus Coolers & Ocean Elixirs',
    description: 'Diving 10,000 meters into ocean paradise. Tangerine iced teas, sakura coolers, and iced macchiatos.',
    bgGradient: 'from-[#328A8A]/25 to-[#1E5A5A]/20',
    color: '#1E5A5A',
    accentBorder: 'border-[#328A8A]',
    badgeBg: 'bg-[#328A8A]',
    categories: ['Drinks', 'Beverages', 'Juices', 'drinks'],
    mapX: 78,
    mapY: 78,
  },
];

// Helper to normalize and unify items from both datasets
const allUnifiedItems = (() => {
  const list = [];
  
  // Standard menu items
  menuItems.forEach(item => {
    list.push({
      ...item,
      source: 'menuItems',
    });
  });

  // Signature menu items (if not already included by ID)
  signatureMenuItems.forEach(sig => {
    const exists = list.some(i => i.name.toLowerCase() === sig.name.toLowerCase());
    if (!exists) {
      list.push({
        id: `sig-${sig.id}`,
        name: sig.name,
        category: sig.category === 'drinks' ? 'Drinks' :
                  sig.category === 'bites' ? 'Burgers' :
                  sig.category === 'mains' ? 'Main Course' :
                  sig.category === 'pizza-pasta' ? 'Pizza' :
                  sig.category === 'desserts' ? 'Desserts' :
                  sig.category === 'breakfast' ? 'Breakfast' : 'Main Course',
        description: sig.description,
        price: sig.priceINR || Math.round(sig.priceUSD * 75),
        rating: 4.9,
        image: sig.image,
        featured: sig.popular || false,
        badge: sig.characterBadge || sig.tags?.[0] || 'Signature',
        prepTime: sig.prepTime || '10 min',
        source: 'signature',
      });
    }
  });

  return list;
})();

export default function TreasureMapMenu() {
  const [selectedIslandId, setSelectedIslandId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState('featured');

  const currentIsland = useMemo(() => {
    return ISLANDS.find(i => i.id === selectedIslandId) || ISLANDS[0];
  }, [selectedIslandId]);

  const handleIslandSelect = (islandId) => {
    audioFX?.playAdventureClick?.();
    setSelectedIslandId(islandId);
  };

  // Filter items based on active island and search
  const filteredItems = useMemo(() => {
    let result = [...allUnifiedItems];

    // Filter by Island Categories
    if (selectedIslandId !== 'all') {
      const activeIslandObj = ISLANDS.find(i => i.id === selectedIslandId);
      if (activeIslandObj) {
        const allowedCats = activeIslandObj.categories.map(c => c.toLowerCase());
        result = result.filter(item => {
          const itemCat = item.category ? item.category.toLowerCase() : '';
          return allowedCats.includes(itemCat);
        });
      }
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
    }

    // Sort Items
    if (sortMode === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortMode === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortMode === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // Featured first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedIslandId, searchQuery, sortMode]);

  return (
    <div className="w-full select-none">
      
      {/* ===== 1. INTERACTIVE PIRATE TREASURE MAP CANVAS ===== */}
      <div className="relative rounded-3xl bg-[#F4EAD5] border-2 border-[#D6A85F]/60 p-5 sm:p-8 md:p-10 shadow-warm-lg overflow-hidden mb-12">
        
        {/* Parchment Texture Background Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(#9A6A45_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF]/40 via-transparent to-[#D6A85F]/15 pointer-events-none" />

        {/* Vintage Compass Rose Motif (Top Right) */}
        <div className="absolute top-4 right-4 opacity-20 pointer-events-none text-[#3D281D]">
          <Compass size={110} strokeWidth={1} />
        </div>

        {/* Ocean Waves Motif (Bottom Left) */}
        <div className="absolute bottom-4 left-4 opacity-15 pointer-events-none text-[#7897A5]">
          <Waves size={90} strokeWidth={1} />
        </div>

        {/* Map Title Header */}
        <div className="relative z-10 text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF]/90 border border-[#D6A85F]/40 text-[#9A6A45] text-[11px] font-display font-bold tracking-[0.2em] uppercase shadow-sm mb-2">
            <Anchor size={13} className="text-[#D6A85F]" />
            <span>INTERACTIVE GRAND LINE NAVIGATOR</span>
          </div>

          <h3 className="font-pirate text-2xl sm:text-4xl text-[#3D281D] tracking-wide">
            EXPLORE THE FIVE SEAS OF FLAVOR
          </h3>

          <p className="font-accent italic text-xs sm:text-sm text-[#7A4F30] mt-1">
            Tap an island on the chart below to unveil its signature culinary treasures.
          </p>
        </div>

        {/* ===== VISUAL TREASURE MAP CHART (DESKTOP & TABLET GRAPHIC) ===== */}
        <div className="relative z-10 hidden sm:block w-full h-[320px] sm:h-[360px] rounded-2xl bg-[#EFE2CC]/50 border border-[#D6A85F]/40 shadow-inner overflow-hidden mb-8">
          
          {/* Dashed Nautical Trails Connecting Islands */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Trail: East Blue -> Grand Line */}
            <path d="M 18% 42% Q 28% 55% 38% 68%" stroke="#9A6A45" strokeWidth="2.5" strokeDasharray="6 6" fill="none" opacity="0.6" />
            {/* Trail: Grand Line -> New World */}
            <path d="M 38% 68% Q 50% 50% 62% 35%" stroke="#9A6A45" strokeWidth="2.5" strokeDasharray="6 6" fill="none" opacity="0.6" />
            {/* Trail: New World -> Sky Island */}
            <path d="M 62% 35% Q 72% 28% 82% 22%" stroke="#7897A5" strokeWidth="2.5" strokeDasharray="6 6" fill="none" opacity="0.6" />
            {/* Trail: New World -> Fishman Island */}
            <path d="M 62% 35% Q 70% 56% 78% 78%" stroke="#328A8A" strokeWidth="2.5" strokeDasharray="6 6" fill="none" opacity="0.6" />
          </svg>

          {/* Sea Name Watermarks */}
          <span className="absolute top-6 left-6 font-pirate text-xs tracking-widest text-[#9A6A45]/30 uppercase">East Blue Ocean</span>
          <span className="absolute bottom-6 left-12 font-pirate text-xs tracking-widest text-[#C85A32]/30 uppercase">Grand Line Currents</span>
          <span className="absolute top-6 right-28 font-pirate text-xs tracking-widest text-[#A83232]/30 uppercase">New World Territory</span>
          <span className="absolute bottom-6 right-8 font-pirate text-xs tracking-widest text-[#328A8A]/30 uppercase">Fish-Man Trench</span>

          {/* Interactive Island Pin Nodes on Map */}
          {ISLANDS.map((island) => {
            const isSelected = selectedIslandId === island.id;
            return (
              <button
                key={island.id}
                onClick={() => handleIslandSelect(island.id)}
                style={{ left: `${island.mapX}%`, top: `${island.mapY}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
              >
                <div className="relative flex flex-col items-center">
                  {/* Glowing Pin Ring */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md border transition-all duration-300 ${
                      isSelected
                        ? 'bg-white border-2 border-[#D6A85F] shadow-warm-lg ring-4 ring-[#D6A85F]/30 scale-110'
                        : 'bg-[#FAF6EE] border-[#EFE2CC] group-hover:bg-white group-hover:border-[#D6A85F]'
                    }`}
                  >
                    <span>{island.icon}</span>

                    {/* Active Golden Star Indicator */}
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#D6A85F] to-[#E6BD7B] text-[#24160E] text-[10px] font-bold flex items-center justify-center shadow-md border border-white animate-pulse">
                        ⭐
                      </span>
                    )}
                  </div>

                  {/* Island Name Badge */}
                  <div
                    className={`mt-1.5 px-3 py-1 rounded-full text-[11px] font-display uppercase tracking-wider font-bold shadow-sm transition-all ${
                      isSelected
                        ? 'bg-[#3D281D] text-[#FAF6EE]'
                        : 'bg-[#FFFFFF]/90 text-[#3D281D] group-hover:bg-[#3D281D] group-hover:text-[#FAF6EE]'
                    }`}
                  >
                    {island.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ===== RESPONSIVE ISLAND QUICK TABS (WORKS BEAUTIFULLY ON MOBILE & DESKTOP) ===== */}
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {ISLANDS.map((island) => {
            const isSelected = selectedIslandId === island.id;
            return (
              <button
                key={`tab-${island.id}`}
                onClick={() => handleIslandSelect(island.id)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-display text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 shadow-sm ${
                  isSelected
                    ? 'bg-[#3D281D] text-[#FAF6EE] border-2 border-[#D6A85F] shadow-md scale-105'
                    : 'bg-[#FFFFFF]/90 text-[#5A4030] border border-[#EFE2CC] hover:border-[#D6A85F] hover:bg-[#FFFFFF]'
                }`}
              >
                <span className="text-sm sm:text-base">{island.icon}</span>
                <span>{island.name}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== 2. ACTIVE ISLAND HERO DISPLAY BANNER ===== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIsland.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className={`relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r ${currentIsland.bgGradient} bg-[#FFFFFF] border-2 ${currentIsland.accentBorder} shadow-warm mb-8 overflow-hidden`}
        >
          {/* Subtle Compass & Wave Watermark */}
          <div className="absolute top-1/2 right-6 -translate-y-1/2 opacity-10 pointer-events-none text-[#3D281D]">
            <Compass size={140} strokeWidth={1} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              
              {/* Island Category Badge & Coordinates */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-wider text-white shadow-sm ${currentIsland.badgeBg}`}>
                  {currentIsland.categoryLabel}
                </span>
                <span className="text-xs font-display text-[#7A4F30] tracking-wider uppercase font-semibold flex items-center gap-1">
                  <MapPin size={13} className="text-[#D6A85F]" />
                  {currentIsland.coords}
                </span>
              </div>

              {/* Island Title */}
              <h3 className="font-pirate text-3xl sm:text-4xl text-[#3D281D] tracking-wide">
                {currentIsland.pirateName}
              </h3>

              {/* Tagline & Description */}
              <p className="font-accent italic text-base text-[#9A6A45] font-semibold">
                “{currentIsland.tagline}”
              </p>
              <p className="font-body text-xs sm:text-sm text-[#5A4030] leading-relaxed">
                {currentIsland.description}
              </p>
            </div>

            {/* Dish Count Pill */}
            <div className="flex flex-col items-start md:items-end justify-center">
              <div className="px-4 py-2.5 rounded-2xl bg-[#FFFFFF]/90 backdrop-blur-md border border-[#EFE2CC] text-center shadow-sm">
                <span className="font-pirate text-2xl text-[#3D281D] block leading-none">
                  {filteredItems.length}
                </span>
                <span className="font-display text-[10px] text-[#7A4F30] uppercase tracking-wider font-bold">
                  Treasures Found
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ===== 3. SEARCH & SORT CONTROLS BAR ===== */}
      <div className="flex flex-col sm:flex-row gap-3.5 mb-8 items-stretch sm:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A6A45]" />
          <input
            type="text"
            placeholder="Search island dishes, coffee, burgers, pasta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#FFFFFF] border border-[#EFE2CC] text-xs sm:text-sm text-[#3D281D] placeholder-[#9A6A45]/60 focus:outline-none focus:border-[#D6A85F] focus:ring-2 focus:ring-[#D6A85F]/20 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9A6A45] hover:text-[#3D281D]"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="font-display text-xs uppercase tracking-wider text-[#7A4F30] font-semibold hidden sm:inline">
            Sort:
          </span>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-[#FFFFFF] border border-[#EFE2CC] text-xs font-display text-[#3D281D] focus:outline-none focus:border-[#D6A85F] transition-all cursor-pointer shadow-sm font-semibold"
          >
            <option value="featured">✨ Captain's Featured</option>
            <option value="price-asc">฿ Price: Low to High</option>
            <option value="price-desc">฿ Price: High to Low</option>
            <option value="rating">⭐ Top Rated</option>
          </select>
        </div>
      </div>

      {/* ===== 4. FOOD ITEMS REVEAL GRID ===== */}
      <AnimatePresence mode="popLayout">
        {filteredItems.length > 0 ? (
          <motion.div
            key={`${selectedIslandId}-${searchQuery}-${sortMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 px-4 rounded-3xl bg-[#FFFFFF] border border-[#EFE2CC] max-w-md mx-auto shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#D6A85F]/30 flex items-center justify-center text-3xl mx-auto mb-4">
              🧭
            </div>
            <h4 className="font-pirate text-xl text-[#3D281D] mb-2">No Culinary Treasures Found</h4>
            <p className="font-body text-xs text-[#7A4F30] mb-4 leading-relaxed">
              No dishes match your search "{searchQuery}" on {currentIsland.name}. Try adjusting your filter or search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedIslandId('all');
              }}
              className="px-5 py-2.5 rounded-xl btn-primary text-xs uppercase tracking-wider font-bold cursor-pointer"
            >
              Reset Search & View All
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
