const User = require('../model/user');



module.exports = {
    getAllUsersSrv: async () => {
        const users = await User.findAll();
        return users;
    }
}
