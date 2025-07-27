const jwt = require('jsonwebtoken');
const User = require('@/models/User');
const UserPassword = require('@/models/UserPassword');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 1. Check if user still exists
        const user = await User.findOne({ _id: decoded.id, removed: false });
        if (!user) {
            return res.status(401).json({ message: 'Access Denied. User does not exist.' });
        }

        if (!user.googleId) {
            const userPassword = await UserPassword.findOne({ user: user._id });
            if (!userPassword?.loggedSessions?.includes(token)) {
                return res.status(401).json({ message: 'Access Denied. Token expired or user logged out.' });
            }
        }

        // Attach user info to request
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
