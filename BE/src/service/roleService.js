const Role = require("../model/Role");

module.exports = {
    createRoleSrv: async (roleData) => {
        const { name } = roleData;
        const role = await Role.create({ name });
        return role;
    },
    getAllRolesSrv: async () => {
        return await Role.findAll();
    },
    deleteRoleSrv: async (roleId) => {
        const role = await Role.findByPk(roleId);
        if (!role) return null;
        await role.update({ isDeleted: true });
        return role;
    },
    updateRoleSrv: async (roleId, name) => {
        return await Role.update({ name }, { where: { id: roleId } });
    }
}

