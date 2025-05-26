const { User, Role } = require('../model');
const { userDTO, checkUserDTO } = require('../DTOs/userDTO');
const { Op, fn, col, where: sequelizeWhere } = require('sequelize');

module.exports = {
    getAllUsersSrv: async (filters) => {
        const { role, ...otherFilters } = filters;
        const where = { ...otherFilters };

        const include = [{
            model: Role,
            as: 'roles',
            through: { attributes: [] } // ẩn thông tin bảng trung gian
        }];

        //  lọc theo role name
        if (role) {
            include[0].where = sequelizeWhere(
                fn('lower', col('roles.name')),
                role.toLowerCase()
            );
        }

        const users = await User.findAll({ where, include });
        return users.map(user => userDTO(user));
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

        const isAdmin = currentUser.roles.some(role => role.name === 'admin');

        // xem đầy đủ nếu là admin & view = admin
        return (isAdmin && view === 'admin') ? userDTO(user) : checkUserDTO(user);
    },
    updateUserSrv: async (userId, userData) => {
        const { roleIds, ...otherFields } = userData;
        const user = await User.findByPk(userId);
        if (!user) return null;
        await user.update(otherFields);
        if (Array.isArray(roleIds)) {
            const roles = await Role.findAll({ where: { id: roleIds } });
            await user.setRoles(roles);
        }
        return user;
    },
    deleteUserSrv: async (userId) => {
        return await User.destroy({ where: { id: userId } });
    }
}
