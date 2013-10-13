/**
 * Created with JetBrains WebStorm.
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 9:09
 * To change this template use File | Settings | File Templates.
 */

var quiz = require("./models/quiz");

exports.init = function(app, auth, express) {
    app.get('/', function(req, res) {
        var redirect = "/index.html";
        if(req.isAuthenticated()) {
            redirect = '/quiz.html'
        }
        res.writeHead(302, {
            'Location': redirect
        });
        res.end();
    });

    app.get('/data/quiz/list', auth.ensureAuthenticated, function(req, res) {
        res.json(quiz.list());
    });

    app.get('/data/quiz/check', auth.ensureAuthenticated, function(req, res) {
        res.json({
            score: quiz.check()
        });
    });

    app.get('/data/quiz/solution', auth.ensureAuthenticated, function(req, res) {

    });
};