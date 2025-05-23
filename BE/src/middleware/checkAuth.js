const jwt = require('jsonwebtoken');
const { User, Role } = require('../model');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Không tìm thấy token xác thực' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            where: { id: decoded.id },
            attributes: ['id', 'name', 'status'],
            include: [{
                model: Role,
                as: 'roles',
                through: { attributes: [] }
            }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Người dùng không tồn tại' });
        }

        if (user.status === 'pending') {
            return res.status(403).json({ message: 'Tài khoản của bạn đang chờ admin duyệt' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token không hợp lệ' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token đã hết hạn' });
        }
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

module.exports = { checkAuth };
