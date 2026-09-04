import express from 'express';
import Reservation from '../models/Reservation.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/reservations - Book a new reservation
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, requests } = req.body;

    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ success: false, message: 'All required reservation fields must be provided' });
    }

    const reservation = await Reservation.create({
      name,
      email,
      phone,
      date,
      time,
      guests: guests || '2',
      requests: requests || '',
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Reservation submitted successfully! Pending admin approval.',
      data: reservation,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/reservations - List reservations (sorted by date/time)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, count: reservations.length, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reservations/user/:email - List user reservations
router.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const reservations = await Reservation.find({ email: email.toLowerCase() }).sort({ createdAt: -1 });
    res.json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/reservations/:id/status - Update status (Admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'rejected', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid reservation status' });
    }

    const reservation = await Reservation.findByIdAndUpdate(id, { status }, { new: true });
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    res.json({ success: true, message: `Reservation status updated to ${status}`, data: reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
