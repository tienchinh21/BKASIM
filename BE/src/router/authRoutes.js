const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthConTroller');



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
 *               - field_of_study
 *               - job
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               date_of_birth:
 *                 type: date
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
 *               field_of_study:
 *                 type: string
 *               job:
 *                 type: string
 *               role:
 *                 type: string
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




module.exports = router;


