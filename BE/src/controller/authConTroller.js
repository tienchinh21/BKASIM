const authService = require('../service/authService');

module.exports = {
    refreshTokenCtr: async (req, res) => {
        try {
            const { refresh_token } = req.body;
            if (!refresh_token) {
                return res.status(400).json({ message: 'Refresh token không được cung cấp' });
            }

            const tokens = await authService.refreshTokenSrv(refresh_token);
            res.status(200).json({
                message: 'Làm mới token thành công',
                ...tokens
            });
        } catch (err) {
            switch (err.message) {
                case 'INVALID_REFRESH_TOKEN':
                    return res.status(401).json({ message: 'Refresh token không hợp lệ hoặc đã hết hạn' });
                case 'USER_NOT_FOUND':
                    return res.status(404).json({ message: 'Không tìm thấy người dùng' });
                case 'ACCOUNT_PENDING':
                    return res.status(403).json({ message: 'Tài khoản của bạn đang chờ admin duyệt! Vui lòng chờ đợi...' });
                default:
                    return res.status(500).json({ message: 'Lỗi server', error: err.message });
            }
        }
    },
    zaloLoginCtr: async (req, res) => {
        try {
            const { zaloId } = req.body;

            if (!zaloId) {
                return res.status(400).json({ message: 'Thiếu zaloId' });
            }

            const result = await authService.zaloLoginSrv(zaloId);

            if (!result) {
                return res.status(404).json({ message: 'Người dùng chưa đăng ký' });
            }

            res.status(200).json(result);
        } catch (err) {
            if (err.message === 'ACCOUNT_PENDING') {
                return res.status(403).json({ message: 'Tài khoản đang chờ admin duyệt!' });
            }
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    },
    registerZaloCtr: async (req, res) => {
        try {
            const data = req.body;

            if (!data.zaloId || !data.name || !Array.isArray(data.roles) || data.roles.length === 0) {
                return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
            }
            const result = await authService.registerZaloSrv(data);
            res.status(201).json(result);
        } catch (err) {
            console.error('[registerZaloCtr]', err);
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    }
    // registerZaloCtr: async (req, res) => {
    //     try {
    //         const data = req.body;
    //         const fileBuffer = req.file?.buffer || null;
    //         const originalName = req.file?.originalname || null;

    //         try {
    //             data.roles = JSON.parse(data.roles); // Chuỗi JSON
    //         } catch {
    //             data.roles = [data.roles]; // Chuỗi đơn
    //         }

    //         if (!data.zaloId || !data.name || !Array.isArray(data.roles) || !data.roles.length) {
    //             return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    //         }

    //         const result = await authService.registerZaloSrv({
    //             ...data,
    //             fileBuffer,
    //             originalName
    //         });

    //         res.status(201).json(result);
    //     } catch (err) {
    //         console.error('[registerZaloCtr]', err);
    //         res.status(500).json({ message: 'Lỗi server', error: err.message });
    //     }
    // }

}
