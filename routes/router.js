const express = require('express');
const router = express.Router();
const {register} = require('../controllers/register')
const {login} = require('../controllers/login');

router
    .get('/register', register)
    .post('/login', login);


module.exports = router;