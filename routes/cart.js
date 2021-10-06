const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const {getCartItems, addToCart, clearCart, removeOneItem} = require('../controllers/cart');

router.get('/get-items', auth, getCartItems);
router.post('/add-to-cart/:id', auth, addToCart);
router.get('/clear', auth, clearCart);
router.get('/remove/:id', auth, removeOneItem);

module.exports = router;