const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    avt: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    company: DataTypes.STRING,
    fieldOfStudy: DataTypes.STRING,
    job: DataTypes.STRING,
    phone: DataTypes.STRING,
}, {
    tableName: 'users',
});
module.exports = User;
