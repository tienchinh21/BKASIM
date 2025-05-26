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

        // Thêm người được mời với isConfirmed = false
        const participants = participantIds.map(userId => ({
            bookingId: booking.id,
            userId,
            isConfirmed: false
        }));

        // Thêm chính người tạo vào luôn với isConfirmed = true
        participants.push({
            bookingId: booking.id,
            userId: createdBy,
            isConfirmed: true
        });

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
    getMyBookingHistorySrv: async (userId, filters = {}) => {
        const { fromDate, toDate, status, page = 1, limit = 10 } = filters;

        const offset = (page - 1) * limit;

        const whereBooking = {
            [Op.or]: [
                { createdBy: userId },
                { '$participants.BookingParticipants.userId$': userId }
            ]
        };

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
                    required: true,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
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

        const data = rows.map(booking => {
            const isCreator = booking.createdBy === userId;
            const bookingData = booking.toJSON();

            if (isCreator) {
                return {
                    ...bookingData,
                    participants: bookingData.participants
                };
            } else {
                return {
                    id: bookingData.id,
                    title: bookingData.bookingTitle,
                    description: bookingData.bookingDesc,
                    startTime: bookingData.schedulingTime,
                    endTime: bookingData.schedulingTime,
                    status: bookingData.status,
                    createdByUser: bookingData.createdByUser,
                    createdAt: bookingData.createdAt,
                    updatedAt: bookingData.updatedAt
                };
            }
        });

        return {
            total: count,
            page: parseInt(page),
            pageSize: parseInt(limit),
            data
        };
    },
    updateBookingStatusSrv: async (bookingId, userId, newStatus) => {
        const booking = await Booking.findByPk(bookingId, {
            include: [{ model: User, as: 'participants' }]
        });

        if (!booking) throw new Error('Không tìm thấy lịch hẹn');

        const isCreator = booking.createdBy === userId;
        const isParticipant = booking.participants.some(p => p.id === userId);

        const allowedStatuses = ['confirmed', 'rejected', 'cancelled', 'completed', 'flagged_by_admin'];
        if (!allowedStatuses.includes(newStatus)) {
            throw new Error('Trạng thái không hợp lệ');
        }

        // Người tạo huỷ lịch
        if (newStatus === 'cancelled') {
            if (!isCreator) throw new Error('Chỉ người tạo mới được huỷ lịch');
            booking.status = 'cancelled';
            await booking.save();
            return { message: 'Đã huỷ lịch hẹn', status: booking.status };
        }

        // Người được mời từ chối
        if (newStatus === 'rejected') {
            if (!isParticipant) throw new Error('Bạn không thuộc lịch hẹn này');
            const participant = await BookingParticipants.findOne({ where: { bookingId, userId } });
            if (!participant) throw new Error('Không tìm thấy người tham gia');

            participant.isConfirmed = false;
            await participant.save();

            booking.status = 'rejected';
            await booking.save();

            return { message: 'Bạn đã từ chối lịch hẹn', status: booking.status };
        }

        // Người được mời xác nhận tham gia
        if (newStatus === 'confirmed') {
            if (!isParticipant) throw new Error('Bạn không thuộc lịch hẹn này');
            const participant = await BookingParticipants.findOne({ where: { bookingId, userId } });
            if (!participant) throw new Error('Không tìm thấy người tham gia');

            participant.isConfirmed = true;
            await participant.save();

            // Kiểm tra xem tất cả người được mời đã xác nhận chưa
            const allParticipants = await BookingParticipants.findAll({ where: { bookingId } });
            const allConfirmed = allParticipants.every(p => p.isConfirmed);

            if (allConfirmed) {
                booking.status = 'confirmed';
                await booking.save();
                return { message: 'Tất cả đã xác nhận. Lịch hẹn đã được xác nhận.', status: booking.status };
            }

            return { message: 'Đã xác nhận tham gia. Chờ người khác.', status: booking.status };
        }
        if (newStatus === 'completed') {
            if (!isParticipant && !isCreator) throw new Error('Bạn không có quyền hoàn thành');
            const participant = await BookingParticipants.findOne({ where: { bookingId, userId } });
            if (!participant) throw new Error('Không tìm thấy người tham gia');

            if (participant.isCompleted) {
                return { message: 'Bạn đã đánh dấu hoàn thành rồi', status: booking.status };
            }

            participant.isCompleted = true;
            await participant.save();

            const allParticipants = await BookingParticipants.findAll({ where: { bookingId } });
            const allCompleted = allParticipants.every(p => p.isCompleted);

            if (allCompleted) {
                booking.status = 'completed';
                await booking.save();
                return { message: 'Tất cả đã hoàn thành. Lịch hẹn đã kết thúc.', status: booking.status };
            }

            return { message: 'Bạn đã đánh dấu hoàn thành. Chờ người khác.', status: booking.status };
        }

        // Admin gắn cờ
        if (newStatus === 'flagged_by_admin') {
            if (!isCreator) throw new Error('Chỉ admin hoặc người tạo mới có thể gắn cờ');
            booking.status = 'flagged_by_admin';
            await booking.save();
            return { message: 'Lịch hẹn đã được gắn cờ bởi admin', status: booking.status };
        }

        throw new Error('Không xử lý được trạng thái này');
    },
};
