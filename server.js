require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Allow Netlify frontend to access backend
app.use(cors({
  origin: 'https://task-manajer.netlify.app',
  credentials: true
}));

// ✅ Middleware for JSON, cookies
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Routes
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// ✅ Debug log for each request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
