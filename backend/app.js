const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const productsRouter = require('./routes/productsRoute');
const authRouter = require('./routes/authRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/data`));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', authRouter);

app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
