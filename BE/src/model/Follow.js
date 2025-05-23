const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Follow = sequelize.define('Follow', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    followerId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    followingId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed'),
        defaultValue: 'pending'
    }
}, {
    tableName: 'Follows',
});

Follow.belongsTo(User, { as: 'Follower', foreignKey: 'followerId' });
Follow.belongsTo(User, { as: 'Following', foreignKey: 'followingId' });

module.exports = Follow;
