const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.showItem)
router.get('/:id', userController.detailItem)

module.exports = router