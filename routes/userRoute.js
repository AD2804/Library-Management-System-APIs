const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');


userRouter.post('/register', userController.userRegistration);
userRouter.post('/login', userController.userLogin);


module.exports = userRouter;