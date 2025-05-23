const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    }
}, {
    tableName: 'booking_participants'
});

module.exports = BookingParticipants;
