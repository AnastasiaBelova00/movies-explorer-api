const router = require('express').Router();

const { userInfoValidation } = require('../middlewares/validation');

const { getCurrentUser, updateUserProfile } = require('../controllers/users');

router.get('/me', getCurrentUser); // возвращает информацию о пользователе (email и имя)

router.patch('/me', userInfoValidation, updateUserProfile); // обновляет информацию о пользователе (email и имя)

module.exports = router;
