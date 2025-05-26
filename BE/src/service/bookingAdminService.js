const { Booking, BookingParticipants, User } = require('../model');
const { Op } = require('sequelize');

module.exports = {
    getAllBookingsAdminSrv: async ({ status, page = 1, limit = 10 }) => {
        const offset = (page - 1) * limit;
        const whereClause = status ? { status } : {};

        const bookings = await Booking.findAndCountAll({
            where: whereClause,
            include: [
                { model: User, as: 'createdByUser', attributes: ['id', 'name'] },
                { model: User, as: 'participants', attributes: ['id', 'name'], through: { attributes: [] } }
            ],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        return {
            total: bookings.count,
            page: parseInt(page),
            pageSize: parseInt(limit),
            data: bookings.rows
        };
    },
    flagBookingAdminSrv: async (bookingId) => {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) throw new Error('Không tìm thấy lịch hẹn');

        booking.status = 'flagged_by_admin';
        await booking.save();

        return { message: 'Đã gắn cờ lịch hẹn', status: booking.status };
    },

    deleteBookingAdminSrv: async (bookingId) => {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) throw new Error('Không tìm thấy lịch hẹn');

        await BookingParticipants.destroy({ where: { bookingId } });
        await booking.destroy();

        return { message: 'Lịch hẹn đã bị xoá bởi admin' };
    }
};
