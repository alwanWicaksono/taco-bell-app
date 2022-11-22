const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login)
router.post('/register', adminController.register)
router.get('/items', adminController.showItem)
router.get('/items/:id', adminController.detailItem)
router.post('/items', adminController.addItem)
router.delete('/items/:id', adminController.deleteItem)
router.put('/items/:id', adminController.editItem)
router.get('/categories', adminController.showCategory)
router.get('/categories/:categoryId', adminController.detailCategory)
router.post('/categories', adminController.addCategory)
router.delete('/categories/:categoryId', adminController.deleteCategory)
router.put('/categories/:categoryId', adminController.editCategory)

module.exports = router