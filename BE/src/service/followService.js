const { Follow, User, Role } = require('../model');

const FOLLOWER_INCLUDE_OPTIONS = [{
    model: User,
    as: 'Follower',
    attributes: ['id', 'name', 'avatar'],
    include: [{
        model: Role,
        as: 'roles',
        through: { attributes: [] }
    }]
}];

const FOLLOWING_INCLUDE_OPTIONS = [{
    model: User,
    as: 'Following',
    attributes: ['id', 'name', 'avatar']
}];

module.exports = {
    sendFollowRequest: async (senderId, targetId, targetRoleId, followerRoleId) => {
        try {
            const targetUser = await User.findByPk(targetId);
            if (!targetUser) {
                return { status: 404, message: 'Người dùng không tồn tại.' };
            }

            const [follow, created] = await Follow.findOrCreate({
                where: { followerId: senderId, followingId: targetId },
                defaults: {
                    status: 'pending',
                    targetRoleId,
                    followerRoleId
                }
            });

            if (!created) {
                return { status: 400, message: 'Đã gửi follow trước đó.' };
            }

            return { status: 201, message: 'Đã gửi yêu cầu follow.' };
        } catch (error) {
            return { status: 500, message: 'Lỗi máy chủ', error: error.message };
        }
    },
    getPendingFollows: async (userId, limit = 10, offset = 0) => {
        try {
            const follows = await Follow.findAll({
                where: { followingId: userId, status: 'pending' },
                include: FOLLOWER_INCLUDE_OPTIONS,
                limit,
                offset
            });

            return follows.map(f => f.Follower);
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    confirmFollow: async (followerId, userId) => {
        try {
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

            const [reverseFollow, created] = await Follow.findOrCreate({
                where: {
                    followerId: userId,
                    followingId: followerId
                },
                defaults: {
                    status: 'confirmed',
                    targetRoleId: follow.followerRoleId || null,
                    followerRoleId: follow.targetRoleId || null
                }
            });

            if (!created && reverseFollow.status !== 'confirmed') {
                reverseFollow.status = 'confirmed';
                await reverseFollow.save();
            }

            return { status: 200, message: 'Đã xác nhận' };
        } catch (error) {
            console.error('[confirmFollow]', error);
            return { status: 500, message: 'Lỗi máy chủ.' };
        }
    },
    getPendingFollows: async (userId, limit = 10, offset = 0) => {
        try {
            const follows = await Follow.findAll({
                where: {
                    followingId: userId,
                    status: 'pending'
                },
                include: [
                    {
                        model: User,
                        as: 'Follower',
                        attributes: ['id', 'name', 'avatar']
                    },
                    {
                        model: Role,
                        as: 'FollowerRole',
                        attributes: ['id', 'name']
                    }
                ],
                limit,
                offset
            });

            return follows.map(f => ({
                id: f.Follower.id,
                name: f.Follower.name,
                avatar: f.Follower.avatar,
                role: f.FollowerRole ? {
                    id: f.FollowerRole.id,
                    name: f.FollowerRole.name
                } : null
            }));
        } catch (error) {
            console.error('[getPendingFollows]', error);
            return [];
        }
    },
    rejectFollow: async (followerId, userId) => {
        try {
            const follow = await Follow.findOne({
                where: {
                    followerId,
                    followingId: userId,
                    status: 'pending'
                }
            });

            if (!follow) {
                return { status: 404, message: 'Không tìm thấy yêu cầu follow để từ chối.' };
            }

            await follow.destroy();
            return { status: 200, message: 'Đã từ chối yêu cầu follow.' };
        } catch (error) {
            console.error(error);
            return { status: 500, message: 'Lỗi máy chủ.' };
        }
    },
    unfollow: async (followerId, followingId) => {
        try {
            const follow = await Follow.findOne({
                where: {
                    followerId,
                    followingId,
                    status: 'confirmed'
                }
            });

            if (!follow) {
                return { status: 404, message: 'Không tìm thấy mối quan hệ follow để hủy.' };
            }

            await follow.destroy();
            return { status: 200, message: 'Đã hủy follow.' };
        } catch (error) {
            console.error(error);
            return { status: 500, message: 'Lỗi máy chủ.' };
        }
    },
    getFollowers: async (userId, limit = 10, offset = 0) => {
        try {
            const follows = await Follow.findAll({
                where: {
                    followingId: userId,
                    status: 'confirmed'
                },
                include: FOLLOWER_INCLUDE_OPTIONS,
                limit,
                offset
            });

            return follows.map(f => f.Follower);
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    getFollowing: async (userId, limit = 10, offset = 0) => {
        try {
            const follows = await Follow.findAll({
                where: {
                    followerId: userId,
                    status: 'confirmed'
                },
                include: FOLLOWING_INCLUDE_OPTIONS,
                limit,
                offset
            });

            return follows.map(f => f.Following);
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};
