const router = require('express').Router();

const {
  movieCreateValidation,
  movieDeleteValidation,
} = require('../middlewares/validation');

const {
  getAllMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getAllMovies); // возвращает все сохранённые текущим пользователем фильмы

router.post('/', movieCreateValidation, createMovie); // создаёт фильм

router.delete('/:movieId', movieDeleteValidation, deleteMovieById); // удаляет сохранённый фильм по id

module.exports = router;
