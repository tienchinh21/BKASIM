const express = require('express');
const router = express.Router();
// const { checkAdmin } = require('../middleware/checkAdmin');
const roleController = require('../controller/roleController');
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
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
router.post('/roles', roleController.createRoleCtrl);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Server error
 */
router.get('/roles', roleController.getAllRolesCtrl);

/**
 * @swagger
 * /roles/{roleId}:
 *   delete:
 *     summary: Delete a role by ID
    *     tags: [Role]
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
router.delete('/roles/:roleId', roleController.deleteRoleCtrl);

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
router.put('/roles/:roleId', roleController.updateRoleCtrl);

module.exports = router;
