const { Booking, User, BookingParticipants } = require("../../model");
const { Op } = require("sequelize");

module.exports = {
    updateBookingInfoSrv: async (bookingId, updateData) => {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) throw new Error('Không tìm thấy lịch hẹn');
        await booking.update(updateData);
        return booking;
    },
    softDeleteBookingSrv: async (bookingId) => {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) throw new Error('Không tìm thấy lịch hẹn');
        await booking.update({ isDeleted: true });
        return booking;
    },
    getAllBookingsSrv: async (filters = {}) => {
        const { fromDate, toDate, status, page = 1, limit = 10 } = filters;
        const offset = (page - 1) * limit;

        const whereBooking = { isDeleted: false };
        if (status) whereBooking.status = status;
        if (fromDate || toDate) {
            whereBooking.schedulingTime = {};
            if (fromDate) whereBooking.schedulingTime[Op.gte] = new Date(fromDate);
            if (toDate) whereBooking.schedulingTime[Op.lte] = new Date(toDate);
        }

        const { count, rows } = await Booking.findAndCountAll({
            where: whereBooking,
            include: [
                {
                    model: User,
                    as: 'participants',
                    attributes: ['id', 'name'],
                    through: { attributes: ['role'] }
                },
                {
                    model: User,
                    as: 'createdByUser',
                    attributes: ['id', 'name']
                }
            ],
            order: [['schedulingTime', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        const data = rows.map(b => {
            const booking = b.toJSON();

            // Lấy thông tin role của người tạo trong danh sách participants
            const creatorParticipant = booking.participants.find(p => p.id === booking.createdBy);
            const creatorRole = creatorParticipant?.BookingParticipants?.role || null;

            return {
                id: booking.id,
                bookingTitle: booking.bookingTitle,
                status: booking.status,
                schedulingTime: booking.schedulingTime,
                createdBy: booking.createdBy,
                createdByUser: {
                    id: booking.createdByUser.id,
                    name: booking.createdByUser.name,
                    role: creatorRole
                },
                participants: booking.participants
                    .filter(p => p.id !== booking.createdBy) // loại người tạo
                    .map(p => ({ name: p.name }))
            };
        });

        return {
            total: count,
            page: parseInt(page),
            pageSize: parseInt(limit),
            data
        };
    },
    getBookingDetailSrv: async (id) => {
        const booking = await Booking.findOne({
            where: { id, isDeleted: false },
            include: [
                {
                    model: User,
                    as: 'participants',
                    attributes: ['id', 'name', 'email', 'phone'],
                    through: { attributes: ['role', 'isConfirmed', 'isCompleted'] }
                },
                {
                    model: User,
                    as: 'createdByUser',
                    attributes: ['id', 'name', 'email', 'phone']
                }
            ]
        })
        if (!booking) return null;
        const b = booking.toJSON();
        return {
            id: b.id,
            bookingTitle: b.bookingTitle,
            bookingDesc: b.bookingDesc,
            schedulingTime: b.schedulingTime,
            status: b.status,
            createdBy: b.createdBy,
            createdByUser: b.createdByUser,
            participants: b.participants.map(p => ({
                id: p.id,
                name: p.name,
                email: p.email,
                phone: p.phone,
                role: p.BookingParticipants?.role || null,
                isConfirmed: p.BookingParticipants?.isConfirmed || false,
                isCompleted: p.BookingParticipants?.isCompleted || false
            })),
            createdAt: b.createdAt,
            updatedAt: b.updatedAt
        };
    },
}
