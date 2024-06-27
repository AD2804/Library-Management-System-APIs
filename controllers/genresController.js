const { Op } = require('sequelize');
const Genres = require('../models/genres');

exports.getGenreList = async (req, res) =>{
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    try {
        const genres = await Genres.findAll();
        res.json(genres);
    } catch (error) {
        console.error('Error getting genres list', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.addGenre = async (req, res) =>{
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    const { name, description } = req.body;
    try {
        const genre = await Genres.create({ name, description});
        res.json(genre);
    } catch (error) {
        console.error('Error adding Genre!!!', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.updateGenre = async (req, res) =>{
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const genre = await Genres.findOne({where: {id}});
        if (!genre) {
            return res.status(404).json({ error: "Genre not found!" });
        }
        genre.name = name;
        genre.description = description;
        await genre.save();
        res.status(201).json({ message: 'Genre updated successfully.', genre });
    } catch (error) {
        console.error('Error updating Genre!!!', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.deleteGenre = async (req, res) =>{
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    const { id } = req.params;
    try {
        const genre = await Genres.findOne({where: {id}});
        if (!genre) {
            return res.status(404).json({ error: "Genre not found!" });
        }
        await genre.destroy();
        res.status(201).json({ message: "Genre deleted successfully." });
    } catch (error) {
        console.error('Error deleting Genre!!!', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};