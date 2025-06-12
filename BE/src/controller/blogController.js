const blogService = require('../service/blogService');
const { mapBlogListDTO, mapBlogDetailDTO } = require('../DTOs/blogDTO');


function parseBoolean(value) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
}
module.exports = {
    getAllBlogsCtr: async (req, res) => {
        try {
            const filters = {
                isFeatured: parseBoolean(req.query.isFeatured),
                categoryId: req.query.categoryId,
                status: req.query.status,
                search: req.query.search
            };
            console.log(filters);

            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;

            const { rows, count } = await blogService.getAllBlogsSrv(filters, page, pageSize);
            const blogListDTO = rows.map(mapBlogListDTO);

            res.status(200).json({
                data: blogListDTO,
                total: count,
                page,
                pageSize
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getBlogByIdCtr: async (req, res) => {
        try {
            const blog = await blogService.getBlogByIdSrv(req.params.id);

            res.status(200).json(blog);
        } catch (error) {
            if (error.message === 'BLOG_NOT_FOUND') {
                return res.status(404).json({ message: 'Không tìm thấy bài viết' });
            }
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    createBlogCtr: async (req, res) => {
        try {
            const blogData = {
                ...req.body,
                fileBuffer: req.file?.buffer || null,
                originalName: req.file?.originalname || null,
                authorId: req.user.id
            };
            const blog = await blogService.createBlogSrv(blogData);
            res.status(201).json({
                message: 'Tạo bài viết thành công',
                blog
            });
        } catch (error) {
            if (error.message === 'CATEGORY_NOT_FOUND') {
                return res.status(404).json({ message: 'Không tìm thấy danh mục' });
            }
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    updateBlogCtr: async (req, res) => {
        try {
            const blogData = {
                ...req.body,
                fileBuffer: req.file?.buffer || null,
                originalName: req.file?.originalname || null,
            };

            const blog = await blogService.updateBlogSrv(req.params.id, blogData);

            res.status(200).json({
                message: 'Cập nhật bài viết thành công',
                blog,
            });
        } catch (error) {
            if (error.message === 'BLOG_NOT_FOUND') {
                return res.status(404).json({ message: 'Không tìm thấy bài viết' });
            }
            if (error.message === 'CATEGORY_NOT_FOUND') {
                return res.status(404).json({ message: 'Không tìm thấy danh mục' });
            }
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    deleteBlogCtr: async (req, res) => {
        try {
            const result = await blogService.deleteBlogSrv(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'BLOG_NOT_FOUND') {
                return res.status(404).json({ message: 'Không tìm thấy bài viết' });
            }
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getFeaturedBlogCtrl: async (req, res) => {
        try {
            const blog = await blogService.getFeaturedBlogSrv();

            if (!blog) {
                return res.status(404).json({ message: 'Không có blog nổi bật' });
            }

            res.status(200).json(blog);
        } catch (error) {
            console.error('[getFeaturedBlog]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
};
