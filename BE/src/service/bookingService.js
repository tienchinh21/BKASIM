const { Booking, Follow, User } = require('../model');
const { Op } = require('sequelize');

module.exports = {
    /**
     * Tạo cuộc hẹn nếu đã follow nhau 2 chiều
     */
    createBookingSrv: async ({ createdBy, receiverId, bookingTitle, bookingDesc, schedulingTime }) => {
        // Kiểm tra kết nối follow 2 chiều
        const hasMutualFollow = await Follow.findOne({
            where: {
                followerId: createdBy,
                followingId: receiverId,
                status: 'confirmed'
            },
            include: [{
                model: Follow,
                as: 'reverse',
                required: true,
                where: {
                    followerId: receiverId,
                    followingId: createdBy,
                    status: 'confirmed'
                }
            }]
        });

        if (!hasMutualFollow) {
            throw new Error('Hai người chưa follow nhau 2 chiều – không thể đặt lịch.');
        }

        // Tạo booking
        const booking = await Booking.create({
            createdBy,
            receiverId,
            bookingTitle,
            bookingDesc,
            schedulingTime,
            status: 'pending'
        });

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
