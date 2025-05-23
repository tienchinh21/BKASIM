const { Follow, User, Role } = require('../model');

module.exports = {
    sendFollowRequest: async (senderId, targetId) => {
        if (senderId === targetId) {
            return { status: 400, message: 'Không thể tự follow chính mình.' };
        }

        const [follow, created] = await Follow.findOrCreate({
            where: { followerId: senderId, followingId: targetId },
            defaults: { status: 'pending' }
        });

        if (!created) {
            return { status: 400, message: 'Đã gửi follow trước đó.' };
        }

        return { status: 201, message: 'Đã gửi yêu cầu follow.' };
    },
    getPendingFollows: async (userId) => {
        const follows = await Follow.findAll({
            where: {
                followingId: userId,
                status: 'pending'
            },
            include: [{
                model: User,
                as: 'Follower',
                attributes: ['id', 'name', 'avt'],
                include: [{
                    model: Role,
                    as: 'roles',
                    through: { attributes: [] }
                }]
            }]
        });

        return follows.map(f => f.Follower);
    },
    confirmFollow: async (followerId, userId) => {
        const follow = await Follow.findOne({
            where: {
                followerId,
                followingId: userId,
                status: 'pending'
            }
        });

        if (!follow) {
            return { status: 404, message: 'Không tìm thấy yêu cầu follow để xác nhận.' };
        }

        follow.status = 'confirmed';
        await follow.save();

        return { status: 200, message: 'Đã xác nhận follow.' };
    },
    getSentFollows: async (userId) => {
        const follows = await Follow.findAll({
            where: {
                followerId: userId
            },
            include: [{
                model: User,
                as: 'Following',
                attributes: ['id', 'name', 'avt']
            }]
        });

        return follows.map(f => ({
            id: f.Following.id,
            name: f.Following.name,
            avt: f.Following.avt,
            status: f.status
        }));
    }
};
