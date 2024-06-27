const { Op } = require('sequelize');
const Books = require('../models/books');
const Genres = require('../models/genres');
const Authors = require('../models/authors');

exports.getBooksByFilter = async (req, res) => {
    const { genre_id, author_id } = req.query;
    try {
        let filter={};
        if (genre_id) {
            const genre = await Genres.findOne({where: {id: genre_id}});
            if (!genre) {
                return res.status(404).json({error: "No Genres found"});
            }
            filter.genre_id = genre_id;
        }

        if (author_id) {
            const author = await Authors.findOne({where: {id: author_id}});
            if(!author) {
                return res.status(404).json({error: "No Author found"});
            }
            filter.author_id = author_id;
        }
        
        const books = await Books.findAll({ where: filter });
        res.json(books);
    } catch (error) {
        console.error('Error fetching books list', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};