'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('users', 'gender', {
            type: Sequelize.BOOLEAN,
            allowNull: true // hoặc false nếu bạn muốn bắt buộc
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('users', 'gender', {
            type: Sequelize.STRING,
            allowNull: true
        });
    }
};
