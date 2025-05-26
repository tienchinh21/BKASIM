const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Booking = require('./Booking');

const BookingParticipants = sequelize.define('BookingParticipants', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    bookingId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'booking_participants'
});

module.exports = BookingParticipants;
