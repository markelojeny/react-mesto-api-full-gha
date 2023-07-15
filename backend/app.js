const dotenv = require('dotenv');

dotenv.config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
// const corsProtect = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/errors');

const app = express();

app.use(express.json());

app.use(helmet());

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(cookieParser());
// app.use(corsProtect);

app.use(requestLogger);
app.use(cors({
  origin: [
    'https://mesto.marjen.nomoredo.nomoredomains.work',
    'http://mesto.marjen.nomoredo.nomoredomains.work',
  ],
  exposedHeaders: 'Access-Control-Allow-Origin',
  credentials: true,
}));
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on ${PORT} port`);
});
