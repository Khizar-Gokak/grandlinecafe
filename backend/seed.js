import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './models/MenuItem.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/grandline_cafe';

const initialMenuItems = [
  // ===== MEAT =====
  {
    id: 1,
    name: "Captain's Giant Meat Platter",
    category: "Meat",
    description: "A legendary rack of slow-roasted ribs glazed with our secret Devil Fruit BBQ sauce. Served with grilled corn, pickled vegetables, and the pride of the Grand Line.",
    price: 899,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    featured: true,
    badge: "Best Seller",
    prepTime: "25 min",
  },
  {
    id: 2,
    name: "Luffy's Meat on the Bone",
    category: "Meat",
    description: "A juicy, charcoal-grilled leg of lamb marinated overnight in smoky spices. The Captain's eternal favorite — served just as he likes it.",
    price: 749,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80",
    featured: false,
    badge: null,
    prepTime: "20 min",
  },
  {
    id: 3,
    name: "Smoked Devil Fruit Wings",
    category: "Meat",
    description: "Crispy chicken wings smoked to perfection, served with three legendary dipping sauces: Gold Roger's Honey Mustard, Sea King Hot Sauce & Pineapple Chili.",
    price: 549,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80",
    featured: false,
    badge: "Spicy",
    prepTime: "18 min",
  },

  // ===== RAMEN =====
  {
    id: 4,
    name: "Sanji's Special Ramen",
    category: "Ramen",
    description: "A rich tonkotsu broth perfected over three years of training. Topped with chashu pork belly, soft-boiled egg, nori, bamboo shoots, and house tare.",
    price: 449,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80",
    featured: true,
    badge: "Chef's Special",
    prepTime: "15 min",
  },
  {
    id: 5,
    name: "Storm-Spiced Miso Ramen",
    category: "Ramen",
    description: "A turbulent miso broth with the heat of a thousand storms. Loaded with crispy tofu, corn, butter, bok choy, and a swirl of chili oil.",
    price: 399,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=600&q=80",
    featured: false,
    badge: null,
    prepTime: "12 min",
  },
  {
    id: 6,
    name: "Sea King Seafood Ramen",
    category: "Ramen",
    description: "Clear dashi broth with premium seafood — tiger prawns, scallops, and calamari — over thick noodles with yuzu and crispy garlic.",
    price: 529,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=600&q=80",
    featured: false,
    badge: "Fan Favourite",
    prepTime: "17 min",
  },

  // ===== RICE & MEALS =====
  {
    id: 7,
    name: "Thousand Sunny Biryani",
    category: "Rice & Meals",
    description: "Fragrant basmati rice layered with slow-cooked spiced chicken, fried onions, saffron milk, and served with raita and a golden treasure of achar.",
    price: 479,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    featured: false,
    badge: null,
    prepTime: "30 min",
  },
  {
    id: 8,
    name: "Navigator's Fried Rice",
    category: "Rice & Meals",
    description: "Nami's strategic combination of wok-tossed jasmine rice with shrimp, egg, vegetables, and a tangerine-soy glaze that makes every bite a calculated pleasure.",
    price: 349,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    featured: false,
    badge: null,
    prepTime: "10 min",
  },

  // ===== SUSHI =====
  {
    id: 9,
    name: "Zoro's Three-Sword Sushi",
    category: "Sushi",
    description: "Three rolls presented in the style of Santoryu — tuna tataki, salmon avocado, and prawn tempura — with wasabi, ginger, and premium soy sauce.",
    price: 699,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1617196034238-26a9e2c34b4d?w=600&q=80",
    featured: true,
    badge: "Premium",
    prepTime: "20 min",
  },
  {
    id: 10,
    name: "Robin's Demon Flower Platter",
    category: "Sushi",
    description: "An archaeologist's elegant arrangement of dragon rolls, nigiri, and sashimi formed into flower shapes. As beautiful as it is mysterious.",
    price: 799,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80",
    featured: false,
    badge: "Limited",
    prepTime: "25 min",
  },

  // ===== DESSERTS =====
  {
    id: 11,
    name: "Nami's Tangerine Tart",
    category: "Desserts",
    description: "A French-style citrus tart with silky tangerine curd in a buttery shortcrust shell, topped with candied orange zest and gold leaf. Stolen from Cocoyashi Village itself.",
    price: 299,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&q=80",
    featured: true,
    badge: "Fan Favourite",
    prepTime: "5 min",
  },
  {
    id: 12,
    name: "Chopper's Cotton Candy",
    category: "Desserts",
    description: "A carnival of flavours — cloud-like cotton candy in pink and blue spun around a waffle cone with rainbow sprinkles and a Chopper-hat chocolate topping.",
    price: 199,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80",
    featured: true,
    badge: "Kids Love It",
    prepTime: "5 min",
  },
  {
    id: 13,
    name: "Treasure Chest Brownie Box",
    category: "Desserts",
    description: "Six fudgy dark chocolate brownies dusted with edible gold, served in a wooden chest box. Each brownie hides a caramel treasure at its heart.",
    price: 379,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
    featured: false,
    badge: null,
    prepTime: "5 min",
  },

  // ===== DRINKS =====
  {
    id: 14,
    name: "Thousand Sunny Mocktail",
    category: "Drinks",
    description: "A refreshing ocean-blue layered mocktail with blue curacao syrup, lemonade, coconut cream, and a sunset orange passion-fruit float. Served with a ship-wheel garnish.",
    price: 249,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
    featured: true,
    badge: "Most Ordered",
    prepTime: "5 min",
  },
  {
    id: 15,
    name: "Devil Fruit Punch",
    category: "Drinks",
    description: "A mysterious, colour-changing punch that shifts from deep purple to gold when you add the secret fizz tablet. Passion fruit, dragon fruit and lychee base.",
    price: 229,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1594156596782-656c93e4d504?w=600&q=80",
    featured: false,
    badge: "Magical",
    prepTime: "5 min",
  },
  {
    id: 16,
    name: "Black Blade Cold Brew",
    category: "Drinks",
    description: "24-hour cold-steeped single-origin coffee served over hand-chipped ice with a swirl of oat milk and a sprig of star anise. Dark, bold, and unwavering — like Zoro.",
    price: 279,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    featured: false,
    badge: null,
    prepTime: "3 min",
  },
  {
    id: 17,
    name: "Grand Line Mango Lassi",
    category: "Drinks",
    description: "Thick, creamy Alphonso mango blended with chilled yogurt, a pinch of cardamom and saffron strands. The official drink of navigating paradise.",
    price: 199,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80",
    featured: false,
    badge: null,
    prepTime: "5 min",
  },
];

async function seedDatabase() {
  try {
    console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB.');

    console.log('🧹 Clearing existing menu items...');
    await MenuItem.deleteMany({});

    console.log(`🌱 Inserting ${initialMenuItems.length} menu items...`);
    const inserted = await MenuItem.insertMany(initialMenuItems);

    console.log(`🎉 Successfully seeded ${inserted.length} menu items into MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
