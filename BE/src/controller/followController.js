const followService = require('../service/followService');

const parsePagination = (req) => {
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = parseInt(req.query.offset, 10) || 0;
    return { limit, offset };
};

module.exports = {
    getReceivedFollowsCtrl: async (req, res) => {
        try {
            const userId = req.user.id;
            const { limit, offset } = parsePagination(req);
            const followers = await followService.getPendingFollows(userId, limit, offset);
            res.json(followers);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    sendFollowRequestCtrl: async (req, res) => {
        try {
            const { userId: targetUserId } = req.params;
            const { targetRoleId, followerRoleId } = req.body;
            const senderUserId = req.user.id;

            if (!targetRoleId || !followerRoleId) {
                return res.status(400).json({ message: 'Thiếu targetRoleId hoặc followerRoleId' });
            }

            const result = await followService.sendFollowRequest(
                senderUserId,
                targetUserId,
                targetRoleId,
                followerRoleId
            );

            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    acceptFollowCtrl: async (req, res) => {
        try {
            const { followerId } = req.params;
            const userId = req.user.id;

            const result = await followService.confirmFollow(followerId, userId);
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    rejectFollowCtrl: async (req, res) => {
        try {
            const { followerId } = req.params;
            const userId = req.user.id;

            const result = await followService.rejectFollow(followerId, userId);
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    unfollowCtrl: async (req, res) => {
        try {
            const { followingId } = req.params;
            const userId = req.user.id;

            const result = await followService.unfollow(userId, followingId);
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    getSentFollowsCtrl: async (req, res) => {
        try {
            const userId = req.user.id;
            const { limit, offset } = parsePagination(req);
            const follows = await followService.getSentFollows(userId, limit, offset);
            res.json(follows);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    getFollowersCtrl: async (req, res) => {
        try {
            const userId = req.user.id;
            const { limit, offset } = parsePagination(req);
            const followers = await followService.getFollowers(userId, limit, offset);
            res.json(followers);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    getFollowingCtrl: async (req, res) => {
        try {
            const userId = req.user.id;
            const { limit, offset } = parsePagination(req);
            const following = await followService.getFollowing(userId, limit, offset);
            res.json(following);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
};
