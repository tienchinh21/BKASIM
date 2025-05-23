const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { checkAuth } = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/checkAdmin');
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User
 *     summary: Lấy danh sách người dùng
 *     parameters:
 *       - in: query
 *         name: role
 *         description: Vai trò của người dùng
 *       - in: query
 *         name: status
 *         description: Trạng thái của người dùng
 *       - in: query
 *         name: name
 *         description: Tên của người dùng
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *       500:
 *         description: Lỗi server
 */

router.get('/users', checkAuth, userController.getAllUsersCtr);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - User
 *     summary: Lấy thông tin người dùng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.get('/users/:userId', checkAuth, userController.getUserByIdCtr);


/**
 * @swagger
 * /users/approve/{userId}:
 *   put:
 *     tags:
 *       - User
 *     summary: Duyệt tài khoản người dùng
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng cần duyệt
 *     responses:
 *       200:
 *         description: Duyệt tài khoản thành công
 *       400:
 *         description: Tài khoản không ở trạng thái chờ duyệt
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi server
 */

router.put('/users/approve/:userId', userController.approveUser);


/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags:
 *       - User
 *     summary: Cập nhật thông tin người dùng
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID của người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Thông tin người dùng đã được cập nhật
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.put('/users/:userId', checkAdmin, userController.updateUserCtr);


/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Xóa người dùng
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Người dùng đã được xóa
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.delete('/users/:userId', userController.deleteUserCtr);

module.exports = router;
