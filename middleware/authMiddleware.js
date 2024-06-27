const jwt = require('jsonwebtoken');
const secret = process.env.JWTSECURITY; // Usa una variable de entorno en producción

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado.' });
  }

  try {
    // jwt.verify throws an error if the token is invalid
    const decoded = jwt.verify(token.split(" ")[1], secret); // Handle "Bearer <token>"
    req.userId = decoded.id; // Access the user ID (adjust field as needed)
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
