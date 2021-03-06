
/* import express module & other node libraries */
var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var nodemailer = require('nodemailer');


/* import modules for routing */
var indexRouter = require('./routes/indexRouter');
var contactRouter = require('./routes/contactRouter');


/* create the app object */
var app = express();


/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


/* add middleware libraries to the request handling chain */
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views'));
app.use(expressValidator());


/* add route-handling code to the request handling chain */
app.use('/', indexRouter);
app.use('/contact', contactRouter);


/* catch 404 and forward to error handler */
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


/* error handler */
// app.use(function(err, req, res, next) {
//
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


/* export the complete app object */
module.exports = app;
