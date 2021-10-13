const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const { signup, deleteUser, activateAccount, signin, resetPass, newPassword, updateDeliveryInfo, contact } = require('../controllers/user');

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/deleteUser", auth, deleteUser);
router.get('/activate-acc/:token', activateAccount);
router.post("/restart-password", resetPass);
router.post("/change-password/:token", newPassword);
router.post("/delivery-info", auth, updateDeliveryInfo);
router.post('/contact', contact);

module.exports = router