const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');
const tempAuthRoutes = require('./routes/authRoutes'); // Import temp auth routes
const authenticateToken = require('./middlewares/authMiddleware');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Temp Auth Routes
app.use('/temp-auth', tempAuthRoutes);

// User Routes
app.use('/worko', authenticateToken, userRoutes);

// Basic Route to check if server is running
app.get('/', (req, res) => {
  res.send('Worko API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
