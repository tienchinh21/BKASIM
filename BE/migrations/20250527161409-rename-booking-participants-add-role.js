'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // 1. Đổi tên bảng
        await queryInterface.renameTable('booking_participants', 'bookingParticipants');

        // 2. Thêm cột role
        await queryInterface.addColumn('bookingParticipants', 'role', {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['mentor', 'mentee']]
            },
            defaultValue: 'mentee' // tránh lỗi khi có dữ liệu cũ
        });
    },

    down: async (queryInterface, Sequelize) => {
        // 1. Xóa cột role
        await queryInterface.removeColumn('bookingParticipants', 'role');

        // 2. Đổi lại tên bảng
        await queryInterface.renameTable('bookingParticipants', 'booking_participants');
    }
};
