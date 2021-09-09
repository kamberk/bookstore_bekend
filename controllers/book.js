const express = require('express');
const Book = require('../models/book');

const router = express.Router();

const createBook = async(req, res) => {
    const book = req.body;
    const newBook = new Book({...book, postedBy: req.email, createdAt: new Date().toISOString() })
    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

module.exports = {createBook}   