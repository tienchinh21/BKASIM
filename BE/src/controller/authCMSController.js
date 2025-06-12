const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserCMS, Role } = require('../model');

const loginCMS = async (req, res) => {

    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
        }
        const user = await UserCMS.findOne({
            where: { username, status: 'active' },
            include: [{
                model: Role,
                as: 'role',
                attributes: ['id', 'name']
            }]
        });
        if (!user) {
            return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role.name },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        );
        res.status(200).json({
            message: 'Đăng nhập thành công',
            access_token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

const getMeCMS = async (req, res) => {
    try {
        const user = await UserCMS.findByPk(req.user.id, {
            include: [{
                model: Role,
                as: 'role',
                attributes: ['id', 'name']
            }]
        });
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

module.exports = { loginCMS, getMeCMS };
