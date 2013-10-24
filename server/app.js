/**
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 7:49
 * To change this template use File | Settings | File Templates.
 */
var express = require('express'),
    passport = require('passport'),
    io = require('socket.io');

var app = express(),
    route = require("./route.js"),
    auth = require('./auth.js'),
    datasource = require("./datasource.js").init();

var config = {
  appPort: 10000,
  staticPath: __dirname + '/../app'
};

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
app.use(app.router);

app.use(express.csrf({
    value: auth.csrf}
));
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

app.use(express.static(config.staticPath));

app.use(passport.initialize());
app.use(passport.session());

passport.use(auth.localStrategy);
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

app.post('/login', auth.login);
app.get('/logout', auth.logout);

route.init(app, auth, express);

module.exports = app;

// start app and websocket.
var server = app.listen(config.appPort);
var ioConn = io.listen(server);
ioConn.sockets.on('connection', function (socket) {
  socket.emit('onConnection', { $s: socket });
});