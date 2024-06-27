const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Authors = sequelize.define('Authors', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    bio:{
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    tableName: 'authors',
    timestamps: false
});

module.exports = Authors;