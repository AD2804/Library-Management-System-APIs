const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genres = sequelize.define('Genres', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    tableName: 'genres',
    timestamps: false
});

module.exports = Genres;