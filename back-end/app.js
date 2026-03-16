var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//静态文件拦截 包括index.html
app.use(express.static(path.join(__dirname, 'public')));

//所有视图拦截 前端router刷新的后端配合
app.get(['/view', '/view/*'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//所有api的拦截
app.use('/login',loginRouter)
app.use('/api', indexRouter); //具有身份认证

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
