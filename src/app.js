// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/comment', require('./routes/commentRoutes'));

const PORT = process.env.PORT || 5000;

try {
  mongoose.connect("mongodb+srv://mpmayur2251998:pPRrPoiprPoSQLS9@cluster0.d8n90zu.mongodb.net/blogs?retryWrites=true&w=majority", {
  });

  console.log('Connected to MongoDB');
} catch (error) {
  console.error('MongoDB Connection Error:', error.message);
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
