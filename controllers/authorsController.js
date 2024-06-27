const { Op } = require('sequelize');
const Authors = require('../models/authors');

exports.getAuthorsList = async (req, res)=>{
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    try {
        const authors = await Authors.findAll();
        res.json(authors);
    } catch (error) {
        console.error('Error getting authors list', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.addAuthor = async (req, res)=>{
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    const { name, bio } = req.body;
    try {
        const author = await Authors.create({ name, bio});
        res.json(author);
    } catch (error) {
        console.error('Error adding Author!!!', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.updateAuthor = async (req, res)=>{
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    const { id } = req.params;
    const { name, bio } = req.body;
    try {
        const author = await Authors.findOne({where: {id}});
        if (!author) {
            return res.status(404).json({ error: "Author not found!" });
        }
        author.name = name;
        author.bio = bio;
        await author.save();
        res.status(201).json({ message: 'Genre updated successfully.', author });
    } catch (error) {
        console.error('Error updating Author detail!!!', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.deleteAuthor = async (req, res) =>{
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    const { id } = req.params;
    try {
        const author = await Authors.findOne({where: {id}});
        if (!author) {
            return res.status(404).json({ error: "Author not found!" });
        }
        await author.destroy();
        res.status(201).json({ message: "Author deleted successfully." });
    } catch (error) {
        console.error('Error deleting Author!!!', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};