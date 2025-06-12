const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../../middleware/checkAdmin');
const summaryController = require('../../controller/adminController/adminSummaryController');

/**
 * @swagger
 * /admin/summary/latest-users:
 *   get:
 *     tags: [Admin / Summary]
 *     summary: Lấy danh sách người dùng mới nhất
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách người dùng
 */
router.get('/summary/latest-users', checkAdmin, summaryController.getLatestUsersCtrl);

/**
 * @swagger
 * /admin/summary/latest-bookings:
 *   get:
 *     tags: [Admin / Summary]
 *     summary: Lấy danh sách lịch hẹn mới nhất
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách lịch hẹn
 */
router.get('/summary/latest-bookings', checkAdmin, summaryController.getLatestBookingsCtrl);

module.exports = router;
