const jwt = require('jsonwebtoken');
const {  createErrorResponse } = require('../utility/responseHandler');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Bearer token

  if (!token) {
    return res.status(401).json(createErrorResponse( 'No token provided, authorization denied'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(createErrorResponse('Invalid or expired token'));
  }
};

module.exports = authMiddleware;
