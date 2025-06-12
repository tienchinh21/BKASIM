const { Articles, ArticleCategories, UserCMS } = require('../model');
const { Op } = require('sequelize');
const { uploadFileToSSH } = require('./upload/uploadService');

module.exports = {
    getAllBlogsSrv: async (filters = {}, page = 1, pageSize = 10) => {
        const { categoryId, status, search, isFeatured } = filters;
        const whereClause = {};
        if (categoryId) whereClause.categoryId = categoryId;
        if (status) whereClause.status = status;
        if (typeof isFeatured !== 'undefined') whereClause.isFeatured = isFeatured;
        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { summary: { [Op.like]: `%${search}%` } }
            ];
        }
        return await Articles.findAndCountAll({
            where: whereClause,
            include: [
                { model: ArticleCategories, as: 'category' },
                { model: UserCMS, as: 'authorCMS', attributes: ['id', 'name'] }
            ],
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [['createdAt', 'DESC']]
        });
    },
    getFeaturedBlogSrv: async () => {
        const blog = await Articles.findOne({
            where: { isFeatured: 1 },
            include: [
                {
                    model: ArticleCategories,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ],
            order: [['createdAt', 'DESC']]
        });


        return blog;
    },
    getBlogByIdSrv: async (id) => {
        const blog = await Articles.findOne({
            where: { id },
            include: [
                { model: ArticleCategories, as: 'category' },
                { model: UserCMS, as: 'authorCMS', attributes: ['id', 'name'] }
            ]
        });
        if (!blog) throw new Error('BLOG_NOT_FOUND');
        return blog;
    },
    createBlogSrv: async (blogData) => {
        const { title, content, categoryId, summary, authorId, isFeatured, fileBuffer, originalName } = blogData;

        if (categoryId) {
            const category = await ArticleCategories.findOne({ where: { id: categoryId, status: 'active' } });
            if (!category) throw new Error('CATEGORY_NOT_FOUND');
        }

        const imageUrl = await uploadFileToSSH(fileBuffer, originalName, 'blog');
        return await Articles.create({
            title,
            content,
            image: imageUrl.path,
            categoryId,
            summary,
            authorId,
            isFeatured: isFeatured || false
        });
    },
    updateBlogSrv: async (id, blogData) => {
        const {
            title,
            content,
            categoryId,
            status,
            summary,
            isFeatured,
            fileBuffer,
            originalName,
            image: currentImage,
        } = blogData;

        const blog = await Articles.findOne({ where: { id } });
        if (!blog) throw new Error('BLOG_NOT_FOUND');

        if (categoryId) {
            const category = await ArticleCategories.findOne({
                where: { id: categoryId, status: 'active' },
            });
            if (!category) throw new Error('CATEGORY_NOT_FOUND');
        }

        let image = currentImage;

        if (fileBuffer && originalName) {
            const uploadResult = await uploadFileToSSH(fileBuffer, originalName, 'blog');
            image = uploadResult.path;
        }

        await blog.update({
            title: title || blog.title,
            content: content || blog.content,
            image: image || blog.image,
            categoryId: categoryId || blog.categoryId,
            status: status || blog.status,
            summary: summary || blog.summary,
            isFeatured: isFeatured || blog.isFeatured,
        });

        return blog;
    },

    deleteBlogSrv: async (id) => {
        const blog = await Articles.findOne({ where: { id } });
        if (!blog) throw new Error('BLOG_NOT_FOUND');

        await blog.update({ isDeleted: true });
        return { message: 'Blog deleted successfully' };
    }
};