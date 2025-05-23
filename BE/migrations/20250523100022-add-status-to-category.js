'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('categories', 'status', {
            type: Sequelize.STRING,
            defaultValue: 'active',
            allowNull: true
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('categories', 'status');
    }
};
