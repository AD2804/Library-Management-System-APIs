const express = require('express');
const booksRouter = express.Router();
const booksController = require('../controllers/booksController');
const auth = require('../middleware/auth');

booksRouter.use(auth);

// Admin routes
booksRouter.get('/userlist', booksController.getUsers);
booksRouter.get('/list', booksController.getBookList);
booksRouter.post('/add', booksController.addBook);
booksRouter.put('/update/:book_id', booksController.updateBook);
booksRouter.delete('/delete/:id', booksController.deleteBook);

// User routes
booksRouter.get('/listby', booksController.getYourBookList);
booksRouter.post('/enroll', booksController.takeBook);
booksRouter.put('/updatestatus/:book_id', booksController.returnBook);

module.exports = booksRouter;
