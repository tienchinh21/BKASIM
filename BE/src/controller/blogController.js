const blogService = require('../service/blogService');
const { mapBlogListDTO, mapBlogDetailDTO } = require('../DTOs/blogDTO');
module.exports = {
    getAllBlogsCtr: async (req, res) => {
        try {
            const filters = {
                categoryId: req.query.categoryId,
                status: req.query.status,
                search: req.query.search
            };
            const blogs = await blogService.getAllBlogsSrv(filters);
            const blogListDTO = blogs.map(mapBlogListDTO);
            res.status(200).json(blogListDTO);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getBlogByIdCtr: async (req, res) => {
        try {
            const blog = await blogService.getBlogByIdSrv(req.params.id);
            const blogDetailDTO = mapBlogDetailDTO(blog);
            res.status(200).json(blogDetailDTO);
        } catch (error) {
            if (error.message === 'BLOG_NOT_FOUND') {
                return res.status(404).json({ message: 'Không tìm thấy bài viết' });
            }
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    createBlogCtr: async (req, res) => {
        try {
            console.log('req.user:', req.user);
            const blogData = {
                ...req.body,
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
            const blog = await blogService.updateBlogSrv(req.params.id, req.body);
            res.status(200).json({
                message: 'Cập nhật bài viết thành công',
                blog
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
    }
};