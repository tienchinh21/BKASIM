const authService = require('../service/authService');

exports.register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            message: 'Đăng ký thành công',
            user
        });
    } catch (err) {
        switch (err.message) {
            case 'USERNAME_EXISTS':
                return res.status(409).json({ message: 'Tên đăng nhập đã tồn tại' });
            case 'INVALID_ROLE':
                return res.status(400).json({ message: 'Role không hợp lệ' });
            default:
                console.error(err);
                return res.status(500).json({ message: 'Lỗi server' });
        }
    }
};

exports.login = async (req, res) => {
    try {
        const token = await authService.loginUser(req.body);
        res.status(200).json({ token });
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
};


module.exports = {
    registerCtr: async (req, res) => {
        try {
            const user = await authService.registerUser(req.body);
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
            const token = await authService.loginUser(req.body);
            res.status(200).json({ token });
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
    }

}
