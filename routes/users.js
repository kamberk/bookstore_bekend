const express = require('express');
const router = express.Router();
const { signup, deleteUser, activateAccount, signin, resetPass, newPassword } = require('../controllers/user');

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/deleteUser", deleteUser);
router.get('/activate-acc/:token', activateAccount);
router.post("/restart-password", resetPass);
router.post("/change-password/:token", newPassword);

module.exports = router