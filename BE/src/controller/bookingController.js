const bookingService = require('../service/bookingService');

module.exports = {
    createBooking: async (req, res) => {
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
    getBookingDetail: async (req, res) => {
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
    getMyBookingHistory: async (req, res) => {
        try {
            const userId = req.user.id;
            const bookings = await bookingService.getMyBookingHistorySrv(userId);
            res.json(bookings);
        } catch (error) {
            console.error('[getMyBookingHistory]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
};
