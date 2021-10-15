const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/users.js');
const bookRouter = require('./routes/books.js');
const cartRouter = require('./routes/cart.js');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://eknjizara:eknjizara98@cluster0.xfpxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true}).then(() => {
    console.log('MongoDB connect success!')
}).catch(err => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.use('/user', userRouter);
app.use('/api', bookRouter);
app.use('/cart', cartRouter);

module.exports = app