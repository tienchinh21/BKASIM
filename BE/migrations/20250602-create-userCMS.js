'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('userCMS', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('(NEWID())'),
                allowNull: false,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            fullName: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            status: {
                type: Sequelize.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active',
            },
            roleId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'NO ACTION',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('GETDATE()'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('GETDATE()'),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('userCMS');
        await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_userCMS_status";`);
    }
};
