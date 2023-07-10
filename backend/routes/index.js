const router = require('express').Router();

const cardRouter = require('./cards');
const userRouter = require('./users');

const { login, createUser } = require('../controllers/users');

const { auth } = require('../middlewares/auth');

const {
  validationCreateUser, validationLogin,
} = require('../middlewares/validation');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);
router.use('/', userRouter);
router.use('/', cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
