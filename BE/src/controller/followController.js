const followService = require('../service/followService');

module.exports = {
    sendFollowRequest: async (req, res) => {
        try {
            const targetUserId = req.params.userId;
            const senderUserId = req.user.id;

            const result = await followService.sendFollowRequest(senderUserId, targetUserId);
            res.status(result.status).json({ message: result.message });
        } catch (error) {
            console.error('[sendFollowRequest]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getReceivedFollows: async (req, res) => {
        try {
            const userId = req.user.id;
            const followers = await followService.getPendingFollows(userId);
            res.json(followers);
        } catch (error) {
            console.error('[getReceivedFollows]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    acceptFollow: async (req, res) => {
        try {
            const followerId = req.params.followerId;
            const userId = req.user.id;

            const result = await followService.confirmFollow(followerId, userId);
            res.status(result.status).json({ message: result.message });
        } catch (error) {
            console.error('[acceptFollow]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getSentFollows: async (req, res) => {
        try {
            const userId = req.user.id;
            const follows = await followService.getSentFollows(userId);
            res.json(follows);
        } catch (error) {
            console.error('[getSentFollows]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
}
