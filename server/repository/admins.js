/**
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 9:11
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
      console.log("1111");
    return _.clone(_.find(admins, function(admin) { return admin.username === username; }));
  }
};
