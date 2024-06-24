const express = require('express');
const router = express.Router();
const User = require('@models/User'); // Assuming you have a User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/create-user-and-token', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
