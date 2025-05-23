'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Rename userId to authorId
        await queryInterface.renameColumn('blogs', 'userId', 'authorId');

        // Remove columns not in the model
        await queryInterface.removeColumn('blogs', 'summary');
        await queryInterface.removeColumn('blogs', 'description');
        await queryInterface.removeColumn('blogs', 'img');

        // Add correct columns from model
        await queryInterface.addColumn('blogs', 'content', {
            type: Sequelize.TEXT,
            allowNull: false
        });

        await queryInterface.addColumn('blogs', 'image', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await queryInterface.addColumn('blogs', 'status', {
            type: Sequelize.STRING,
            defaultValue: 'draft'
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Rollback
        await queryInterface.renameColumn('blogs', 'authorId', 'userId');

        await queryInterface.addColumn('blogs', 'summary', {
            type: Sequelize.STRING(255),
            allowNull: true
        });

        await queryInterface.addColumn('blogs', 'description', {
            type: Sequelize.TEXT,
            allowNull: true
        });

        await queryInterface.addColumn('blogs', 'img', {
            type: Sequelize.STRING(255),
            allowNull: true
        });

        await queryInterface.removeColumn('blogs', 'content');
        await queryInterface.removeColumn('blogs', 'image');
        await queryInterface.removeColumn('blogs', 'status');
    }
};
