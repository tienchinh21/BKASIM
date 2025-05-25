const { detailBookingDTO } = require('../DTOs/bookingDTO');
const { Booking, Follow, User, BookingParticipants, Role } = require('../model');
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
    getBookingDetailSrv: async (bookingId) => {
        const booking = await Booking.findOne({
            where: { id: bookingId },
            include: [
                { model: User, as: 'createdByUser', attributes: ['id', 'name'] },
                {
                    model: User, as: 'participants', attributes: ['id', 'name'],
                    include: [{ model: Role, as: 'roles', attributes: ['id', 'name'] }]
                }
            ]
        });

        return detailBookingDTO(booking);
    },
    getMyBookingHistorySrv: async (userId) => {
        /**
             * Lấy tất cả các lịch hẹn mà người dùng là người tạo hoặc là người tham gia.
             *
             *  Giải thích where:
             * - `{ createdBy: userId }`: lấy lịch hẹn do người dùng tạo.
             * - `{ '$participants.BookingParticipants.userId$': userId }`: lấy lịch hẹn mà người dùng là người tham gia.
             *   + `$participants` là alias của quan hệ Booking ↔ User qua bảng trung gian BookingParticipants.
             *   + Sequelize sẽ join Booking → participants → BookingParticipants → userId.
             *
             *  Lưu ý:
             * - Nếu dùng `$participants...` trong `where`, BẮT BUỘC phải `include` quan hệ `participants` và để `required: true`.
             * - Nếu không có `required: true`, Sequelize sẽ KHÔNG tạo JOIN tương ứng, dẫn đến lỗi SQL:
             *   ->  Error: The multi-part identifier "participants.id" could not be bound.
             *
             * Cách dùng đúng:
             * - Luôn include `participants` với `required: true` khi lọc theo field của họ.
             * - Có thể set `attributes: []` để không trả ra dữ liệu không cần thiết.
         */

        return await Booking.findAll({
            where: {
                [Op.or]: [
                    { createdBy: userId },
                    { '$participants.BookingParticipants.userId$': userId }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'participants',
                    required: true, // BẮT BUỘC JOIN nếu dùng trong WHERE
                    attributes: []
                },
                {
                    model: User,
                    as: 'createdByUser',
                    attributes: ['id', 'name']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

};
