const { Blog, Category, User } = require('../model');
const { Op } = require('sequelize');

module.exports = {
    getAllBlogsSrv: async (filters = {}) => {
        const { categoryId, status, search } = filters;

        const whereClause = {};
        if (categoryId) whereClause.categoryId = categoryId;
        if (status) whereClause.status = status;
        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { content: { [Op.like]: `%${search}%` } }
            ];
        }

        return await Blog.findAll({
            where: whereClause,
            include: [
                { model: Category, as: 'category' },
                { model: User, as: 'author', attributes: ['id', 'username', 'name'] }
            ],
            order: [['createdAt', 'DESC']]
        });
    },
    getBlogByIdSrv: async (id) => {
        const blog = await Blog.findOne({
            where: { id },
            include: [
                { model: Category, as: 'category' },
                { model: User, as: 'author', attributes: ['id', 'username', 'name'] }
            ]
        });
        if (!blog) throw new Error('BLOG_NOT_FOUND');
        return blog;
    },
    createBlogSrv: async (blogData) => {
        const { title, content, image, categoryId, authorId, summary } = blogData;
        if (categoryId) {
            const category = await Category.findOne({ where: { id: categoryId, status: 'active' } });
            if (!category) throw new Error('CATEGORY_NOT_FOUND');
        }

        return await Blog.create({
            title,
            content,
            image,
            categoryId,
            authorId,
            status: 'draft',
            summary
        });
    },
    updateBlogSrv: async (id, blogData) => {
        const { title, content, image, categoryId, status, summary } = blogData;

        const blog = await Blog.findOne({ where: { id } });
        if (!blog) throw new Error('BLOG_NOT_FOUND');

        // Check if category exists if being updated
        if (categoryId) {
            const category = await Category.findOne({ where: { id: categoryId, status: 'active' } });
            if (!category) throw new Error('CATEGORY_NOT_FOUND');
        }

        await blog.update({
            title: title || blog.title,
            content: content || blog.content,
            image: image || blog.image,
            categoryId: categoryId || blog.categoryId,
            status: status || blog.status,
            summary: summary || blog.summary
        });

        return blog;
    },
    deleteBlogSrv: async (id) => {
        const blog = await Blog.findOne({ where: { id } });
        if (!blog) throw new Error('BLOG_NOT_FOUND');

        await blog.update({ status: 'deleted' });
        return { message: 'Blog deleted successfully' };
    }
};