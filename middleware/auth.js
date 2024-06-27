// auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('Token:', token);
        if (!token) {
            return res.status(401).json({ error: 'Please authenticate.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
        console.log('Decoded:', decoded);
        const user = await User.findByPk(decoded.id);
        console.log('User:', user);
        if (!user) {
            return res.status(401).json({ error: 'Please authenticate.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
