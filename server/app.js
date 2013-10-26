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
  appPort: 1980,
  staticPath: __dirname + '/../app'
};

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(express.static(config.staticPath));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

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