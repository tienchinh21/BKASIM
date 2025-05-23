const sequelize = require('../config/database');

const User = require('./User');
const Role = require('./Role');
const Category = require('./Category');
const Blog = require('./Blog');
const Follow = require('./Follow');
const Booking = require('./Booking');
const BookingParticipants = require('./BookingParticipants');

// Associations
User.belongsToMany(Role, { through: 'UserRoles', foreignKey: 'userId', as: 'roles' });
Role.belongsToMany(User, { through: 'UserRoles', foreignKey: 'roleId', as: 'users' });

User.belongsToMany(User, {
    through: Follow,
    as: 'Following',
    foreignKey: 'followerId',
    otherKey: 'followingId'
});

User.belongsToMany(User, {
    through: Follow,
    as: 'Followers',
    foreignKey: 'followingId',
    otherKey: 'followerId'
});

Booking.belongsToMany(User, {
    through: BookingParticipants,
    as: 'participants',
    foreignKey: 'bookingId',
    otherKey: 'userId'
});

User.belongsToMany(Booking, {
    through: BookingParticipants,
    as: 'appointments',
    foreignKey: 'userId',
    otherKey: 'bookingId'
});


module.exports = { sequelize, User, Role, Category, Blog, Follow, Booking, BookingParticipants };
