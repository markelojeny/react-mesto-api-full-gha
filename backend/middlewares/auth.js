const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
