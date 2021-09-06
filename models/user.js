const mongoose = require('mongoose')
const book = require ('./book');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    password: {type: String, required: true},
    confirmed: {type: Boolean, default: false},
    cart: {type: [book], default: []},
    kupljene: {type: [book], default: []}
});

module.exports = userSchema