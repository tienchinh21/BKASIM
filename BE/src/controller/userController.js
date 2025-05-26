const userService = require('../service/userService');

module.exports = {
    getAllUsersCtr: async (req, res) => {
        const { role, status, name } = req.query;
        const where = {};
        if (role) where.role = role;
        if (status) where.status = status;
        if (name) where.name = name;
        try {
            const users = await userService.getAllUsersSrv(where);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getUserByIdCtr: async (req, res) => {
        const { userId } = req.params;
        const { view } = req.query;

        try {
            const user = await userService.getUserByIdSrv(userId, req.user, view);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error('[ERROR getUserByIdCtr]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    approveUser: async (req, res) => {
        const { userId } = req.params;
        console.log(userId);
        try {
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            if (user.status !== 'pending') {
                return res.status(400).json({ message: 'Tài khoản không ở trạng thái chờ duyệt' });
            }
            user.status = 'approved';
            await user.save();

            res.status(200).json({ message: 'Duyệt tài khoản thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    deleteUserCtr: async (req, res) => {
        const { userId } = req.params;
        try {
            await userService.deleteUserSrv(userId);
            res.status(200).json({ message: 'Xóa tài khoản người dùng thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    updateUserCtr: async (req, res) => {
        const { userId } = req.params;
        const { name, email, dateOfBirth, gender, company, fieldOfStudy, job, phone } = req.body;

        if (phone && !/^\d{10}$/.test(phone)) {
            return res.status(400).json({ message: 'Số điện thoại phải có đúng 10 chữ số' });
        }

        try {
            const user = await userService.updateUserSrv(userId, { name, email, dateOfBirth, gender, company, fieldOfStudy, job, phone });
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }
            res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
}


