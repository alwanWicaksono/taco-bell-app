const express = require('express');
const router = express.Router();

const admin = require('./admin');
const user = require('./user');

router.use('/', admin)
router.use('/users', user)

module.exports = router