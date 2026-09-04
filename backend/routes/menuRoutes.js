import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// GET /api/menu - Get all menu items with optional category and search filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await MenuItem.find(filter).sort({ id: 1, createdAt: 1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/menu/:id - Get single menu item by ID or numeric id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let item = null;

    if (!isNaN(id)) {
      item = await MenuItem.findOne({ id: Number(id) });
    }
    if (!item && id.match(/^[0-9a-fA-F]{24}$/)) {
      item = await MenuItem.findById(id);
    }

    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/menu - Add a new menu item
router.post('/', async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
