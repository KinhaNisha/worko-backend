const userService = require('../services/userService');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
  try {
    const { email, name, age, city, zipCode } = req.body;
    
    // Create new user
    const user = new User({ email, name, age, city, zipCode });
    await user.save();

    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const softDeleteUser = async (req, res) => {
  try {
    const user = await userService.softDeleteUser(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, getUserById, getAllUsers, updateUser, softDeleteUser };
