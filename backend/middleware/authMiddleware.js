const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({message:'Missing token'});
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({message:'Invalid token'});
  }
};

exports.authorize = (roles=[]) => (req, res, next) => {
  if (!req.user) return res.status(401).json({message:'Unauthorized'});
  if (Array.isArray(roles) && !roles.includes(req.user.role)) return res.status(403).json({message:'Forbidden'});
  next();
};
