const express = require('express');
const genresRouter = express.Router();
const genresController = require('../controllers/genresController');
const auth = require('../middleware/auth');

genresRouter.use(auth);

// Admin routes
genresRouter.get('/list', genresController.getGenreList);
genresRouter.post('/add', genresController.addGenre);
genresRouter.put('/update/:id', genresController.updateGenre);
genresRouter.delete('/delete/:id', genresController.deleteGenre);

module.exports = genresRouter;
