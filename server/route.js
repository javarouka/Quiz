/**
 * Router And Controller And Service Complex ???
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 9:09
 */
"use strict";

var quiz = require("./repository/quiz"),
    user = require("./repository/user");

exports.init = function(app, auth/*, express*/) {
    app.get('/', function(req, res) {
        res.writeHead(302, {
            'Location': "/index.html"
        });
        res.end();
    });

    app.get('/data/user/:id', function(req, res) {
        user.findById(req.params.id, function(err, user) {
            res.json({
                result: !err,
                user: user || false
            });
        });
    });

    app.get('/data/quiz/list', function(req, res) {
        res.json({
            result: true,
            list: quiz.list()
        });
    });

    app.get('/data/user/list', function(req, res) {
        user.list(function(err, list){
            res.json({
                result: !err,
                list: list
            });
        });
    });

    app.post('/data/quiz/check', function(req, res) {
        quiz.check(req.body, function(err, result) {
            res.cookie('join', 'true');
            res.json({
                result: err || result
            });
        });
    });

    app.get('/data/quiz/result', auth.ensureAuthenticated, function(req, res) {

    });

};