var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var fs = require('fs');
var db = require('./db');
require('./passport');

var indexRouter = require('./routes/index');
var uploadsRouter = require('./routes/uploads');
var insertRouter = require('./routes/insert');
var authRouter = require('./routes/authentication');
var user = require('./models/User');

const passport = require('passport');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const jwtAuthenticate= passport.authenticate('jwt', {session: false});

app.use('/', indexRouter);
app.use('/uploads',passport.authenticate('jwt', {session: false}), uploadsRouter);
app.use('/insert',jwtAuthenticate, insertRouter);
app.use('/auth',authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
