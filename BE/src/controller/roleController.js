const { createRoleSrv, getAllRolesSrv, deleteRoleSrv, updateRoleSrv } = require('../service/roleService');

const roleController = {
    createRoleCtrl: async (req, res) => {
        try {
            const role = await createRoleSrv(req.body);
            res.status(201).json({
                message: 'Vai trò đã được tạo thành công',
                role
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },
    getAllRolesCtrl: async (req, res) => {
        try {
            const roles = await getAllRolesSrv();
            res.status(200).json(roles);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },
    deleteRoleCtrl: async (req, res) => {
        const { roleId } = req.params;
        try {
            await deleteRoleSrv(roleId);
            res.status(200).json({ message: 'Vai trò đã được xóa thành công' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },
    updateRoleCtrl: async (req, res) => {
        const { roleId } = req.params;
        const { name } = req.body;
        try {
            await updateRoleSrv(roleId, name);
            res.status(200).json({ message: 'Vai trò đã được cập nhật thành công' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = roleController;
