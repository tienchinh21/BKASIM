const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../../middleware/checkAdmin');
const adminStatsController = require('../../controller/adminController/adminStatsController');


/**
 * @swagger
 * /admin/stats/chart-data:
 *   get:
 *     tags: [Admin / Stats]
 *     summary: Trả về số lượng người dùng và lịch hẹn theo tháng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: year
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         description: Năm cần thống kê
 *     responses:
 *       200:
 *         description: Dữ liệu phân tách theo tháng
 */
router.get('/stats/chart-data', checkAdmin, adminStatsController.getChartDataCtrl);

/**
 * @swagger
 * /admin/stats/user-growth-compare:
 *   get:
 *     tags: [Admin / Stats]
 *     summary: So sánh số lượng người dùng giữa tháng hiện tại và tháng trước
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về số lượng và tỷ lệ tăng/giảm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentMonth:
 *                   type: integer
 *                   example: 75
 *                 previousMonth:
 *                   type: integer
 *                   example: 50
 *                 growthRate:
 *                   type: string
 *                   example: "+50%"
 */
router.get('/stats/user-growth-compare', checkAdmin, adminStatsController.getUserGrowthCompareCtrl);

/**
 * @swagger
 * /admin/stats/booking-growth-compare:
 *   get:
 *     tags: [Admin / Stats]
 *     summary: So sánh số lượng lịch hẹn giữa tháng hiện tại và tháng trước
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về số lượng và tỷ lệ tăng/giảm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentMonth:
 *                   type: integer
 *                   example: 75
 *                 previousMonth:
 *                   type: integer
 *                   example: 50
 *                 growthRate:
 *                   type: string
 *                   example: "+50%"
 */
router.get('/stats/booking-growth-compare', checkAdmin, adminStatsController.getBookingGrowthCompareCtrl);

module.exports = router;
