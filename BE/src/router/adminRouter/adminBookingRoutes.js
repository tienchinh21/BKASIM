
const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../../middleware/checkAdmin');
const adminBookingCtrl = require('../../controller/adminController/adminBookingController');

/**
 * @swagger
 * tags:
 *   - name: AdminBooking
 *     description: API quản lý lịch hẹn dành cho Admin
 */

/**
 * @swagger
 * /admin/bookings:
 *   get:
 *     summary: Lấy danh sách tất cả lịch hẹn (Admin)
 *     tags: [AdminBooking]
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
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách lịch hẹn
 *       401:
 *         description: Không có quyền truy cập
 */
router.get('/bookings', checkAdmin, adminBookingCtrl.getAllBookingsCtrl);

/**
 * @swagger
 * /admin/bookings/{id}:
 *   get:
 *     summary: Lấy chi tiết lịch hẹn (Admin)
 *     tags: [AdminBooking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của lịch hẹn
 *     responses:
 *       200:
 *         description: Chi tiết lịch hẹn
 *       404:
 *         description: Không tìm thấy lịch hẹn
*/
router.get('/bookings/:id', checkAdmin, adminBookingCtrl.getBookingDetailCtrl);

/**
 * @swagger
 * admin/bookings/{id}/flag:
 *   patch:
 *     summary: Gắn cờ lịch hẹn (Admin)
 *     tags: [AdminBooking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của lịch hẹn
 *     responses:
 *       200:
 *         description: Gắn cờ thành công
 *       404:
 *         description: Không tìm thấy lịch hẹn
 */
router.patch('/bookings/:id/flag', checkAdmin, adminBookingCtrl.flagBookingCtrl);

/**
 * @swagger
 * admin/bookings/{id}:
 *   patch:
 *     summary: Cập nhật thông tin lịch hẹn (Admin)
 *     tags: [AdminBooking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingTitle:
 *                 type: string
 *               bookingDesc:
 *                 type: string
 *               schedulingTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy lịch hẹn
 */
router.patch('/bookings/:id', checkAdmin, adminBookingCtrl.updateBookingCtrl);

/**
 * @swagger
 * admin/bookings/{id}:
 *   delete:
 *     summary: Xoá mềm lịch hẹn (Admin)
 *     tags: [AdminBooking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID lịch hẹn cần xoá
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       404:
 *         description: Không tìm thấy lịch hẹn
 */
router.delete('/bookings/:id', checkAdmin, adminBookingCtrl.softDeleteBookingCtrl);

module.exports = router;
