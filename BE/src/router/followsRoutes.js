const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/checkAuth');
const followController = require('../controller/followController');

/**
 * @swagger
 * /follows/{userId}:
 *   post:
 *     summary: Gửi yêu cầu follow tới người dùng khác
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID người muốn follow
 *     responses:
 *       201:
 *         description: Gửi follow thành công
 *       400:
 *         description: Đã gửi trước đó hoặc lỗi
 */
router.post('/follows/:userId', checkAuth, followController.sendFollowRequest);

/**
 * @swagger
 * /follows/received:
 *   get:
 *     summary: Lấy danh sách người đã follow mình (chờ xác nhận)
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách follow đang chờ xác nhận
 */
router.get('/follows/received', checkAuth, followController.getReceivedFollows);

/**
 * @swagger
 * /follows/accept/{followerId}:
 *   post:
 *     summary: Xác nhận follow từ người khác
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID người đã gửi follow
 *     responses:
 *       200:
 *         description: Đã xác nhận follow
 *       404:
 *         description: Không tìm thấy yêu cầu follow
 */
router.post('/follows/accept/:followerId', checkAuth, followController.acceptFollow);


/**
 * @swagger
 * /follows/sent:
 *   get:
 *     summary: Lấy danh sách người mình đã gửi follow
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách follow mình đã gửi
 */
router.get('/follows/sent', checkAuth, followController.getSentFollows);


module.exports = router;
