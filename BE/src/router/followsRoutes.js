const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/checkAuth');
const followController = require('../controller/followController');

/**
 * @swagger
 * tags:
 *   name: Follow
 */

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetRoleId:
 *                 type: string
 *                 description: ID vai trò của người được follow
 *               followerRoleId:
 *                 type: string
 *                 description: ID vai trò của người gửi follow
 *     responses:
 *       201:
 *         description: Gửi follow thành công
 *       400:
 *         description: Đã gửi trước đó hoặc lỗi
 *       404:
 *         description: Người dùng không tồn tại
 */
router.post('/follows/:userId', checkAuth, followController.sendFollowRequestCtrl);

/**
 * @swagger
 * /follows/received:
 *   get:
 *     summary: Lấy danh sách yêu cầu follow đang chờ xác nhận
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Số lượng bản ghi (mặc định: 20)"
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: "Bỏ qua bao nhiêu bản ghi (mặc định: 0)"
 *     responses:
 *       200:
 *         description: Danh sách người gửi follow
 */
router.get('/follows/received', checkAuth, followController.getReceivedFollowsCtrl);

/**
 * @swagger
 * /follows/accept/{followerId}:
 *   post:
 *     summary: Xác nhận yêu cầu follow
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
router.post('/follows/accept/:followerId', checkAuth, followController.acceptFollowCtrl);

/**
 * @swagger
 * /follows/reject/{followerId}:
 *   post:
 *     summary: Từ chối yêu cầu follow
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
 *         description: Đã từ chối follow
 *       404:
 *         description: Không tìm thấy yêu cầu follow
 */
router.post('/follows/reject/:followerId', checkAuth, followController.rejectFollowCtrl);

/**
 * @swagger
 * /follows/unfollow/{followingId}:
 *   post:
 *     summary: Hủy follow người khác
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID người đang được follow
 *     responses:
 *       200:
 *         description: Đã hủy follow
 *       404:
 *         description: Không tìm thấy mối quan hệ follow
 */
router.post('/follows/unfollow/:followingId', checkAuth, followController.unfollowCtrl);

/**
 * @swagger
 * /follows/sent:
 *   get:
 *     summary: Lấy danh sách người mình đã gửi follow
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Số lượng bản ghi (mặc định: 20)"
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: "Bỏ qua bao nhiêu bản ghi (mặc định: 0)"
 *     responses:
 *       200:
 *         description: Danh sách người đã gửi follow
 */
router.get('/follows/sent', checkAuth, followController.getSentFollowsCtrl);

/**
 * @swagger
 * /follows/followers:
 *   get:
 *     summary: Lấy danh sách người đang follow mình (đã xác nhận)
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Số lượng bản ghi (mặc định: 20)"
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: "Bỏ qua bao nhiêu bản ghi (mặc định: 0)"
 *     responses:
 *       200:
 *         description: Danh sách followers
 */
router.get('/follows/followers', checkAuth, followController.getFollowersCtrl);

/**
 * @swagger
 * /follows/following:
 *   get:
 *     summary: Lấy danh sách người mình đang follow
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Số lượng bản ghi (mặc định: 20)"
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description:" Bỏ qua bao nhiêu bản ghi (mặc định: 0)"
 *     responses:
 *       200:
 *         description: Danh sách following
 */
router.get('/follows/following', checkAuth, followController.getFollowingCtrl);

module.exports = router;
