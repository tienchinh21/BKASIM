const jwt = require('jsonwebtoken');
const { User, Role } = require('../model');

require('dotenv').config();
module.exports = {
    refreshTokenSrv: async (refresh_token) => {
        try {
            const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);

            // Find the user
            const user = await User.findOne({
                where: { id: decoded.id },
                include: [{ model: Role, as: 'roles' }]
            });

            if (!user) throw new Error('USER_NOT_FOUND');
            if (user.status === 'pending') throw new Error('ACCOUNT_PENDING');

            // Generate new access token
            const new_access_token = jwt.sign(
                { id: user.id, username: user.username, role: user.roles.map(r => r.name) },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            const new_refresh_token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            return {
                access_token: new_access_token,
                refresh_token: new_refresh_token
            };
        } catch (error) {
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                throw new Error('INVALID_REFRESH_TOKEN');
            }
            throw error;
        }
    },
    zaloLoginSrv: async (zaloId) => {
        const user = await User.findOne({
            where: { zaloId },
            include: [{ model: Role, as: 'roles', through: { attributes: [] } }]
        });

        if (!user) return null;

        const userData = {
            id: user.id,
            username: user.username,
            roles: user.roles.map(r => ({ id: r.id, name: r.name })),
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            company: user.company,
            fieldOfStudy: user.fieldOfStudy,
            job: user.job,
            dateOfBirth: user.dateOfBirth,
            status: user.status,
        };

        if (user.status === 'pending') {
            return { userData };
        }

        const access_token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        return { userData, access_token };
    },
    registerZaloSrv: async (data) => {
        const {
            zaloId,
            name,
            email,
            phone,
            gender,
            company,
            fieldOfStudy,
            job,
            roles,
            avatar
        } = data;

        if (!Array.isArray(roles) || roles.length === 0) {
            throw new Error('Roles phải là một mảng và không được rỗng');
        }

        const existing = await User.findOne({ where: { zaloId } });
        if (existing) throw new Error('Người dùng đã tồn tại');

        if (email) {
            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) throw new Error('EMAIL_EXISTS');
        }

        if (phone && !/^\d{10}$/.test(phone)) {
            throw new Error('Số điện thoại phải có đúng 10 chữ số');
        }

        // let avatarPath = null;
        // if (fileBuffer && originalName) {
        //     const result = await uploadFileToSSH(fileBuffer, originalName, 'user');
        //     avatarPath = result.path;
        // }

        const newUser = await User.create({
            zaloId,
            name,
            avatar,
            email: email || null,
            phone: phone || null,
            gender: gender || null,
            company: company || null,
            fieldOfStudy: fieldOfStudy || null,
            job: job || null,
            status: 'pending',
        });

        const foundRoles = await Role.findAll({ where: { name: roles } });
        if (foundRoles.length !== roles.length) {
            throw new Error('Một hoặc nhiều vai trò không hợp lệ');
        }

        await newUser.addRoles(foundRoles);

        return { message: 'Đăng ký thành công, vui lòng chờ admin duyệt!' };
    }
}