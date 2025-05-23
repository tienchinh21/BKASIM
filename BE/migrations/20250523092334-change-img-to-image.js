'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn('blogs', 'img', 'image');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn('blogs', 'image', 'img');
    }
};
