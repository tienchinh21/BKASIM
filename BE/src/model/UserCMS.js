const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserCMS = sequelize.define('UserCMS', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING(255),
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }

}, {
    tableName: 'userCMS',
});

module.exports = UserCMS;
