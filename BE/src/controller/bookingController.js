const bookingService = require('../service/bookingService');

module.exports = {
    /**
     * Tạo cuộc hẹn với người khác (mentor hoặc mentee)
     */
    createBooking: async (req, res) => {
        try {
            const { receiverId } = req.params;
            const { bookingTitle, bookingDesc, schedulingTime } = req.body;

            const result = await bookingService.createBookingSrv({
                createdBy: req.user.id,
                receiverId,
                bookingTitle,
                bookingDesc,
                schedulingTime
            });

            res.status(201).json(result);
        } catch (error) {
            console.error('[createBooking]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    /**
     * Xem chi tiết một lịch hẹn
     */
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

    /**
     * Lấy tất cả lịch hẹn mà tôi tạo hoặc tôi là người được hẹn
     */
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
