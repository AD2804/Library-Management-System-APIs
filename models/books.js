const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Books = sequelize.define('Books', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'authors',
            key: 'id'
        }
    },
    genre_id:{
        type: DataTypes.INTEGER,
        allownull: false,
        references: {
            model: 'genres',
            key: 'id'
        }
    },
    published_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    title:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }    
},{
    tableName: 'books',
    timestamps: false
});

module.exports = Books;