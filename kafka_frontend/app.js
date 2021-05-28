let express = require('express');
let path = require('path');
let passport = require('passport');

let users = require('./users');

let app = express();

app.use('/users', users);

app.use(function(req, res, next){
    let err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;