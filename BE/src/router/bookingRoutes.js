const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/checkAuth');
const bookingController = require('../controller/bookingController');

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Tạo lịch hẹn với nhiều người và vai trò
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
 *               - participantInfo
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
 *               participantInfo:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - userId
 *                     - role
 *                   properties:
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       example: "uuid_user_1"
 *                     role:
 *                       type: string
 *                       example: "mentee"
 *                       description: Vai trò trong lịch hẹn (mentor / mentee)
 *     responses:
 *       201:
 *         description: Tạo lịch hẹn thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post('/bookings', checkAuth, bookingController.createBookingCtrl);

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
router.get('/booking/detail/:id', checkAuth, bookingController.getBookingDetailCtrl);

/**
 * @swagger
 * /booking/history:
 *   get:
 *     summary: Xem lịch sử các cuộc hẹn của tôi
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, cancelled, rejected, completed, flagged_by_admin]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Danh sách lịch sử có phân trang
 */
router.get('/booking/history', checkAuth, bookingController.getMyBookingHistoryCtrl);

/**
 * @swagger
 * /booking/{id}/status:
 *   patch:
 *     summary: Cập nhật trạng thái lịch hẹn
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID lịch hẹn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newStatus:
 *                 type: string
 *                 enum: [confirmed, rejected, cancelled, completed, flagged_by_admin]
 *                 example: completed
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *       400:
 *         description: Trạng thái không hợp lệ hoặc không có quyền
 *       404:
 *         description: Không tìm thấy lịch hẹn
 *       500:
 *         description: Lỗi server
 */
router.patch('/booking/:id/status', checkAuth, bookingController.updateBookingStatusCtrl);

module.exports = router;
