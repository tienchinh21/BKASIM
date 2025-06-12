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
    },
    isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['mentor', 'mentee']]
        }
    }
}, {
    tableName: 'bookingParticipants'
});

module.exports = BookingParticipants;
