const { UserCMS } = require('../../model/index');
const { Op } = require('sequelize');
const { deleteFileOnSSH, uploadFileToSSH } = require('../upload/uploadService');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const BASE_REMOTE_PATH = process.env.BASE_REMOTE_PATH;

const adminUserCMSService = {
    async getAllUsers({ page = 1, pageSize = 10, search }) {
        try {
            const offset = (page - 1) * pageSize;
            const whereClause = {
                isDeleted: false
            };

            if (search) {
                whereClause[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { username: { [Op.like]: `%${search}%` } }
                ];
            }


            const { count, rows } = await UserCMS.findAndCountAll({
                where: whereClause,
                limit: parseInt(pageSize),
                offset: parseInt(offset),
                order: [['createdAt', 'DESC']],
                attributes: { exclude: ['password'] }
            });

            return {
                data: rows,
                total: count,
                page: parseInt(page),
                pageSize: parseInt(pageSize),
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async getUserById(id) {
        try {
            const userCMS = await UserCMS.findOne({
                where: {
                    id,
                    isDeleted: false
                },
                attributes: { exclude: ['password'] }
            });

            if (!userCMS) {
                console.log('User not found with id:', id);
                return null;
            }

            return userCMS;
        } catch (error) {
            console.log('Error in getUserById:', error);
            throw error;
        }
    },
    updateUser: async (id, updateData, fileBuffer, originalName) => {
        const user = await UserCMS.findByPk(id);
        if (!user) throw new Error('Người dùng không tồn tại');

        let avatarPath = null;

        if (fileBuffer && originalName) {
            if (user.avatar) {
                const fileName = path.basename(user.avatar);
                await deleteFileOnSSH(`${BASE_REMOTE_PATH}/avatar/userCMS/${fileName}`);
            }
            const result = await uploadFileToSSH(fileBuffer, originalName, 'userCMS');
            avatarPath = result.path;
            updateData.avatar = avatarPath;
        }

        await user.update(updateData);
        return user;
    },
    async softDeleteUser(id) {
        try {
            const userCMS = await UserCMS.findOne({
                where: {
                    id,
                    isDeleted: false
                }
            });

            if (!userCMS) {
                console.log('User not found with id:', id);
                return false;
            }

            await userCMS.update({ isDeleted: true });
            return true;
        } catch (error) {
            console.log('Error in softDeleteUser:', error);
            throw error;
        }
    },
    createUser: async (data, fileBuffer, originalName) => {
        const { username, email, password, name, status = 'active', roleId } = data;

        const existed = await UserCMS.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        if (existed) {
            throw new Error('Username hoặc email đã tồn tại');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let avatarPath = null;
        if (fileBuffer && originalName) {
            const result = await uploadFileToSSH(fileBuffer, originalName, 'userCMS');
            avatarPath = result.path;
        }

        const newUser = await UserCMS.create({
            username,
            email,
            password: hashedPassword,
            name,
            status,
            roleId,
            avatar: avatarPath
        });

        return newUser;
    }
};

module.exports = adminUserCMSService;