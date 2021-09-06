const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/users.js');

const app = express();

app.use(cors());

mongoose.connect('mongodb://mongo:27017/book-db', {useNewUrlParser: true}).then(() => {
    console.log('MongoDB connect success!')
}).catch(err => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.use('/user', userRouter);

module.exports = app