const express = require('express')
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/', userController.getAllUsers)
router.get('/userId', userController.getUserByUserId)
router.post('/createCustomer', userController.createCustomer)
router.get('/getAllCustomers', userController.getAllCustomers)
router.get('/getCustomerById', userController.getCustomerById)
router.put('/updateCustomerById/:customerId', userController.updateCustomerById)
router.delete('/deleteCustomer/:customerId', userController.deleteCustomerById)


module.exports = router;