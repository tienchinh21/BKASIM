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

            res.status(200).json({
                id: blog.id,
                title: blog.title,
                summary: blog.summary,
                image: blog.image,
                createdAt: blog.createdAt,
                content: `
                    <h1>${blog.title}</h1>
                    <p><strong>Ngày:</strong> ${new Date(blog.createdAt).toLocaleDateString()}</p>
                    <p><strong>Tóm tắt:</strong> ${blog.summary}</p>
                    ${blog.image ? `<img src="${blog.image}" alt="Ảnh minh hoạ" />` : ''}
                    <div>${blog.content}</div>
                `
            });
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
                authorId: req.user.id
            };
            const blog = await blogService.createBlogSrv(blogData);
            res.status(201)
                .set('Content-Type', 'text/html')
                .send(`
                    <html>
                      <head>
                        <meta charset="utf-8" />
                      </head>
                      <body>
                        <h1>Tạo bài viết thành công!</h1>
                        <p><b>Tiêu đề:</b> ${blog.title}</p>
                        <p><b>Tóm tắt:</b> ${blog.summary}</p>
                        <div><b>Nội dung:</b> ${blog.content}</div>
                        ${blog.image ? `<p><b>Ảnh:</b> <img src="${blog.image}" alt="image" style="max-width:200px;"/></p>` : ''}
                      </body>
                    </html>
                `);
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
