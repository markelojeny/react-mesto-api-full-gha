const router = require('express').Router();

const {
  validationCreateCard, validationCardId,
} = require('../middlewares/validation');

const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCard);

router.post('/cards', validationCreateCard, createCard);

router.delete('/cards/:cardId', validationCardId, deleteCard);

router.put('/cards/:cardId/likes', validationCardId, likeCard);

router.delete('/cards/:cardId/likes', validationCardId, dislikeCard);

module.exports = router;
