import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Compass, Coffee, Utensils, Calendar, Clock, MapPin, Heart, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { signatureMenuItems } from '../data/cafeData';
import toast from 'react-hot-toast';
import { audioFX } from '../utils/audioFX';

// Initial welcoming messages
const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Ahoy, traveler! 🏴‍☠️ Welcome to Grand Line Café! I'm your AI Café Assistant, Chopper. 🌸 How can I help your adventure today?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    quickOptions: [
      '☕ Recommend Coffee',
      '🍔 Best Burgers',
      '🍝 Main Feasts',
      '🍰 Devil Fruit Desserts',
      '📅 Book a Table',
      '⏰ Hours & Location',
    ],
  },
];

// Smart AI Knowledge Base & Intent Classifier
function generateBotReply(userText, addItem, onOpenReservation, navigate) {
  const query = userText.toLowerCase().trim();

  // 1. RECOMMEND COFFEE & DRINKS
  if (query.includes('coffee') || query.includes('drink') || query.includes('espresso') || query.includes('latte') || query.includes('tea')) {
    return {
      text: "☕ Here are our Captain's Top 3 Beverage Recommendations:\n\n1. ⚔️ **Three-Sword Espresso** (฿650 / ₹240) — Triple shot dark roast with Uji matcha art!\n2. 🌸 **Cotton Candy Sakura Latte** (฿750 / ₹290) — Creamy oat milk crowned with pink cotton candy cloud!\n3. 🍊 **Nami's Citrus Cooler** (฿600 / ₹230) — Refreshing tangerine iced tea from Cocoyasi village!",
      items: [
        signatureMenuItems.find(i => i.id === 'c-1'),
        signatureMenuItems.find(i => i.id === 'c-2'),
        signatureMenuItems.find(i => i.id === 'c-3'),
      ].filter(Boolean),
    };
  }

  // 2. RECOMMEND BURGERS & STARTERS
  if (query.includes('burger') || query.includes('starter') || query.includes('fries') || query.includes('wings') || query.includes('bite') || query.includes('bacon')) {
    return {
      text: "🍔 Here are our top savory bites & burgers straight from Sanji's galley:\n\n1. 🍖 **Meat-Lover Kraken Burger** (฿1,100 / ₹420) — Double smashed wagyu beef patties, melted cheddar & smoked bacon!\n2. 🍗 **Baratie Glazed Wings** (฿380) — Crispy wings in honey garlic sweet chili glaze!\n3. 🍟 **Thousand Sunny Loaded Fries** (฿290) — Smothered in warm cheddar & crisp bacon bits!",
      items: [
        signatureMenuItems.find(i => i.id === 'b-1'),
      ].filter(Boolean),
    };
  }

  // 3. MAIN COURSE & PASTA / PIZZA
  if (query.includes('main') || query.includes('pasta') || query.includes('pizza') || query.includes('ramen') || query.includes('curry') || query.includes('food')) {
    return {
      text: "🍝 For a hearty feast fit for an Emperor, try these favorites:\n\n1. 🦞 **Black Leg Seafood Pasta** (฿1,250 / ₹460) — Handmade squid ink tagliatelle with grilled tiger prawns & garlic butter!\n2. 🍕 **Pirate Sourdough Pizza** (฿450) — Wood-fired pizza with mozzarella & fresh basil!\n3. 🍛 **Butter Chicken & Garlic Naan** (฿420) — Creamy rich curry served with piping hot garlic naan!",
      items: [
        signatureMenuItems.find(i => i.id === 'm-1'),
        signatureMenuItems.find(i => i.id === 'm-2'),
      ].filter(Boolean),
    };
  }

  // 4. DESSERTS & SWEETS
  if (query.includes('dessert') || query.includes('sweet') || query.includes('cake') || query.includes('pastry') || query.includes('fruit')) {
    return {
      text: "🍰 Indulge in Skypiea's heavenly sweets:\n\n1. 🫐 **Devil Fruit Berry Cheesecake** (฿850 / ₹340) — Swirled wild berry cheesecake inspired by Gomu Gomu No Mi!\n2. 🍫 **Belgian Chocolate Lava Cake** (฿330) — Warm chocolate fondant with flowing molten center & gelato!\n3. 🍓 **Sakura Mille-Feuille** (฿360) — Crisp French pastry layers with vanilla bean custard!",
      items: [
        signatureMenuItems.find(i => i.id === 'd-1'),
      ].filter(Boolean),
    };
  }

  // 5. VEGETARIAN & DIETARY
  if (query.includes('veg') || query.includes('vegetarian') || query.includes('healthy') || query.includes('vegan')) {
    return {
      text: "🥗 We have wonderful vegetarian & healthy options available:\n\n• **Dawn Island Pancakes** (₹320) — Fluffy buttermilk pancakes with maple syrup!\n• **East Blue Veggie Spring Rolls** (₹250) — Crisp rolls packed with cabbage & mushrooms!\n• **Classic Margherita Pizza** (₹420) — Sourdough pizza with fresh basil & mozzarella!\n• **Fruit Bowl & Acai Smoothie** (₹280) — Fresh tropical fruits & honey!",
    };
  }

  // 6. CAFÉ HOURS & TIMINGS
  if (query.includes('hour') || query.includes('time') || query.includes('open') || query.includes('timing') || query.includes('schedule')) {
    return {
      text: "⏰ **Grand Line Café Opening Hours:**\n\n• **Monday – Sunday:** 8:00 AM – 11:00 PM (All-Day Service)\n• **Breakfast & Brunch:** 8:00 AM – 2:00 PM\n• **Lunch & Galley Feasts:** 12:00 PM – 4:00 PM\n• **Dinner & Night Specials:** 6:00 PM – 11:00 PM\n\nWe are open 365 days a year for hungry adventurers!",
    };
  }

  // 7. LOCATION, ADDRESS & CONTACT
  if (query.includes('location') || query.includes('address') || query.includes('where') || query.includes('contact') || query.includes('phone') || query.includes('park') || query.includes('wifi')) {
    return {
      text: "📍 **Café Location & Info:**\n\n• **Address:** 124 Harbor View Drive, Grand Line Pier (Seaside Promenade)\n• **Phone:** +1 (800) 555-GRAND\n• **Amenities:** Free Valet Parking 🚗, High-Speed Sea-Wi-Fi 📶, Outdoor Ocean Terrace 🌊 & Kid-Friendly Play Corner 🎈",
    };
  }

  // 8. TABLE RESERVATIONS
  if (query.includes('book') || query.includes('reserve') || query.includes('table') || query.includes('seat') || query.includes('party')) {
    return {
      text: "📅 **Table Reservations at Grand Line Café:**\n\nWe offer window garden booths, coffee bar counter seating, and private harbor dining salons! You can reserve a table online in under 60 seconds.",
      showReserveBtn: true,
    };
  }

  // 9. DEFAULT ENTHUSIASTIC PIRATE RESPONSE
  return {
    text: `⚓ That sounds like an exciting request! At Grand Line Café, we serve artisan single-origin coffee, gourmet burgers, handmade pastas, wood-fired pizzas, and Devil Fruit pastries.\n\nWould you like me to recommend a coffee ☕, suggest popular dishes 🍽️, or help you book a table 📅?`,
    quickOptions: [
      '☕ Recommend Coffee',
      '🍔 Best Burgers',
      '🍝 Main Feasts',
      '🍰 Desserts',
      '📅 Book a Table',
    ],
  };
}

export default function CafeAIChatbot({ onOpenReservation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef(null);
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping]);

  const handleToggleChat = () => {
    audioFX?.playAdventureClick?.();
    setIsOpen(prev => !prev);
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    audioFX?.playAdventureClick?.();

    // User message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Bot response after realistic thinking delay (600ms)
    setTimeout(() => {
      const replyObj = generateBotReply(text, addItem, onOpenReservation, navigate);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyObj.text,
        items: replyObj.items,
        showReserveBtn: replyObj.showReserveBtn,
        quickOptions: replyObj.quickOptions,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleAddToCart = (item) => {
    audioFX?.playAdventureClick?.();
    addItem({
      id: item.id,
      name: item.name,
      price: item.priceINR || Math.round(item.priceUSD * 75),
      image: item.image,
      category: item.category,
    });
    toast.success(`Added ${item.name} to cart!`, {
      icon: '🍽️',
      style: {
        background: '#FFFFFF',
        border: '1px solid rgba(214, 168, 95, 0.5)',
        color: '#3D281D',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(61, 40, 29, 0.12)',
      },
    });
  };

  const handleOpenReserve = () => {
    setIsOpen(false);
    if (onOpenReservation) {
      onOpenReservation();
    } else {
      navigate('/reservations');
    }
  };

  const handleResetChat = () => {
    audioFX?.playAdventureClick?.();
    setMessages(INITIAL_MESSAGES);
    toast('Chat reset', { icon: '🔄' });
  };

  return (
    <>
      {/* ===== 1. FLOATING PIRATE CAFÉ CHATBOT BUTTON (BOTTOM RIGHT) ===== */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <motion.button
          onClick={handleToggleChat}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#D6A85F] via-[#E6BD7B] to-[#9A6A45] p-0.5 shadow-warm-lg cursor-pointer flex items-center justify-center"
          aria-label="Open Grand Line Café Assistant"
        >
          {/* Avatar container */}
          <div className="w-full h-full bg-[#FAF6EE] rounded-full flex items-center justify-center overflow-hidden border-2 border-[#FFFFFF] relative">
            <img
              src="/grand_line_logo.jpg"
              alt="Grand Line AI Assistant"
              className="w-full h-full object-cover rounded-full"
            />
            {/* Online Green Pulsing Indicator */}
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#328A8A] border-2 border-white animate-pulse" />
          </div>

          {/* Unread Red Notification Badge */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C84B31] text-white text-[10px] font-bold flex items-center justify-center border border-white animate-bounce shadow-md">
              1
            </span>
          )}

          {/* Hover Tooltip Pill */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#3D281D] text-[#FAF6EE] text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
            Ask Chopper AI ☕
          </span>
        </motion.button>
      </div>

      {/* ===== 2. PARCHMENT STYLE CHATBOT WINDOW ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[390px] h-[490px] sm:h-[520px] max-h-[80vh] rounded-3xl bg-[#FAF6EE] border-2 border-[#D6A85F] shadow-warm-lg flex flex-col overflow-hidden select-none"
          >
            {/* Parchment Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#9A6A45_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            {/* CHAT HEADER BAR */}
            <div className="relative z-10 p-4 bg-gradient-to-r from-[#FAF6EE] via-[#EFE2CC] to-[#FAF6EE] border-b border-[#EFE2CC] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#D6A85F] to-[#E6BD7B] shadow-sm overflow-hidden">
                  <img
                    src="/grand_line_logo.jpg"
                    alt="Grand Line Café Assistant"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#328A8A] border border-white" />
                </div>
                <div>
                  <h4 className="font-pirate text-lg text-[#3D281D] leading-none flex items-center gap-1.5">
                    Grand Line Assistant
                    <Sparkles size={14} className="text-[#D6A85F]" />
                  </h4>
                  <p className="font-display text-[10px] text-[#9A6A45] tracking-wider uppercase font-bold mt-0.5">
                    Chopper & Sanji AI ☕🌸
                  </p>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Chat"
                  className="p-1.5 rounded-lg text-[#9A6A45] hover:text-[#3D281D] hover:bg-[#EFE2CC]/60 transition-colors cursor-pointer"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={handleToggleChat}
                  title="Close Chat"
                  className="p-1.5 rounded-lg text-[#9A6A45] hover:text-[#3D281D] hover:bg-[#EFE2CC]/60 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* CHAT MESSAGES BODY */}
            <div className="relative z-10 flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm font-body ${
                      msg.sender === 'user'
                        ? 'bg-[#3D281D] text-[#FAF6EE] rounded-br-none'
                        : 'bg-[#FFFFFF] text-[#3D281D] border border-[#EFE2CC] rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Interactive Recommended Food Cards */}
                    {msg.items && msg.items.length > 0 && (
                      <div className="mt-3 space-y-2 pt-2 border-t border-[#EFE2CC]">
                        {msg.items.map((item) => (
                          <div
                            key={item.id}
                            className="p-2 rounded-xl bg-[#FAF6EE] border border-[#EFE2CC] flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="overflow-hidden">
                                <p className="font-pirate text-xs text-[#3D281D] truncate">{item.name}</p>
                                <p className="font-display text-[10px] text-[#9A6A45] font-bold">
                                  ฿ {item.priceINR || Math.round(item.priceUSD * 75)}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleAddToCart(item)}
                              className="px-2.5 py-1.5 rounded-lg btn-primary text-[10px] font-display uppercase font-bold tracking-wider flex-shrink-0 shadow-xs cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Button: Book Table */}
                    {msg.showReserveBtn && (
                      <div className="mt-3 pt-2 border-t border-[#EFE2CC]">
                        <button
                          onClick={handleOpenReserve}
                          className="w-full py-2.5 rounded-xl btn-primary text-xs font-display uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                          <Calendar size={14} />
                          <span>Reserve Table Now 📅</span>
                        </button>
                      </div>
                    )}

                    {/* Time Stamp */}
                    <span className="block text-[9px] opacity-60 text-right mt-1 font-display">
                      {msg.time}
                    </span>
                  </div>

                  {/* Quick Action Suggestion Chips */}
                  {msg.quickOptions && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                      {msg.quickOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSendMessage(opt)}
                          className="px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D6A85F]/50 text-[#7A4F30] hover:text-[#3D281D] hover:border-[#D6A85F] hover:bg-[#FAF6EE] text-xs font-display font-semibold transition-all cursor-pointer shadow-xs"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#EFE2CC] text-[#9A6A45] text-xs font-display font-semibold w-max shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F] animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px] uppercase tracking-wider text-[#7A4F30]">Chopper is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* CHAT INPUT FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative z-10 p-3 bg-[#FFFFFF] border-t border-[#EFE2CC] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about coffee, food, hours..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF6EE] border border-[#EFE2CC] text-xs sm:text-sm text-[#3D281D] placeholder-[#9A6A45]/60 focus:outline-none focus:border-[#D6A85F] focus:ring-1 focus:ring-[#D6A85F]/30 transition-all font-body"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-full btn-primary flex items-center justify-center text-[#24160E] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm flex-shrink-0 transition-transform active:scale-95"
                title="Send Message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
