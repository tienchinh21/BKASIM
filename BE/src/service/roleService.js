module.exports = {
    createRoleSrv: async (roleData) => {
        const { name } = roleData;
        const role = await Role.create({ name });
        return role;
    }
}

