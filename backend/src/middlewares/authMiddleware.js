const jwt = require('jsonwebtoken');
const User = require('@/models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        const u = await User.findOne({_id: decoded.id, removed: false});
        if (!u) {
            return res.status(401).json({ message: 'Access Denied. User not exists.' });    
        }
        req.user = u; // Attach user data to request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
}

module.exports = authMiddleware;
