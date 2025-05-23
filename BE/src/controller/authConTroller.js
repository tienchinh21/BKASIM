const authService = require('../service/authService');

module.exports = {
    registerCtr: async (req, res) => {
        try {
            const user = await authService.registerUserSrv(req.body);
            res.status(201).json({
                message: 'Đăng ký thành công',
                user
            });
        } catch (err) {
            switch (err.message) {
                case 'USERNAME_EXISTS':
                    return res.status(409).json({ message: 'Tên đăng nhập đã tồn tại' });
                case 'EMAIL_EXISTS':
                    return res.status(409).json({ message: 'Email đã tồn tại' });
                case 'INVALID_ROLE':
                    return res.status(400).json({ message: 'Role không hợp lệ' });
                default:
                    console.error(err);
                    return res.status(500).json({ message: 'Lỗi server' });
            }
        }
    },
    loginCtr: async (req, res) => {
        try {
            const tokens = await authService.loginUserSrv(req.body);
            res.status(200).json({
                message: 'Đăng nhập thành công',
                ...tokens
            });
        } catch (err) {
            switch (err.message) {
                case 'INVALID_CREDENTIALS':
                    return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
                case 'ACCOUNT_PENDING':
                    return res.status(403).json({ message: 'Tài khoản của bạn đang chờ admin duyệt! Vui lòng chờ đợi...' });
                default:
                    return res.status(500).json({ message: 'Lỗi server', error: err.message });
            }
        }
    },
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
            console.error('[zaloLoginCtr]', err);
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    },
    registerZaloCtr: async (req, res) => {
        console.log(req.body);
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
}
