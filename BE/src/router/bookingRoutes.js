const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/checkAuth');
const bookingController = require('../controller/bookingController');

/**
 * @swagger
 * /booking/{receiverId}:
 *   post:
 *     summary: Tạo cuộc hẹn với người dùng khác (mentor hoặc mentee)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: receiverId
 *         required: true
 *         description: ID của người được hẹn
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingTitle
 *               - bookingDesc
 *               - schedulingTime
 *             properties:
 *               bookingTitle:
 *                 type: string
 *               bookingDesc:
 *                 type: string
 *               schedulingTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Tạo lịch thành công
 *       400:
 *         description: Không đủ điều kiện đặt lịch
 */
router.post('/booking/:receiverId', checkAuth, bookingController.createBooking);

/**
 * @swagger
 * /booking/detail/{id}:
 *   get:
 *     summary: Xem chi tiết một lịch hẹn
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID lịch hẹn
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết lịch hẹn
 *       404:
 *         description: Không tìm thấy
 */
router.get('/booking/detail/:id', checkAuth, bookingController.getBookingDetail);

/**
 * @swagger
 * /booking/history:
 *   get:
 *     summary: Xem lịch sử các cuộc hẹn của tôi
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách lịch sử
 */
router.get('/booking/history', checkAuth, bookingController.getMyBookingHistory);

module.exports = router;
