require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// connect to Mongo
connectDB();

// CORS + body + cookies
app.use(cors({ origin: 'https://task-manajer.netlify.app', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// route registration
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});


// start server
app.listen(5000, () => console.log('Server running on port 5000'));
