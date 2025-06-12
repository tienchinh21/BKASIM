const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { checkAuth } = require('../middleware/checkAuth');
const { checkAdmin } = require('../middleware/checkAdmin');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User
 *     summary: Lấy danh sách người dùng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: "Vai trò của người dùng (ví dụ: mentor, mentee)"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: "Trạng thái của người dùng (approved, pending, rejected)"
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: "Tên người dùng cần tìm (dùng cho tìm kiếm)"
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: "ID người dùng hiện tại (để trả về followStatus nếu có)"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Trang hiện tại (mặc định: 1)"
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: "Số lượng người dùng mỗi trang (mặc định: 10)"
 *     responses:
 *       200:
 *         description: "Danh sách người dùng"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 42
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       avatar:
 *                         type: string
 *                       status:
 *                         type: string
 *                       followStatus:
 *                         type: string
 *                         nullable: true
 *                         description: "Trạng thái follow với user hiện tại (null, pending, confirmed)"
 *       500:
 *         description: "Lỗi server"
 */

router.get('/users', checkAuth, userController.getAllUsersCtrl);

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
router.get('/users/:userId', checkAuth, userController.getUserByIdCtrl);


/**
 * @swagger
 * /users/approve/{userId}:
 *   put:
 *     tags:
 *       - User
 *     summary: Duyệt tài khoản người dùng
 *     security:
 *       - bearerAuth: []
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

router.put('/users/approve/:userId', checkAdmin, userController.approveUser);


/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags:
 *       - User
 *     summary: Cập nhật thông tin người dùng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID của người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               roleIds:
 *                 type: string
 *                 example: '["cffccf1f-ee65-41d4-b8a5-bcf76c74500d"]'
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *
 *     responses:
 *       200:
 *         description: Thông tin người dùng đã được cập nhật
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.put('/users/:userId', checkAdmin, upload.single('avatar'), userController.updateUserCtrl);


/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Xóa người dùng
 *     security:
 *       - bearerAuth: []
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
router.delete('/users/:userId', checkAdmin, userController.deleteUserCtrl);


/**
 * @swagger
 * /me:
 *   get:
 *     tags:
 *       - User
 *     summary: Lấy thông tin người dùng hiện tại
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin người dùng hiện tại
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.get('/me', checkAuth, userController.getMyProfileCtrl);

/**
 * @swagger
 * /users/{id}/following:
 *   get:
 *     tags:
 *       - User
 *     summary: Lấy danh sách người dùng mà user đang theo dõi
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của user cần xem
 *     responses:
 *       200:
 *         description: Danh sách following
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/users/:id/following', checkAdmin, userController.getUserFollowingCtrl);

/**
 * @swagger
 * /users/{id}/bookings:
 *   get:
 *     tags:
 *       - User
 *     summary: Lấy danh sách booking của user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của user cần xem
 *     responses:
 *       200:
 *         description: Danh sách booking
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/users/:id/bookings', checkAdmin, userController.getUserBookingsCtrl);

module.exports = router;
