const { Op } = require('sequelize');
const { ArticleCategories } = require('../model');

module.exports = {
    getAllCategoriesSrv: async (name, status, page = 1, pageSize = 10) => {
        const where = {};
        if (name) where.name = { [Op.like]: `%${name}%` };
        if (status) where.status = status;
        return await ArticleCategories.findAndCountAll({
            where,
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [['createdAt', 'DESC']]
        });
    },

    getCategoryByIdSrv: async (id) => {
        const category = await ArticleCategories.findOne({
            where: { id }
        });
        if (!category) throw new Error('CATEGORY_NOT_FOUND');
        return category;
    },
    createCategorySrv: async (categoryData) => {
        console.log(categoryData);
        const { name } = categoryData;
        const existingCategory = await ArticleCategories.findOne({ where: { name } });
        if (existingCategory) throw new Error('CATEGORY_NAME_EXISTS');

        return await ArticleCategories.create({
            name,
            status: 'active'
        });
    },
    updateCategorySrv: async (id, categoryData) => {
        const { name, status } = categoryData;

        const category = await ArticleCategories.findOne({ where: { id } });
        if (!category) throw new Error('CATEGORY_NOT_FOUND');

        if (name && name !== category.name) {
            const existingCategory = await ArticleCategories.findOne({
                where: {
                    name,
                    id: { [Op.ne]: id }
                }
            });
            if (existingCategory) throw new Error('CATEGORY_NAME_EXISTS');
        }

        await category.update({
            name: name || category.name,
            status: status || category.status
        });

        return category;
    },

    deleteCategorySrv: async (id) => {
        const category = await ArticleCategories.findOne({ where: { id } });
        if (!category) throw new Error('CATEGORY_NOT_FOUND');

        await category.update({ status: 'inactive' });
        return { message: 'Category deleted successfully' };
    }
};