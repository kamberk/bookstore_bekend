const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/users.js');

const app = express();
const port = 8080;
const host = '0.0.0.0';

app.use(cors());

mongoose.connect('mongodb://mongo:27017/book-db', {useNewUrlParser: true}).then(() => {
    console.log('MongoDB connect success!')
}).catch(err => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.listen(port, host, () => {
    console.log(`Now server is listening on port: ${port}`);
});

app.use('/user', userRouter);