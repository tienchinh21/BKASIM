const { Role, User } = require('../model');
const userService = require('../service/userService');

module.exports = {
    getAllUsersCtrl: async (req, res) => {
        const { role, name, page = 1, pageSize = 10 } = req.query;

        try {
            const result = await userService.getAllUsersSrv({
                role,
                status: 'approved',
                name,
                currentUserId: req.user.id
            }, parseInt(page), parseInt(pageSize));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getUserByIdCtrl: async (req, res) => {
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
    deleteUserCtrl: async (req, res) => {
        const { userId } = req.params;
        try {
            await userService.deleteUserSrv(userId);
            res.status(200).json({ message: 'Xóa tài khoản người dùng thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    updateUserCtrl: async (req, res) => {
        const { userId } = req.params;
        const data = req.body;
        const fileBuffer = req.file?.buffer || null;
        const originalName = req.file?.originalname || null;


        if (!Array.isArray(data.roleIds)) {
            if (typeof data.roleIds === 'string') {
                data.roleIds = [data.roleIds];
            } else if (data.roleIds == null) {
                data.roleIds = [];
            } else {
                return res.status(400).json({ message: 'Vai trò phải là mảng hợp lệ' });
            }
        }

        if (data.phone && !/^\d{10}$/.test(data.phone)) {
            return res.status(400).json({ message: 'Số điện thoại phải có đúng 10 chữ số' });
        }

        if (data.roleIds && !Array.isArray(data.roleIds)) {
            return res.status(400).json({ message: 'Vai trò phải là mảng' });
        }

        try {
            const user = await userService.updateUserSrv(userId, data, fileBuffer, originalName);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }
            res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getMyProfileCtrl: async (req, res) => {
        try {
            const userData = await userService.getMyProfileSrv(req.user.id);
            if (!userData) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            if (userData.status !== 'approved') {
                return res.status(403).json({ message: 'Tài khoản chưa được duyệt' });
            }
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    },
    getUserFollowingCtrl: async (req, res) => {
        const userId = req.params.id;
        try {
            const result = await userService.getUserFollowingSrv(userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getUserBookingsCtrl: async (req, res) => {
        const userId = req.params.id;
        try {
            const result = await userService.getUserBookingsSrv(userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
}


