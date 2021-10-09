const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const {createBook, getBooks, getCreatedBooks, getBookById, getBookByClass, getAllBooks} = require('../controllers/book');

router.post('/create', auth, createBook);
router.get('/get-books/:page', getBooks);
router.get('/get-all-books', getAllBooks);
router.get('/get-books/my', auth, getCreatedBooks);
router.get('/get-by-id/:id', getBookById);
router.get('/get-by-class/:class/:page', getBookByClass);

module.exports = router;