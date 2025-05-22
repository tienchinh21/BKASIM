const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Role = require('../model/role');
require('dotenv').config();
module.exports = {
    registerUserSrv: async (userData) => {
        const {
            username, password, email, name, avt,
            gender, status, company, field_of_study, job, role
        } = userData;

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) throw new Error('USERNAME_EXISTS');

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) throw new Error('EMAIL_EXISTS');

        const roleRecord = await Role.findOne({ where: { name: role.toUpperCase() } });
        if (!roleRecord) throw new Error('INVALID_ROLE');

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
            field_of_study,
            job,
            roleId: roleRecord.id
        });

        return {
            id: newUser.id,
            username: newUser.username,
            role: roleRecord.name
        };
    },
    loginUserSrv: async ({ username, password }) => {
        const user = await User.findOne({ where: { username } });
        if (!user) throw new Error('INVALID_CREDENTIALS');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('INVALID_CREDENTIALS');

        if (user.status === 'pending') throw new Error('ACCOUNT_PENDING');

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
}