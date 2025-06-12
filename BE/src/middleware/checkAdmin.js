require('dotenv').config();
const jwt = require('jsonwebtoken');

const { UserCMS, Role } = require('../model');

const checkAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Thiếu hoặc sai định dạng token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserCMS.findByPk(decoded.id, {
            include: [{ model: Role, as: 'role' }],
        });
        if (!user || user.role.name !== 'Admin') {
            return res.status(403).json({ message: 'Không có quyền truy cập CMS' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('[checkAdmin] JWT verify failed:', err.message);
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

module.exports = { checkAdmin };
