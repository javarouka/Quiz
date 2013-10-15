/**
 * Created with JetBrains WebStorm.
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 9:11
 * To change this template use File | Settings | File Templates.
 */
'use strict';
var _ = require('lodash');

var admins = [
  {
    id: 1,
    username: 'admin',
    password: 'pass',
    role: 'ADMIN'
  }
];

module.exports = {
  findById: function(id) {
    return _.clone(_.find(admins, function(admin) { return admin.id === id }));
  },

  findByUsername: function(username) {
    return _.clone(_.find(admins, function(admin) { return admin.username === username; }));
  }
};
