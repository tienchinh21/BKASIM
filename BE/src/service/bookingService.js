const { Booking, Follow, User } = require('../model');
const { Op } = require('sequelize');

module.exports = {
    createBookingSrv: async ({ createdBy, bookingTitle, bookingDesc, schedulingTime, participantIds }) => {
        const booking = await Booking.create({
            createdBy,
            bookingTitle,
            bookingDesc,
            schedulingTime
        });

        const participants = participantIds.map(userId => ({
            bookingId: booking.id,
            userId
        }));

        await BookingParticipants.bulkCreate(participants);

        return booking;
    },

    /**
     * Xem chi tiết một booking
     */
    getBookingDetailSrv: async (bookingId) => {
        const booking = await Booking.findOne({
            where: { id: bookingId },
            include: [
                { model: User, as: 'createdByUser', attributes: ['id', 'name'] },
                { model: User, as: 'receiver', attributes: ['id', 'name'] }
            ]
        });

        return booking;
    },

    /**
     * Lấy lịch sử booking có liên quan đến user (đã tạo hoặc được hẹn)
     */
    getMyBookingHistorySrv: async (userId) => {
        return await Booking.findAll({
            where: {
                [Op.or]: [
                    { createdBy: userId },
                    { receiverId: userId }
                ]
            },
            include: [
                { model: User, as: 'receiver', attributes: ['id', 'name'] },
                { model: User, as: 'createdByUser', attributes: ['id', 'name'] }
            ],
            order: [['createdAt', 'DESC']]
        });
    }
};
