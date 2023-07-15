const router = require('express').Router();
const cookieParser = require('cookie-parser');

const {
  validationUpdateProfile,
  validationUpdateAvatar,
  validationGetUser,
} = require('../middlewares/validation');

const {
  getUsers, getUserById, getUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.use(cookieParser());

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.get('/users/:userId', validationGetUser, getUserById);

router.patch('/users/me', validationUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
