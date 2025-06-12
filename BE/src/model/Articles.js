const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./ArticleCategories');

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
    summary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'userCMS',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        validate: {
            isIn: [['active', 'inactive']]
        }
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }

}, {
    tableName: 'blogs',
});

Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Blog, { foreignKey: 'authorId', as: 'blogs' });

Blog.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Blog, { foreignKey: 'categoryId', as: 'blogs' });

module.exports = Blog;
