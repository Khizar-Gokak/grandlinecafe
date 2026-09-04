import express from 'express';
import Order from '../models/Order.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/orders - Place a new order
router.post('/', requireAuth, async (req, res) => {
  try {
    const { orderId, customer, deliveryType, paymentMethod, items, subtotal, tax, serviceCharge, total } = req.body;

    if (!customer?.name || !customer?.email || !customer?.phone) {
      return res.status(400).json({ success: false, message: 'Customer details are incomplete' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
    }

    const generatedId = orderId || ('GL-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4));

    const order = await Order.create({
      orderId: generatedId,
      customer,
      deliveryType: deliveryType || 'pickup',
      paymentMethod: paymentMethod || 'upi',
      items,
      subtotal,
      tax: tax || 0,
      serviceCharge: serviceCharge || 0,
      total,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Order submitted successfully! Pending admin approval.',
      data: order,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/orders - Get all orders (recent first)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/user/:email - Get user orders
router.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ 'customer.email': email.toLowerCase() }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/orders/:id/status - Update order status (Admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'preparing', 'out_for_delivery', 'completed', 'cancelled', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid order status' });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: `Order status updated to ${status}`, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/:orderId - Look up single order by orderId
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
