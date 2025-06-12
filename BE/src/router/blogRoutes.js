const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const { checkAdmin } = require('../middleware/checkAdmin');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
 * /blogs/featured:
 *   get:
 *     summary: Lấy bài viết nổi bật
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Bài viết nổi bật
 */
router.get('/blogs/featured', blogController.getFeaturedBlogCtrl);



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
 *         multipart/form-data:
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
 *               categoryId:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
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
router.post('/blogs', checkAdmin, upload.single('image'), blogController.createBlogCtr);

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               categoryId:
 *                 type: string
 *               status:
 *                 type: string
 *               summary:
 *                 type: string
 *               isFeatured:
 *                 type: boolean

 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.put('/blogs/:id', checkAdmin, upload.single('image'), blogController.updateBlogCtr);


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