const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
require('dotenv').config();

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  req.user = payload;

  next();
};
