const bookingService = require('../service/bookingService');

module.exports = {
    createBookingCtrl: async (req, res) => {
        try {
            const { bookingTitle, bookingDesc, schedulingTime, participantIds } = req.body;

            if (!Array.isArray(participantIds) || participantIds.length === 0) {
                return res.status(400).json({ message: 'Cần ít nhất một người được hẹn' });
            }

            const result = await bookingService.createBookingSrv({
                createdBy: req.user.id,
                bookingTitle,
                bookingDesc,
                schedulingTime,
                participantIds
            });

            res.status(201).json(result);
        } catch (error) {
            console.error('[createBooking]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getBookingDetailCtrl: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const booking = await bookingService.getBookingDetailSrv(bookingId);

            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy lịch hẹn' });
            }

            res.json(booking);
        } catch (error) {
            console.error('[getBookingDetail]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    getMyBookingHistoryCtrl: async (req, res) => {
        try {
            const userId = req.user.id;
            const {
                fromDate,
                toDate,
                status,
                page = 1,
                limit = 10
            } = req.query;

            const result = await bookingService.getMyBookingHistorySrv(userId, {
                fromDate,
                toDate,
                status,
                page,
                limit
            });

            res.json(result);
        } catch (error) {
            console.error('[getMyBookingHistory]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    updateBookingStatusCtrl: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const { newStatus } = req.body;
            const userId = req.user.id;

            const result = await bookingService.updateBookingStatusSrv(bookingId, userId, newStatus);
            res.json(result);
        } catch (error) {
            console.error('[updateBookingStatus]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },


};
