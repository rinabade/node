const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/register')

router
    .get('/register', register)
    .post('/login', login);


module.exports = router;