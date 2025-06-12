const express = require('express');
const router = express.Router();
const { loginCMS, getMeCMS } = require('../controller/authCMSController');
const { checkAdmin } = require('../middleware/checkAdmin');

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth CMS]
 *     summary: Đăng nhập CMS
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Thông tin đăng nhập không đúng
 */
router.post('/login', loginCMS);

/**
 * @swagger
 * /cms/me:
 *   get:
 *     tags: [Auth CMS]
 *     summary: Lấy thông tin user CMS đang đăng nhập
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin user
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy user
 */
router.get('/cms/me', checkAdmin, getMeCMS);

module.exports = router;
