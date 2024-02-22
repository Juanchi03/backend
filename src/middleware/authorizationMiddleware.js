

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  };
  
  const isUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
      return next();
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = { isAdmin, isUser };
  