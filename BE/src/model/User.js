const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    avt: DataTypes.STRING,
    gender: DataTypes.STRING,
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    company: DataTypes.STRING,
    field_of_study: DataTypes.STRING,
    job: DataTypes.STRING,
    roleId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'users',
});

User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role'
});
Role.hasMany(User, {
    foreignKey: 'roleId',
    as: 'users'
});

module.exports = User;
