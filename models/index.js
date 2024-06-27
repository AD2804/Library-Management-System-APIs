const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Books = require('./books');
const Enrollment = require('./enrollments');
const Authors = require('./authors');
const Genres = require('./genres');

const db = {
    User,
    Books,
    Enrollment,
    Authors,
    Genres
};

Books.belongsTo(Authors, { foreignKey: 'author_id' });
Authors.hasMany(Books, { foreignKey: 'author_id' });

Books.belongsTo(Genres, { foreignKey: 'genre_id' });
Genres.hasMany(Books, { foreignKey: 'genre_id' });

Enrollment.belongsTo(Books, { foreignKey: 'book_id' });
Books.hasMany(Enrollment, { foreignKey: 'book_id' });

Enrollment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Enrollment, { foreignKey: 'user_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;