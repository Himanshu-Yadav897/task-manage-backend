// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;  // match what you used in authRoutes

module.exports = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      console.log('🚫 No token in cookies');
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
    //   console.log('✅ Authenticated user:', decoded);
      req.user = decoded;
      next();
    } catch (err) {
      console.log('❌ Invalid token');
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
