const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../../middleware/checkAdmin');
const adminUserCMSCtrl = require('../../controller/adminController/adminUserCMSController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng (Admin)
 *     tags: [Admin / UserCMS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *       401:
 *         description: Không có quyền truy cập
 */
router.get('/users', checkAdmin, adminUserCMSCtrl.getAllUsersCtrl);

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Lấy chi tiết người dùng (Admin)
 *     tags: [Admin / UserCMS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Chi tiết người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/users/:id', checkAdmin, adminUserCMSCtrl.getUserDetailCtrl);

/**
 * @swagger
 * /admin/users/{id}:
 *   patch:
 *     summary: Cập nhật thông tin người dùng (Admin)
 *     tags: [Admin / UserCMS]
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               roleId:
 *                 type: string
 *                 enum: [admin]
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.patch('/users/:id', checkAdmin, upload.single('avatar'), adminUserCMSCtrl.updateUserCtrl);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Xoá mềm người dùng (Admin)
 *     tags: [Admin / UserCMS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID người dùng cần xoá
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.delete('/users/:id', checkAdmin, adminUserCMSCtrl.softDeleteUserCtrl);

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Tạo người dùng mới (Admin)
 *     tags: [Admin / UserCMS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *               roleId:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tạo user thành công
 *       500:
 *         description: Lỗi server
 */
router.post('/users', checkAdmin, upload.single('avatar'), adminUserCMSCtrl.createUserCtrl);

module.exports = router;