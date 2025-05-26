const followService = require('../service/followService');

const parsePagination = (req) => {
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = parseInt(req.query.offset, 10) || 0;
    return { limit, offset };
};

module.exports = {
    sendFollowRequestCtr: async (req, res) => {
        try {
            const { userId: targetUserId } = req.params;
            const senderUserId = req.user.id;

            const result = await followService.sendFollowRequest(senderUserId, targetUserId);
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            console.error('[sendFollowRequest]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    getReceivedFollowsCtr: async (req, res) => {
        try {
            const userId = req.user.id;
            const { limit, offset } = parsePagination(req);
            const followers = await followService.getPendingFollows(userId, limit, offset);
            res.json(followers);
        } catch (error) {
            console.error('[getReceivedFollows]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    acceptFollowCtr: async (req, res) => {
        try {
            const { followerId } = req.params;
            const userId = req.user.id;

            const result = await followService.confirmFollow(followerId, userId);
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            console.error('[acceptFollow]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    rejectFollowCtr: async (req, res) => {
        try {
            const { followerId } = req.params;
            const userId = req.user.id;

            const result = await followService.rejectFollow(followerId, userId);
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            console.error('[rejectFollow]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    unfollowCtr: async (req, res) => {
        try {
            const { followingId } = req.params;
            const userId = req.user.id;

            const result = await followService.unfollow(userId, followingId);
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            console.error('[unfollow]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    getSentFollowsCtr: async (req, res) => {
        try {
            const userId = req.user.id;
            const { limit, offset } = parsePagination(req);
            const follows = await followService.getSentFollows(userId, limit, offset);
            res.json(follows);
        } catch (error) {
            console.error('[getSentFollows]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    getFollowersCtr: async (req, res) => {
        try {
            const userId = req.user.id;
            const { limit, offset } = parsePagination(req);
            const followers = await followService.getFollowers(userId, limit, offset);
            res.json(followers);
        } catch (error) {
            console.error('[getFollowers]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    getFollowingCtr: async (req, res) => {
        try {
            const userId = req.user.id;
            const { limit, offset } = parsePagination(req);
            const following = await followService.getFollowing(userId, limit, offset);
            res.json(following);
        } catch (error) {
            console.error('[getFollowing]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
};
