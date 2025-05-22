const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    mentorId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    menteeId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'appointments',
});

Appointment.belongsTo(User, { as: 'mentor', foreignKey: 'mentorId' });
Appointment.belongsTo(User, { as: 'mentee', foreignKey: 'menteeId' });

User.hasMany(Appointment, { as: 'appointmentsAsMentor', foreignKey: 'mentorId' });
User.hasMany(Appointment, { as: 'appointmentsAsMentee', foreignKey: 'menteeId' });

module.exports = Appointment;
