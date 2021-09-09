const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const {createBook, getBooks, getCreatedBooks} = require('../controllers/book');

router.post('/create', auth, createBook);
router.get('/get-books', getBooks);
router.get('/get-books/my', auth, getCreatedBooks);

module.exports = router;