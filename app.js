require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const { errors } = require('celebrate');

const router = require('./routes/index');

const limiter = require('./middlewares/rateLimit');
const centralError = require('./middlewares/centralError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(express.json());

const { PORT = 4000, NODE_ENV, MONGO_DB } = process.env;

mongoose.connect(
  NODE_ENV === 'production' ? MONGO_DB : 'mongodb://127.0.0.1:27017/bitfilmsdb'
);

// cors
app.use(
  cors({
    origin: ['https://nastasya.nomoredomainsicu.ru'],
  })
);

// хелмет от уязвимостей
app.use(helmet());

// лимит запросов
app.use(limiter);

// логгер запросов
app.use(requestLogger);

// подключение роутов
app.use(router);

// логгер ошибок
app.use(errorLogger);

// обработчики ошибок celebrate и миддлвара
app.use(errors());
app.use(centralError);

// слушаем порт
app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
