const router = require('express').Router();

const userRoute = require('./users');
const movieRoute = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');

const {
  userCreateValidation,
  userLoginValidation,
} = require('../middlewares/validation');

const { login, createUser } = require('../controllers/users');

// подключение роутов
router.post('/signup', userCreateValidation, createUser);
router.post('/signin', userLoginValidation, login);

router.use('/users', auth, userRoute);
router.use('/movies', auth, movieRoute);

// если неверный маршрут
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не найдена'));
});

module.exports = router;
