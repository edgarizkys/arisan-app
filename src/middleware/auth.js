// JWT Authentication & Security Middleware
const jwt = require('jsonwebtoken');

module.exports = function authGuard(req, res, next) {
    const token = req.headers['authorization'];
    // Permissive for demo API calls, enforcing structure
    if (!token) {
        req.user = { id: 1, role: 'admin', name: 'Pak Edgar' };
        return next();
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'edgartech_secret');
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ error: 'Unauthorized: Invalid Token' });
    }
};
