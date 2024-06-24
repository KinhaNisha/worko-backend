const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel'); // Assuming your user model is in models/userModel

dotenv.config();

const router = express.Router();

router.post('/create-user-and-token', async (req, res) => {
  try {
    const { email, name, age, city, zipCode } = req.body;
    
    // Create new user
    const user = new User({ email, name, age, city, zipCode });
    await user.save();

    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
