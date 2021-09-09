const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    postedBy: String,
    title: {type: String, required: true},
    autori: {type: String, required: true, default: []},
    izdavac: {type: String, required: true},
    tipKorica: {type: String, required: true},
    brojStrana: {type: String, required: true},
    ISBN: {type: String, required: true},
    cena: {type: String, required: true},
    opis: {type: String, required: true},
    slika: {type: String, required: true},
    link: {type: String},
    createdAt: {type: Date, default: new Date()}
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book