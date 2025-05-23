const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Role = require('./role');
const Category = require('./Category');
const Blog = require('./Blog');
const Follow = require('./Follow');
const Booking = require('./Booking');
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


module.exports = { sequelize, User, Role, Category, Blog, Follow, Booking };
