const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

// Connect to Database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// User Routes
app.use('/worko', userRoutes);

// Basic Route to check if server is running
app.get('/', (req, res) => {
  res.send('Worko API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;