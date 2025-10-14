const { verifyToken } = require('../utils/tokenUtil');

module.exports = (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header) return res.status(401).json({ message: 'No token provided' });

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid token format' });

    const token = parts[1];
    const payload = verifyToken(token);
    req.user = payload; // payload should contain id, role, etc.
    next();
  } catch (err) {
    console.error('Auth middleware err:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
