const bookingService = require('../../service/adminService/adminBookingService');

module.exports = {
    getAllBookingsCtrl: async (req, res) => {
        try {
            const { fromDate, toDate, status, page = 1, pageSize = 10 } = req.query;

            const result = await bookingService.getAllBookingsSrv({
                fromDate,
                toDate,
                status,
                page,
                limit: pageSize
            });

            res.json(result);
        } catch (error) {
            console.error('[getAllBookingsCtrl]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    getBookingDetailCtrl: async (req, res) => {
        try {
            const { id } = req.params;

            const booking = await bookingService.getBookingDetailSrv(id);
            if (!booking) return res.status(404).json({ message: 'Không tìm thấy booking' });

            res.json(booking);
        } catch (error) {
            console.error('[getBookingDetailCtrl]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    flagBookingCtrl: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const result = await bookingService.updateBookingStatusSrv(bookingId, req.user.id, 'flagged_by_admin');
            res.json(result);
        } catch (error) {
            console.error('[flagBookingCtrl]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    updateBookingCtrl: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const { bookingTitle, bookingDesc, schedulingTime } = req.body;
            const result = await bookingService.updateBookingInfoSrv(bookingId, {
                bookingTitle,
                bookingDesc,
                schedulingTime
            });
            res.json({ message: 'Cập nhật thành công', data: result });
        } catch (error) {
            console.error('[updateBookingCtrl]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    softDeleteBookingCtrl: async (req, res) => {
        try {
            const bookingId = req.params.id;
            await bookingService.softDeleteBookingSrv(bookingId);
            res.json({ message: 'Đã xoá lịch hẹn (soft delete)' });
        } catch (error) {
            console.error('[softDeleteBookingCtrl]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
};