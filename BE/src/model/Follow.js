const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Role = require('./Role');

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
    },
    targetRoleId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    followerRoleId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: 'follows',
});

// Follow.belongsTo(User, { as: 'Follower', foreignKey: 'followerId' });
// Follow.belongsTo(User, { as: 'Following', foreignKey: 'followingId' });

module.exports = Follow;
