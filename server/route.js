/**
 * Created with JetBrains WebStorm.
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 9:09
 * To change this template use File | Settings | File Templates.
 */

exports.init = function(app, auth, express) {
  app.get('/', function(req, res) {
    res.send('hello!');
  });

  app.get('/quiz', auth.ensureAuthenticated, function(req, res) {
    res.send('hello!');
  });
};