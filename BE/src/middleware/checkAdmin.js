const jwt = require('jsonwebtoken');
const { User, Role } = require('../model');

const checkAdmin = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token không hợp lệ' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        const role = await Role.findOne({ where: { id: user.roleId } });
        if (!role || role.name !== 'admin') {
            return res.status(403).json({ message: 'Chỉ admin mới có quyền thực hiện' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token không hợp lệ' });
    }
};

module.exports = { checkAdmin };