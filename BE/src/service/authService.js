const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../model');

require('dotenv').config();
module.exports = {
    registerUserSrv: async (userData) => {
        console.log(userData);
        const {
            username, password, email, name, avt,
            gender, status, company, fieldOfStudy, job, roleIds,
            dateOfBirth
        } = userData;

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) throw new Error('USERNAME_EXISTS');

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) throw new Error('EMAIL_EXISTS');

        if (!Array.isArray(roleIds) || roleIds.length === 0) {
            throw new Error('INVALID_ROLE');
        }

        const roles = await Role.findAll({
            where: { id: roleIds }
        });

        if (roles.length !== roleIds.length) {
            throw new Error('INVALID_ROLE');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
            name,
            avt,
            gender,
            status: status || 'pending',
            company,
            fieldOfStudy,
            job,
            dateOfBirth
        });

        await newUser.setRoles(roles);

        return {
            id: newUser.id,
            username: newUser.username,
            roles: roles.map(r => ({ id: r.id, name: r.name }))
        };
    },
    loginUserSrv: async ({ username, password }) => {
        const user = await User.findOne({
            where: { username },
            include: [{ model: Role, as: 'roles' }]
        });
        if (!user) throw new Error('INVALID_CREDENTIALS');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('INVALID_CREDENTIALS');

        if (user.status === 'pending') throw new Error('ACCOUNT_PENDING');

        const access_token = jwt.sign(
            { id: user.id, username: user.username, role: user.roles.map(r => r.name) },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const refresh_token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return {
            access_token,
            refresh_token
        };
    },
    refreshTokenSrv: async (refresh_token) => {
        try {
            // Verify the refresh token
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

            // Generate new refresh token
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
    }
}