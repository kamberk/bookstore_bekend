const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {type: String, required: true},
    cena: {type: String, required: true},
    naziv: {type: String, required: true},
    kolicina: {type: Number, required: true},
    id: {type: String, required: true},
    slika: {type: String, required: true}
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;