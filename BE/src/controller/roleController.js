const { createRoleSrv } = require('../service/roleService');
module.exports = {
    createRoleCtr: async (req, res) => {
        try {
            const role = await createRoleSrv(req.body);
            res.status(201).json({
                message: 'Vai trò đã được tạo thành công',
                role
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi máy chủ' });

        }
    }
}
