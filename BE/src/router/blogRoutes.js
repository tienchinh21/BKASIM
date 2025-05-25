const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const { checkAuth } = require('../middleware/checkAuth');
const { checkAdmin } = require('../middleware/checkAdmin');

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Lấy danh sách bài viết
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Lọc theo danh mục
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Lọc theo trạng thái (draft, published, etc.)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tiêu đề/nội dung
 *     responses:
 *       200:
 *         description: Danh sách bài viết
 */

router.get('/blogs', blogController.getAllBlogsCtr);

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog details
 *       404:
 *         description: Blog not found
 */
router.get('/blogs/:id', blogController.getBlogByIdCtr);

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Tạo bài viết mới (từ CMS/admin)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - summary
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *               summary:
 *                 type: string
 *               content:
 *                 type: string
 *                 description: Nội dung dạng HTML
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bài viết được tạo thành công (HTML Response)
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.post('/blogs', checkAdmin, blogController.createBlogCtr);

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update blog
 *     tags: [Blogs]
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.put('/blogs/:id', blogController.updateBlogCtr);

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete('/blogs/:id', checkAdmin, blogController.deleteBlogCtr);

module.exports = router;