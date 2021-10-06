const express = require('express');
const Knjiga = require('../models/knjiga');

const createBook = async(req, res) => {
    const book = req.body;
    const newBook = new Knjiga({...book })
    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

const getBooks = async(req, res) => {
    try {
        const Books = await Knjiga.find();
        res.status(200).json(Books);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getCreatedBooks = async(req, res) => {
    try {
        const Books = await Knjiga.find({email: req.email});
        res.status(200).json(Books);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getBookById = async(req, res) => {
    try {
        const Books = await Knjiga.findById(req.params.id);
        res.status(200).json(Books);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {createBook, getCreatedBooks, getBooks, getBookById}   