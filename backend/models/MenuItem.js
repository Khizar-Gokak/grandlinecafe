import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: [true, 'Dish name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Meat', 'Ramen', 'Rice & Meals', 'Sushi', 'Desserts', 'Drinks', 'Other'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      default: null,
    },
    prepTime: {
      type: String,
      default: '15 min',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for id mapped to _id if numeric id is not present
menuItemSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id;
    return ret;
  },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;
