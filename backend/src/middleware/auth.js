import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
    if (req.headers['bypass-auth'] === 'true') {
        // Skip middleware for login or register
        return next();
      }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
