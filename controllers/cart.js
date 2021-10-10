const express = require('express');
const Knjiga = require('../models/knjiga');
const Cart = require('../models/cart');

const addToCart = async(req, res) => {
    const {Kolicina, naslov} = req.body;
    try {
        const Book = await Knjiga.findById(req.params.id);
        // const naziv = Book.naziv;
        const cena = Book.cena;
        const img = Book.slika;
        const kolicina = Kolicina;
        const id = Book._id;
        const user = req.email;
        const newCart = new Cart({user: user, cena: cena*kolicina, naziv: naslov, kolicina: kolicina, id: id, slika: img});
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getCartItems = async(req, res) => {
    try {
        const cartItems = await Cart.find({user: req.email});
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const removeOneItem = async(req, res) => {
    try {
        const item = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const clearCart = async(req, res) => {
    try {
        const cartItems = await Cart.deleteMany({user: req.email});
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {addToCart, getCartItems, clearCart, removeOneItem};