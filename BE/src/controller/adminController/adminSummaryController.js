const summaryService = require('../../service/adminService/adminSummaryService');

module.exports = {
    getLatestUsersCtrl: async (req, res) => {
        try {
            const users = await summaryService.getLatestUsersSrv();
            res.status(200).json(users);
        } catch (error) {
            console.error('[getLatestUsersCtrl]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    getLatestBookingsCtrl: async (req, res) => {
        try {
            const bookings = await summaryService.getLatestBookingsSrv();
            res.status(200).json(bookings);
        } catch (error) {
            console.error('[getLatestBookingsCtrl]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
};
