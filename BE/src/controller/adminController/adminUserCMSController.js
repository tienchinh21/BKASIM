const adminUserCMSService = require('../../service/adminService/adminUserCMSService');

const adminUserCMSCtrl = {
    getAllUsersCtrl: async (req, res) => {
        const { page = 1, pageSize = 10, search = '' } = req.query;
        const result = await adminUserCMSService.getAllUsers({ page, pageSize, search });
        res.status(200).json(result);
    },
    getUserDetailCtrl: async (req, res) => {
        const { id } = req.params;
        const user = await adminUserCMSService.getUserById(id);
        res.status(200).json(user);
    },
    updateUserCtrl: async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        const fileBuffer = req.file?.buffer || null;
        const originalName = req.file?.originalname || null;

        try {
            const updatedUser = await adminUserCMSService.updateUser(id, updateData, fileBuffer, originalName);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    softDeleteUserCtrl: async (req, res) => {
        const { id } = req.params;
        await adminUserCMSService.softDeleteUser(id);
        res.status(200).json({
            message: 'User deleted successfully'
        });
    },
    createUserCtrl: async (req, res) => {
        try {
            const newUser = req.body;
            const fileBuffer = req.file?.buffer || null;
            const originalName = req.file?.originalname || null;

            const result = await adminUserCMSService.createUser(newUser, fileBuffer, originalName);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },


};

module.exports = adminUserCMSCtrl;