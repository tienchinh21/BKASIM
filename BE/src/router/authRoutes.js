const express = require('express');
const router = express.Router();
const multer = require('multer');
const authController = require('../controller/authConTroller');

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    }
});

/**
 * @swagger
 * /auth/login-zalo:
 *   post:
 *     summary: Đăng nhập qua Zalo userId
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - zaloId
 *             properties:
 *               zaloId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       404:
 *         description: User chưa đăng ký
 */
router.post('/auth/login-zalo', authController.zaloLoginCtr);

/**
 * @swagger
 * /auth/register-zalo:
 *   post:
 *     summary: Đăng ký người dùng mới qua Zalo (có avatar)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - zaloId
 *               - name
 *               - roles
 *             properties:
 *               zaloId:
 *                 type: string
 *               name:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *               gender:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               job:
 *                 type: string
 *               fieldOfStudy:
 *                 type: string
 *               company:
 *                 type: string
 *               roles:
 *                 type: string
 *                 example: '["mentor", "mentee"]'
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi đầu vào
 *       409:
 *         description: Người dùng đã tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post('/auth/register-zalo', upload.single('avatar'), authController.registerZaloCtr);

module.exports = router;
