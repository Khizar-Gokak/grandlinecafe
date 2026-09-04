import express from 'express';
import Reservation from '../models/Reservation.js';
import Order from '../models/Order.js';

const router = express.Router();

// GET /api/admin/overview - Get reservations and orders summary
router.get('/overview', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 }).limit(100);
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100);

    const reservationCount = await Reservation.countDocuments();
    const orderCount = await Order.countDocuments();

    res.json({
      success: true,
      data: {
        counts: {
          reservations: reservationCount,
          orders: orderCount,
        },
        reservations,
        orders,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;