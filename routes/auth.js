const express = require('express');
const router = express.Router();

const { register, login, forgotpassword, resetpasssword } = require('../controllers/auth')

router.post('/register',register);

router.post('/login', login)

router.post('/forgotpassword', forgotpassword);

router.put('/resetpassword/:resetToken', resetpasssword)


module.exports = router;