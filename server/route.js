/**
 * 퀴즈 Repository
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 9:09
 */
"use strict";

var quiz = require("./repository/quiz");
exports.init = function(app, auth/*, express*/) {
    app.get('/', function(req, res) {
//        res.writeHead(302, {
//            'Location': (!req.isAuthenticated() ? "/index.html" : "/quiz.html")
//        });
//        res.end();
        res.writeHead(302, {
            'Location': "/index.html"
        });
        res.end();
    });

    app.get('/data/quiz/list', function(req, res) {
        res.json({
            result: true,
            list: quiz.list()
        });
    });

    app.get('/data/quiz/check', auth.ensureAuthenticated, function(req, res) {
        res.json({
            score: quiz.check()
        });
    });

    app.get('/data/quiz/solution', auth.ensureAuthenticated, function(req, res) {

    });

};