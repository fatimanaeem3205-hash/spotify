const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) 
    return res.status(403).json({ message: 'No authorization token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY_123');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Administrator privileges required.' });
  }
};

module.exports = { verifyToken, verifyAdmin };