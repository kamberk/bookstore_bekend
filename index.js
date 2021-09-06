const express = require('express');
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/users.js';

const app = express();
const port = 8080;
const host = '0.0.0.0';
app.use(bodyParser.json({limit: "100mb", extended: true}));
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
    console.log(`Now listening on port: ${port}`);
});

app.use('/user', userRouter);