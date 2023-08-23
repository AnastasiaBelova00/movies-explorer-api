require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const { errors } = require('celebrate');

const route = require('./routes');

const centralError = require('./middlewares/centralError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(express.json());

const { PORT = 4000, NODE_ENV, MONGO_DB } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : 'mongoURL');

// cors
app.use(cors());

// хелмет от уязвимостей
app.use(helmet());

// логгер запросов
app.use(requestLogger);

// подключение роутов
app.use(route);

// логгер ошибок
app.use(errorLogger);

// обработчики ошибок celebrate и миддлвара
app.use(errors());
app.use(centralError);

// слушаем порт
app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
