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
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'confirmed', 'cancelled', 'rejected', 'completed', 'flagged_by_admin']]
        }
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: 'bookings'
});

Booking.belongsTo(User, { as: 'createdByUser', foreignKey: 'createdBy' });

module.exports = Booking;
