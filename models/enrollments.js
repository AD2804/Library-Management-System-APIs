const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'authors',
            key: 'id'
        }
    },
    book_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'books',
            key: 'id'
        }
    },
    enroll_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    return_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull : false
    }
},{
    tableName: 'enrollments',
    timestamps: false
});

module.exports = Enrollment;