const { Op } = require('sequelize');
const Books = require('../models/books');
const Genres = require('../models/genres');
const Authors = require('../models/authors');
const Enrollment = require('../models/enrollments');
const User = require('../models/user');

exports.getUsers = async(req, res)=>{
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    try {
        const users = await User.findAll({where: {role: 'user'}});
        res.json(users);
    } catch (error) {
        console.error('Error getting users',error.message, error.stack);
        res.status(500).json({error: "Internel Server error"});
    }
};

exports.getBookList = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    try {
        const books = await Books.findAll();
        res.json(books);
    } catch (error) {
        console.error('Error getting books list', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.addBook = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    const { title, description, author_id, genre_id, published_date, stock } = req.body;
    try {
        const authors = await Authors.findOne({where: {id: author_id}});
        const genres = await Genres.findOne({where: {id: genre_id}});
        if (!authors) {
            return res.status(404).json({ error: 'author not found!'});            
        }
        else if(!genres) {
            return res.status(404).json({ error: 'genre not found!'});
        }
        const books = await Books.create({ title, description, author_id, genre_id, published_date, stock });
        res.json(books);
    } catch (error) {
        console.error('Error adding books!!!', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.updateBook = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    const { book_id } = req.params;
    const { stock } = req.body;
    try {
        const books = await Books.findOne({ where: { id: book_id } });
        if (!books) {
            return res.status(404).json({ error: "Book not found!" });
        }
        books.stock = stock;
        await books.save();
        res.status(201).json({ message: 'Book updated successfully.', books });
    } catch (error) {
        console.error('Error updating book', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.deleteBook = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    const { id } = req.params;
    try {
        const books = await Books.findOne({ where: { id: id } });
        if (!books) {
            return res.status(404).json({ error: "Book not found!" });
        }
        await books.destroy();
        res.status(201).json({ message: "Book deleted successfully." });
    } catch (error) {
        console.error('Error deleting books', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.getYourBookList = async (req, res) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    const user_id = req.user.id;
    try {
        const books = await Enrollment.findAll({ where: { user_id: user_id } });
        res.json(books);
    } catch (error) {
        console.error('Error getting books list', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.takeBook = async (req, res) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    const user_id = req.user.id;
    const { book_id, enroll_date, number = 1 } = req.body;
    try {
        const book = await Books.findOne({ where: { id: book_id } });
        if (!book) {
            return res.status(404).json({ error: 'Book not found!'});
        }
        const status = "pending";
        const enrollDate = new Date(enroll_date);
        const returnDate = new Date(enrollDate.setMonth(enrollDate.getMonth() + 3));
        const enroll = await Enrollment.create({
            user_id: user_id,
            book_id: book_id,
            enroll_date: enroll_date,
            return_date: returnDate,
            status: status
        });
        book.stock -= number;
        await book.save();
        res.status(201).json({ message: "Enrolled successfully.", enroll });
    } catch (error) {
        console.error('Error enrolling your book.', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};

exports.returnBook = async (req, res) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    const user_id = req.user.id;
    const { book_id } = req.params;
    const { status = "returned" } = req.body;
    try {
        const book = await Books.findOne({ where: { id: book_id } });
        const enroll = await Enrollment.findOne({ where: { user_id: user_id, book_id: book_id } });
        if (!enroll) {
            return res.status(404).json({ error: "Book not found." });
        }
        enroll.status = status;
        book.stock += 1;
        await book.save();
        await enroll.save();
        res.json({ message: "Return book successfully.", enroll });
    } catch (error) {
        console.error('Error updating status.', error.message, error.stack);
        res.status(500).json({ error: "Internal Server error" });
    }
};


