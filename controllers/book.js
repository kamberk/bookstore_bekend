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

const getBooks = async(req, res, next) => {
    const page = parseInt(req.params.page);
    const limit = 4;
    const skipIndex = (page - 1) * limit;
    const results = {};
    try {
        results.results = await Knjiga.find()
            .sort({_id: 1})
            .limit(limit)
            .skip(skipIndex)
            .exec();
        res.status(200).json(results);
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getAllBooks = async(req, res) => {
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

const getBookBySchool = async(req, res, next) => {
    const page = parseInt(req.params.page);
    const limit = 4;
    const skipIndex = (page - 1) * limit;
    try {
        const Books = await Knjiga.find({'skola': req.params.class}).sort({_id: 1}).limit(limit).skip(skipIndex).exec();
        res.status(200).json(Books);
        next();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getBookByClass = async(req, res, next) => {
    const page = parseInt(req.params.page);
    const limit = 4;
    const skipIndex = (page - 1) * limit;
    try {
        if(req.params.skola === "none") {
            const Books = await Knjiga.find({'razred': req.params.razred}).sort({_id: 1}).limit(limit).skip(skipIndex).exec();
            res.status(200).json(Books);
            next();
        } else {
            
            const Books = await Knjiga.find({'razred': req.params.razred, 'skola': req.params.skola}).sort({_id: 1}).limit(limit).skip(skipIndex).exec();
            res.status(200).json(Books);
            next();
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// const getBookByClass = async(req, res) => {
//     try {
//         Knjiga.find({'skola': req.params.class}, function(err, docs) {
//             if(err) res.status(404).json({message: err.message});
            
//             res.status(200).json({docs});
//         })
//     } catch (error) {
//         res.status(404).json({message: error.message});
//     }
// }

module.exports = {createBook, getCreatedBooks, getBooks, getBookById, getBookBySchool, getAllBooks, getBookByClass}   