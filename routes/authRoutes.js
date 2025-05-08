//routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

// ── REGISTER ROUTE ──────────────────────────────────────────────────
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // check for existing user
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'User already exists' });

        // hash password
        const hash = await bcrypt.hash(password, 10);

        // create & save
        const user = new User({ name, email, password: hash });
        await user.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Register error', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

// ── LOGIN ROUTE ─────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        // sign JWT
        const payload = { id: user._id, name: user.name };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

        // set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600 * 1000
        });

        return res.json({ message: 'Logged in successfully' });
    } catch (err) {
        console.error('Login error', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.get('/me', auth, (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    });
});

module.exports = router;
