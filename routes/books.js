const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth.js')
const {createBook} = require('../controllers/book');

router.post('/create', auth, createBook);

module.exports = router;