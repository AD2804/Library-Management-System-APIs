const express = require('express');
const searchbookRouter = express.Router();
const searchbookController = require('../controllers/searchbookController');

searchbookRouter.get('/filter', searchbookController.getBooksByFilter);

module.exports = searchbookRouter;