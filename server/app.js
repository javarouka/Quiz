/**
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 7:49
 * To change this template use File | Settings | File Templates.
 */
var express = require('express'),
    passport = require('passport');

var app = express(),
    route = require("./route.js"),
    auth = require('./auth.js');

app.use(express.logger('dev'));

app.use(function staticsPlaceholder(req, res, next) {
  return next();
});

app.use(express.cookieParser());
app.use(express.session({
 secret: 'I am a full-stack developer'
}));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.csrf({
  value: auth.csrf}
));
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.session._csrf);
  next();
});

app.use(app.router);
app.use(express.static(__dirname + '/../app'));

app.use(passport.initialize());
app.use(passport.session());

passport.use(auth.localStrategy);
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

app.post('/login', auth.login);
app.get('/logout', auth.logout);

route.init(app, auth, express);

module.exports = app;

// start app.
app.listen(1980);