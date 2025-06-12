const bookingService = require('../service/bookingService');

module.exports = {
    createBookingCtrl: async (req, res) => {
        try {
            const { bookingTitle, bookingDesc, schedulingTime, participantInfo, createdByRole } = req.body;

            if (!bookingTitle || !bookingDesc || !schedulingTime || !createdByRole) {
                return res.status(400).json({ message: 'Thiếu thông tin bắt buộc (title, desc, time, role người tạo)' });
            }

            if (!['mentor', 'mentee'].includes(createdByRole)) {
                return res.status(400).json({ message: 'Vai trò người tạo không hợp lệ (chỉ nhận mentor hoặc mentee)' });
            }

            if (!Array.isArray(participantInfo) || participantInfo.length === 0) {
                return res.status(400).json({ message: 'Cần ít nhất một người tham gia' });
            }

            for (const p of participantInfo) {
                if (!p.userId || !p.role || !['mentor', 'mentee'].includes(p.role)) {
                    return res.status(400).json({ message: 'Thông tin người tham gia không hợp lệ' });
                }
            }

            const result = await bookingService.createBookingSrv({
                createdBy: req.user.id,
                bookingTitle,
                bookingDesc,
                schedulingTime,
                participantInfo,
                createdByRole
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
            const userId = req.user.id;

            const booking = await bookingService.getBookingDetailSrv(bookingId, userId);

            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy lịch hẹn' });
            }

            res.status(200).json(booking);
        } catch (error) {
            console.error('[getBookingDetailCtrl]', error);
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
