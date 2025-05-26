const bookingAdminService = require('../service/bookingAdminService');

module.exports = {
    getAllBookingsAdminCtrl: async (req, res) => {
        const { status, page, limit } = req.query;
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const offset = (pageNumber - 1) * pageSize;
        try {
            const data = await bookingAdminService.getAllBookingsAdminSrv({ status, page: pageNumber, limit: pageSize, offset });
            res.json(data);
        } catch (error) {
            console.error('[getAllBookingsAdminCtrl]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },
    flagBookingAdminCtrl: async (req, res) => {
        try {
            const result = await bookingAdminService.flagBookingAdminSrv(req.params.id);
            res.json(result);
        } catch (error) {
            console.error('[flagBookingAdminCtrl]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    },

    deleteBookingAdminCtrl: async (req, res) => {
        try {
            const result = await bookingAdminService.deleteBookingAdminSrv(req.params.id);
            res.json(result);
        } catch (error) {
            console.error('[deleteBookingAdminCtrl]', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
};
