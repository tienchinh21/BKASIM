const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Category = require('./Category');

const Blog = sequelize.define('Blog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    summary: DataTypes.STRING,
    img: DataTypes.STRING,
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'blogs',
});

Blog.belongsTo(User, { foreignKey: 'userId', as: 'author' });
User.hasMany(Blog, { foreignKey: 'userId', as: 'blogs' });

Blog.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Blog, { foreignKey: 'categoryId', as: 'blogs' });

module.exports = Blog;
