import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// validates the token and returns req.user info
export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
        throw new Error('Token is not authorized');
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
