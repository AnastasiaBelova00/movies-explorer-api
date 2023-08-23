require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const helmet = require('helmet');

const { errors } = require('celebrate');

const route = require('./routes/route');

const centralError = require('./middlewares/centralError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(express.json());

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

// // cors
// app.use(
//   cors({
//     origin: [''],
//   })
// );

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
