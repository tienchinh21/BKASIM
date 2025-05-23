const categoryService = require('../service/categoryService');

module.exports = {
    getAllCategoriesCtr: async (req, res) => {
        try {
            const categories = await categoryService.getAllCategoriesSrv();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getCategoryByIdCtr: async (req, res) => {
        try {
            const category = await categoryService.getCategoryByIdSrv(req.params.id);
            res.status(200).json(category);
        } catch (error) {
            if (error.message === 'CATEGORY_NOT_FOUND') {
                return res.status(404).json({ message: 'Không tìm thấy danh mục' });
            }
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    createCategoryCtr: async (req, res) => {
        console.log(req.body);
        try {
            const category = await categoryService.createCategorySrv(req.body);
            res.status(201).json({
                message: 'Tạo danh mục thành công',
                category
            });
        } catch (error) {
            if (error.message === 'CATEGORY_NAME_EXISTS') {
                return res.status(409).json({ message: 'Tên danh mục đã tồn tại' });
            }
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    // Update category
    updateCategoryCtr: async (req, res) => {
        try {
            const category = await categoryService.updateCategorySrv(req.params.id, req.body);
            res.status(200).json({
                message: 'Cập nhật danh mục thành công',
                category
            });
        } catch (error) {
            if (error.message === 'CATEGORY_NOT_FOUND') {
                return res.status(404).json({ message: 'Không tìm thấy danh mục' });
            }
            if (error.message === 'CATEGORY_NAME_EXISTS') {
                return res.status(409).json({ message: 'Tên danh mục đã tồn tại' });
            }
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    // Delete category
    deleteCategoryCtr: async (req, res) => {
        try {
            const result = await categoryService.deleteCategorySrv(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'CATEGORY_NOT_FOUND') {
                return res.status(404).json({ message: 'Không tìm thấy danh mục' });
            }
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
};