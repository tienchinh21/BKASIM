const express = require('express');
const router = express.Router();
const bookingAdminController = require('../controller/bookingAdminController');
const { checkAdmin } = require('../middleware/checkAdmin');

router.use(checkAdmin);

/**
 * @swagger
 * tags:
 *   name: Admin / Bookings
 *   description: Quản lý lịch hẹn từ phía admin
 */

/**
 * @swagger
 * /admin/bookings:
 *   get:
 *     tags: [Admin / Bookings]
 *     summary: Lấy danh sách tất cả lịch hẹn (phân trang, lọc)
 *     parameters:
 *       - in: query
 *         name: status
 *         description: "Trạng thái lịch hẹn"
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: "Trang hiện tại"
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         description: "Số lượng bản ghi trên mỗi trang"
 *         schema:
 *           type: integer
 *         default: 10
 */

router.get('/bookings', checkAdmin, bookingAdminController.getAllBookingsAdminCtrl);

/**
 * @swagger
 * /admin/bookings/{id}/flag:
 *   patch:
 *     tags: [Admin / Bookings]
 *     summary: Gắn cờ lịch hẹn
 */
router.patch('/bookings/:id/flag', checkAdmin, bookingAdminController.flagBookingAdminCtrl);

/**
 * @swagger
 * /admin/bookings/{id}:
 *   delete:
 *     tags: [Admin / Bookings]
 *     summary: Xóa lịch hẹn
 */
router.delete('/bookings/:id', checkAdmin, bookingAdminController.deleteBookingAdminCtrl);

module.exports = router;
