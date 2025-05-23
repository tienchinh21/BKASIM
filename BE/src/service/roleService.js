const Role = require("../model/role");

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
        return await Role.destroy({ where: { id: roleId } });
    },
    updateRoleSrv: async (roleId, name) => {
        return await Role.update({ name }, { where: { id: roleId } });
    }
}

