const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validatorMiddleware');
const { validateUser } = require('../dtos/userDto');

const router = express.Router();

router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/user/:userId', authenticateToken, userController.getUserById);
router.post('/user', userController.createUser);
router.put('/user/:userId', authenticateToken, validate(validateUser), userController.updateUser);
router.patch('/user/:userId', authenticateToken, validate(validateUser), userController.updateUser);
router.delete('/user/:userId', authenticateToken, userController.softDeleteUser);

module.exports = router;
