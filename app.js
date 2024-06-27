const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
const port = 3000;
app.use(bodyParser.json());

const db = require('./models');

const userRouter = require('./routes/userRoute');
const booksRoute = require('./routes/booksRoute');
const genresRoute = require('./routes/genresRoute'); 
const authorsRoute = require('./routes/authorsRoute');
const searchbookRoute = require('./routes/searchbookRoute');

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use('/user', userRouter);
app.use('/books', booksRoute);
app.use('/genres', genresRoute);
app.use('/authors', authorsRoute);
app.use('/search', searchbookRoute)

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});