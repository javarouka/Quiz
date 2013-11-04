/**
 * Created by javarouka on 13. 10. 20.
 */
define([
  "jquery",
  "underscore",
  "socket.io",
  "js/model/quiz",
  "js/model/score",
  "js/model/user",
  "js/view/main",
  "js/utils",
  "js/model/prototype-test"
], function($, _, io, Quiz, Score, User, MainView, Utils) {

  var MESSAGE = {
    fillUserForm: "퀴즈 사용자 정보를 전부 입력해주세요",
    invalidEmail: "이메일을 정확히 입력하세요",
    duplicateUser: "중복 닉네임이 존재합니다. 두번 참여할 수 없습니다.",
    alreadyClear: "이미 참가하셨습니다"
  };

  var exports = {};
  var $el = MainView.$el;

  var loadedQuiz = false;

  var startTime, endTime;

  function beAbleToGoQuiz() {
    return !loadedQuiz;
  }

  function bindEvent() {
    $el.entryForm.on("submit", function(e) {
      e.preventDefault();
    });
    $el.entryForm.find("button.open-quiz").on("click", function(/*e*/) {
      goQuiz.call(exports);
    });
    $el.entryForm.find("button.view-rank").on("click", function(/*e*/) {
      goRank.call(exports);
    });
    $el.middleContents.on("click", "button[type=submit]", function(e) {
      e.preventDefault();
      endTime = +new Date();
      Quiz.check(
        ($.extend(
          MainView.getInputUserForm(),
          MainView.getQuizAnswers(),
          {
            elapseTime: endTime - startTime
          }
        )),
        renderScoreBoard
      );
    });
  }

  exports.showMessage = function(msg) {
    alert(msg);
  };

  function checkExistUser(callback) {
    var user = MainView.getInputUserForm();
    if(!_.isFunction(callback)) {
      return;
    }
    if(!user.email || !user.gender) {
      callback(new Error(MESSAGE.fillUserForm));
    }
    else if(!(/\S+@\S+\.\S+/.test(user.email))) {
      callback(new Error(MESSAGE.invalidEmail));
    }
    else {
      User.exists(user, function(exists) {
        callback(
          (exists ? new Error(MESSAGE.duplicateUser) : null), user
        );
      });
    }
  }

  function renderQuizList(data) {
    MainView.renderQuizList(data, function() {
      $el.entryForm.slideUp('fast');
      loadedQuiz = true;
      startTime = +new Date();
    });
  }

  function renderScoreBoard(result) {
    MainView.renderScore(result, function(data) {
      console.log("result complete");
    });
  }

  function goRank() {
    Utils.showIndicator();
    Score.statistics(function(data) {
      MainView.renderRank(data, function() {
        Utils.hideIndicator();
      });
    }, exports);
  }

  function goQuiz() {
    if(beAbleToGoQuiz()) {
      Utils.showIndicator();
      checkExistUser(function(err){
        if(err) {
          Utils.hideIndicator();
          exports.showMessage(err.message);
        }
        else {
          Quiz.list(function(data) {
            renderQuizList(data);
            Utils.hideIndicator();
          }, exports);
        }
      });
    }
  }

  exports.init = function () {
    bindEvent.apply(exports);
  };

  return exports;

});
