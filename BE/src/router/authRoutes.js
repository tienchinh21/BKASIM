const express = require('express');
const router = express.Router();
const authController = require('../controller/authConTroller');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *               - name
 *               - avt
 *               - gender
 *               - company
 *               - fieldOfStudy
 *               - job
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               avt:
 *                 type: string
 *               gender:
 *                 type: boolean
 *               company:
 *                 type: string
 *               fieldOfStudy:
 *                 type: string
 *               job:
 *                 type: string
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 */
router.post('/auth/register', authController.registerCtr);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
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
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid username or password
 *       403:
 *         description: Account is pending approval
 *       500:
 *         description: Server error
 */
router.post('/auth/login', authController.loginCtr);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refresh_token
 *             properties:
 *               refresh_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refresh successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *       401:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Server error
 */
router.post('/auth/refresh-token', authController.refreshTokenCtr);

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
 *     summary: Đăng ký người dùng mới qua Zalo
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
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [mentor, mentee]
 *                 description: Danh sách vai trò của người dùng
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi đầu vào
 */
router.post('/auth/register-zalo', authController.registerZaloCtr);

module.exports = router;


