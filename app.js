const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./config/database.js')
require('dotenv').config();

const homepageRouter = require('./routes/homepage');
const searchRouter = require('./routes/search');
const recommendationsRouter = require('./routes/recommendations');
const detailedMovieRouter = require('./routes/detailedMovie')
const watchlistRouter = require('./routes/watchlist')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homepageRouter);
app.use('/', searchRouter);
app.use('/', recommendationsRouter);
app.use('/', detailedMovieRouter);
app.use('/', watchlistRouter);

// test database
db.authenticate().then(()=>{
  console.log('Connnection has been established successfully');
}).catch((err)=>{
  console.error('Unable to connect to database:', err);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
