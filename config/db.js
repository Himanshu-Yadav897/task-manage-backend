// server/config/db.js
const mongoose = require('mongoose');

// Ensure schema validators run on updates
mongoose.set('runValidators', true);
// Enforce strict queries
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
