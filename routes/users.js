const express = require('express');
const router = express.Router();
const { signup, deleteUser, activateAccount, signin } = require('../controllers/user');

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/deleteUser", deleteUser);
router.get('/activate-acc/:token', activateAccount);

module.exports = router