const { User, Role, Follow, Booking, BookingParticipants } = require('../model');
const { userDTO, checkUserDTO } = require('../DTOs/userDTO');
const { Op } = require('sequelize');
const { deleteFileOnSSH, uploadFileToSSH } = require('../service/upload/uploadService');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const BASE_REMOTE_PATH = process.env.BASE_REMOTE_PATH;


module.exports = {
    getAllUsersSrv: async (filters, page = 1, pageSize = 10) => {
        const { role, name, status, currentUserId } = filters;

        const where = {};
        if (status) {
            where.status = status;
        }

        if (name) {
            where.name = {
                [Op.like]: `%${name}%`
            };
        }

        const include = [
            {
                model: Role,
                as: 'roles',
                through: { attributes: [] }
            }
        ];

        if (role) {
            include[0].where = {
                name: {
                    [Op.like]: `%${role}%`
                }
            };
        }

        // Nếu có userId => lấy follow status
        if (currentUserId) {
            include.push({
                model: Follow,
                as: 'FollowerRelations',
                required: false,
                where: {
                    followerId: currentUserId
                },
                attributes: ['status']
            });
        }

        const offset = (page - 1) * pageSize;

        const { count, rows } = await User.findAndCountAll({
            where,
            include,
            offset,
            limit: pageSize,
            distinct: true
        });

        return {
            data: rows.map(user => {
                const json = user.toJSON();
                const mapped = userDTO(json);

                if (currentUserId) {
                    const follow = json.FollowerRelations?.[0];
                    return {
                        ...mapped,
                        followStatus: follow?.status || null
                    };
                }

                return mapped;
            }),
            total: count,
            page,
            pageSize
        };
    },
    getUserByIdSrv: async (userId, currentUser, view) => {
        const user = await User.findOne({
            where: { id: userId },
            include: [{
                model: Role,
                as: 'roles',
                through: { attributes: [] }
            }]
        });

        if (!user) return null;

        const isAdmin =
            Array.isArray(currentUser.roles) &&
            currentUser.roles.some(role => role.name === 'Admin' || role.name === 'admin');

        const canViewAdmin =
            isAdmin && view === 'admin';

        return canViewAdmin ? userDTO(user) : checkUserDTO(user);
    },
    updateUserSrv: async (userId, data, fileBuffer, originalName) => {
        const { roleIds, ...otherFields } = data;
        const user = await User.findByPk(userId);
        if (!user) return null;

        let newAvatarPath = null;

        if (fileBuffer && originalName) {
            if (user.avatar) {
                const fileName = path.basename(user.avatar);
                await deleteFileOnSSH(`${BASE_REMOTE_PATH}/avatar/user/${fileName}`);
            }

            const result = await uploadFileToSSH(fileBuffer, originalName, 'user');
            newAvatarPath = result.path;
            otherFields.avatar = newAvatarPath;
        }

        await user.update(otherFields);

        // Cập nhật roles nếu có
        if (Array.isArray(roleIds)) {
            const foundRoles = await Role.findAll({ where: { id: roleIds } });
            await user.setRoles(foundRoles);
        }

        return user;
    },
    deleteUserSrv: async (userId) => {
        const user = await User.findByPk(userId);
        if (!user) return null;
        await user.update({ isDeleted: true });
        return user;
    },
    getMyProfileSrv: async (userId) => {
        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role, as: 'roles', through: { attributes: [] } }]
        });
        return user;
    },
    getUserFollowingSrv: async (userId) => {
        const follows = await Follow.findAll({
            where: {
                followerId: userId,
                status: 'confirmed'
            },
            include: [
                {
                    model: User,
                    as: 'Following',
                    attributes: ['id', 'name', 'email', 'avatar', 'phone']
                },
                {
                    model: Role,
                    as: 'TargetRole',
                    attributes: ['id', 'name']
                }
            ]
        });

        return follows.map(f => {
            return {
                id: f.Following.id,
                name: f.Following.name,
                email: f.Following.email,
                avatar: f.Following.avatar,
                phone: f.Following.phone,
                roles: f.TargetRole
                    ? [{ id: f.TargetRole.id, name: f.TargetRole.name }]
                    : []
            };
        });
    },
    getUserBookingsSrv: async (userId) => {
        // Booking user tạo
        const created = await Booking.findAll({
            where: { createdBy: userId, isDeleted: false },
            include: [
                {
                    model: User,
                    as: 'participants',
                    attributes: ['id', 'name'],
                    through: { attributes: ['role'] }
                },
                {
                    model: User,
                    as: 'createdByUser',
                    attributes: ['id', 'name']
                }
            ]
        });

        // Booking user tham gia
        const participations = await Booking.findAll({
            include: [
                {
                    model: BookingParticipants,
                    as: 'bookingParticipants',
                    where: { userId },
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name', 'email', 'avatar', 'phone']
                        }
                    ]
                },
                {
                    model: User,
                    as: 'participants',
                    attributes: ['id', 'name'],
                    through: { attributes: ['role'] }
                },
                {
                    model: User,
                    as: 'createdByUser',
                    attributes: ['id', 'name']
                }
            ],
            where: { isDeleted: false }
        });

        const map = new Map();
        [...created, ...participations].forEach(b => {
            const booking = b.toJSON();

            map.set(booking.id, {
                id: booking.id,
                bookingTitle: booking.bookingTitle,
                status: booking.status,
                schedulingTime: booking.schedulingTime,
                createdBy: booking.createdBy,
                createdByUser: booking.createdByUser || {
                    id: booking.createdBy,
                    name: 'Không xác định'
                },
                participants: booking.participants?.filter(p => p.id !== booking.createdBy).map(p => ({
                    name: p.name
                })) || []
            });
        });

        return Array.from(map.values());
    }
}
