/**
 * Created with JetBrains WebStorm.
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 9:11
 * To change this template use File | Settings | File Templates.
 */
'use strict';
var _ = require('lodash');

var quiz = [
  {
    id: 1,
    title: '이 중 다른 셋과 동작이 다른 언어 하나를 고르시오',
    answers: [
      "Java",
      "Go",
      "Groovy",
      "Scala"
    ],
    solution: 1
  },
  {
    id: 1,
    title: '자바스크립트의 특성이 아닌 것을 고르시오',
    answers: [
      "객체지향 언어",
      "함수형 언어",
      "선언형 언어",
      ""
    ],
    solution: 1
  }
];

module.exports = {
  findById: function(id) {
    return _.clone(_.find(users, function(user) { return user.id === id }));
  },

  findByUsername: function(username) {
    return _.clone(_.find(users, function(user) { return user.username === username; }));
  }
};
