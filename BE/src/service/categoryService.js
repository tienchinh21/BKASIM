const { Category } = require('../model');

module.exports = {
    getAllCategoriesSrv: async () => {
        return await Category.findAll({
            where: { status: 'active' }
        });
    },
    getCategoryByIdSrv: async (id) => {
        const category = await Category.findOne({
            where: { id, status: 'active' }
        });
        if (!category) throw new Error('CATEGORY_NOT_FOUND');
        return category;
    },
    createCategorySrv: async (categoryData) => {
        const { name } = categoryData;
        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) throw new Error('CATEGORY_NAME_EXISTS');

        return await Category.create({
            name,
            status: 'active'
        });
    },
    updateCategorySrv: async (id, categoryData) => {
        const { name, status } = categoryData;

        const category = await Category.findOne({ where: { id } });
        if (!category) throw new Error('CATEGORY_NOT_FOUND');

        // If name is being changed, check if new name already exists
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({ where: { name } });
            if (existingCategory) throw new Error('CATEGORY_NAME_EXISTS');
        }

        await category.update({
            name: name || category.name,
            status: status || category.status
        });

        return category;
    },
    deleteCategorySrv: async (id) => {
        const category = await Category.findOne({ where: { id } });
        if (!category) throw new Error('CATEGORY_NOT_FOUND');

        await category.update({ status: 'inactive' });
        return { message: 'Category deleted successfully' };
    }
};