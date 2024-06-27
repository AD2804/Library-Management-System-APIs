const express = require('express');
const authorsRouter = express.Router();
const authorsController = require('../controllers/authorsController');
const auth = require('../middleware/auth');

authorsRouter.use(auth);

// Admin routes
authorsRouter.get('/list', authorsController.getAuthorsList);
authorsRouter.post('/add', authorsController.addAuthor);
authorsRouter.put('/update/:id', authorsController.updateAuthor);
authorsRouter.delete('/delete/:id', authorsController.deleteAuthor);

module.exports = authorsRouter;
