const User = require("./User");
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    bookingTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookingDesc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    schedulingTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'bookings'
});

Booking.belongsTo(User, { as: 'createdByUser', foreignKey: 'createdBy' });
Booking.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

module.exports = Booking;
