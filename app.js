var createError = require('http-errors');
var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/database.js')

var homepageRouter = require('./routes/homepage');
var searchRouter = require('./routes/search');
var recommendationsRouter = require('./routes/recommendations');
var detailedMovieRouter = require('./routes/detailedMovie')

var app = express();

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
