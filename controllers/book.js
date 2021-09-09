const express = require('express');
const Book = require('../models/book');

const router = express.Router();

const createBook = async(req, res) => {
    const book = req.body;
    const newBook = new Book({...book, postedBy: req.name, createdAt: new Date().toISOString() })
    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

const getBooks = async(req, res) => {
    try {
        const Books = await Book.find();
        res.status(200).json(Books);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getCreatedBooks = async(req, res) => {
    try {
        const Books = await Book.find({email: req.email});
        res.status(200).json(Books);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {createBook, getCreatedBooks, getBooks}   