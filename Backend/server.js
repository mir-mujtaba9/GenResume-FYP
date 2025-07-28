// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Load environment variables FIRST
dotenv.config();

// Import Routes
const authRoutes = require('./routes/auth');
// const githubRoutes = require('./routes/github'); // Import the new GitHub router

const app = express();

// --- Middleware Setup ---
// Enable CORS for frontend origin with credentials support
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true // Allows cookies/auth headers to be sent
}));

// Parse cookies attached to the client request
app.use(cookieParser());

// Parse incoming JSON requests
app.use(express.json());


// --- Database Connection ---
const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
  console.error("Error: MONGODB_URI not found in .env file.");
  process.exit(1); // Exit if DB URI is missing
}

mongoose.connect(dbURI, {
  // Remove deprecated options
  // useNewUrlParser: true, // No longer needed
  // useUnifiedTopology: true // No longer needed
})
  .then(() => console.log('MongoDB connected successfully...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

// --- Routes ---
// Basic root route (optional)
app.get('/', (req, res) => {
  res.send("API is running...");
});

// Mount authentication and profile routes under /api
app.use('/api', authRoutes);

// Mount GitHub routes under /api/github
// app.use('/api/github', githubRoutes);

// --- Global Error Handler (Optional but Recommended) ---
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).send('Something broke!');
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;

// Conditionally listen only if the file is run directly (not imported as a module for testing)
if (require.main === module) {
  if (!PORT) {
    console.error("Error: PORT not found in .env file or defaults.");
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export the app for testing