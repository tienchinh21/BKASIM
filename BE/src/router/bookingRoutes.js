const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/checkAuth');
const bookingController = require('../controller/bookingController');

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Tạo lịch hẹn với nhiều người
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
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
 *               - participantIds
 *             properties:
 *               bookingTitle:
 *                 type: string
 *                 example: "Họp nhóm mentor"
 *               bookingDesc:
 *                 type: string
 *                 example: "Họp để review tiến độ công việc"
 *               schedulingTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-26T10:00:00Z"
 *               participantIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example: ["uuid_user_1", "uuid_user_2"]
 *     responses:
 *       201:
 *         description: Tạo lịch hẹn thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post('/bookings', checkAuth, bookingController.createBooking);

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
