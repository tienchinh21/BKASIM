const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../middleware/checkAdmin');
const roleController = require('../controller/roleController');
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
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
router.post('/roles', checkAdmin, roleController.createRoleCtr);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Server error
 */
router.get('/roles', checkAdmin, roleController.getAllRolesCtr);

/**
 * @swagger
 * /roles/{roleId}:
 *   delete:
 *     summary: Delete a role by ID
    *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Server error
 */
router.delete('/roles/:roleId', checkAdmin, roleController.deleteRoleCtr);

/**
 * @swagger
 * /roles/{roleId}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: MENTOR
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Server error
 */
router.put('/roles/:roleId', checkAdmin, roleController.updateRoleCtr);

module.exports = router;
