const mongoose = require('mongoose');

const knjigaSchema = new mongoose.Schema({
    naslov: {type: String, required: true},
    autori: {type: String, required: true},
    izdavac: {type: String, required: true},
    ISBN: {type: String, required: true},
    cena: {type: String, required: true},
    kolicina: {type: String, required: true},
    jezik: {type: String, required: true},
    skola: {type: String, required: true},
    razred: {type: Number, required: true},
    predmet: {type: String, required: true},
    slika: {type: String, required: true}
})

const Knjiga = mongoose.model("Knjiga", knjigaSchema);

module.exports = Knjiga;