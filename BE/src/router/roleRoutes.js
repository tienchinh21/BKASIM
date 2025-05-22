const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: MENTOR
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Role already exists
 */
router.post('/', roleController.createRoleCtr);

module.exports = router;
