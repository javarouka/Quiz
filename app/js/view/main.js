/**
 * Created by javarouka on 13. 10. 20.
 */
define([
  "jquery",
  "underscore",
  "highlightjs"
], function($, _, hljs) {

  var $el = {
    gateAdmin: $(".gate-admin"),
    middleContents: $("#middle-contents"),
    entryForm: $(".entry-form")
  };

  var template = function(url, data, cb) {
    $.get(url).then(function(tpl) {
      $el.middleContents.slideUp(200, function() {
        var complied = _.template(tpl, data);
        $el.middleContents.html(complied);
        if(_.isFunction(cb)) {
          $el.middleContents.slideDown('fast');
          cb();
        }
      });
    });
  };

  return {
    $el: $el,
    renderQuizList: function(data, callback) {
      template("/tpl/quiz.tpl", data, function() {
        hljs.tabReplace = '    ';
        hljs.initHighlighting();
        if(_.isFunction(callback)) {
          callback();
        }
      });
    },
    renderScore: function(result, callback) {
      template("/tpl/score.tpl", result, callback);
    },
    renderRank: function(callback) {
      template("/tpl/statistics.tpl", {}, callback);
    },
    getInputUserForm: function() {
      return $el.entryForm.serializeObject();
    },
    getQuizAnswers: function() {
      return $el.middleContents.find("form.quiz-form").serializeObject();
    }
  };

});