import { Heart, Star, Plus, Clock, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import toast from 'react-hot-toast';
import { audioFX } from '../utils/audioFX';

export default function FoodCard({ item, compact = false }) {
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [added, setAdded] = useState(false);
  const favorited = isFavorite(item.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    audioFX?.playAdventureClick?.();
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);

    toast.success(`${item.name} added to cart!`, {
      icon: '🍽️',
      style: {
        background: '#FFFFFF',
        border: '1px solid rgba(214, 168, 95, 0.4)',
        color: '#3D281D',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(61, 40, 29, 0.1)',
      },
    });
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(item.id);
    toast(favorited ? 'Removed from favorites' : 'Saved to favorites ❤️', {
      icon: favorited ? '🤍' : '❤️',
      style: {
        background: '#FFFFFF',
        border: '1px solid rgba(214, 168, 95, 0.4)',
        color: '#3D281D',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(61, 40, 29, 0.1)',
      },
    });
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating || 5);
    return (
      <span className="inline-flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={11}
            className={i < full ? 'text-[#D6A85F] fill-[#D6A85F]' : 'text-[#EFE2CC]'}
          />
        ))}
        <span className="ml-1 text-xs text-[#7A4F30] font-body font-semibold">{rating}</span>
      </span>
    );
  };

  return (
    <div className="food-card rounded-3xl overflow-hidden group relative flex flex-col justify-between bg-white border border-[#EFE2CC] shadow-warm hover:shadow-warm-hover transition-all duration-300">
      <div>
        {/* Image */}
        <div className={`relative overflow-hidden bg-[#FAF6EE] ${compact ? 'h-40' : 'h-48 sm:h-52'}`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-[0.98] group-hover:brightness-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80`;
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Badge */}
          {item.badge && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider bg-[#FFFFFF]/95 backdrop-blur-md text-[#9A6A45] border border-[#EFE2CC] shadow-sm">
                {item.badge}
              </span>
            </div>
          )}

          {/* Category Pill if no badge */}
          {!item.badge && item.category && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-display font-semibold uppercase tracking-wider bg-[#FFFFFF]/90 backdrop-blur-md text-[#7A4F30] border border-[#EFE2CC] shadow-sm">
                {item.category}
              </span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
              favorited
                ? 'bg-red-50 text-red-500 border border-red-200'
                : 'bg-white/90 text-[#7A4F30] hover:bg-white hover:text-red-500 border border-[#EFE2CC]'
            }`}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={14} className={favorited ? 'fill-current' : ''} />
          </button>

          {/* Price overlay on image */}
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-[#FFFFFF]/95 backdrop-blur-md border border-[#EFE2CC] shadow-sm">
            <span className="font-pirate text-base text-[#3D281D] font-bold">
              ₹{item.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Title */}
          <h3 className="font-pirate text-base sm:text-lg text-[#3D281D] leading-snug group-hover:text-[#9A6A45] transition-colors line-clamp-1 mb-1.5">
            {item.name}
          </h3>

          {/* Stars + prep time */}
          <div className="flex items-center justify-between mb-3">
            {renderStars(item.rating)}
            {item.prepTime && (
              <span className="flex items-center gap-1 text-[11px] text-[#7A4F30] font-body">
                <Clock size={11} className="text-[#9A6A45]" />
                {item.prepTime}
              </span>
            )}
          </div>

          {!compact && (
            <p className="font-body text-xs text-[#7A4F30] leading-relaxed mb-4 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-2xl text-xs sm:text-sm font-display uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-sm ${
            added
              ? 'bg-[#88B8A1] text-white'
              : 'btn-primary'
          }`}
        >
          {added ? (
            <>
              <Check size={14} />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus size={14} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
