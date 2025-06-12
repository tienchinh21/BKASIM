const jwt = require('jsonwebtoken');
const { User, Role, UserCMS } = require('../model');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Không tìm thấy token xác thực' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            where: { id: decoded.id },
            attributes: ['id', 'name', 'status', 'email'],
            include: [
                {
                    model: Role,
                    as: 'roles',
                    through: { attributes: [] }
                }
            ]
        });

        const userCMS = await UserCMS.findOne({
            where: { id: decoded.id },
            attributes: ['id', 'name', 'status', 'email'],
            include: [
                {
                    model: Role,
                    as: 'role' //  singular nếu 1 role
                }
            ]
        });

        if (!user && !userCMS) {
            return res.status(401).json({ message: 'Người dùng không tồn tại' });
        }

        if ((user && user.status === 'pending') || (userCMS && userCMS.status === 'pending')) {
            return res.status(403).json({ message: 'Tài khoản của bạn đang chờ duyệt' });
        }

        if (user) {
            req.user = {
                id: user.id,
                name: user.name || '',
                email: user.email,
                status: user.status,
                roles: user.roles || [],
                isCMS: false
            };
        } else if (userCMS) {
            req.user = {
                id: userCMS.id,
                name: userCMS.name || '',
                email: userCMS.email,
                status: userCMS.status,
                roles: userCMS.role ? [userCMS.role] : [],
                isCMS: true
            };
        }

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
