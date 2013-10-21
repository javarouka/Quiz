/**
 * Created by javarouka on 13. 10. 20.
 */
define([
    "jquery",
    "underscore",
    "js/model/quiz",
    "js/model/user",
    "js/view/main",
    "js/utils"
], function($, _, Quiz, User, MainView, Utils) {

    var exports = {};
    var $el = MainView.$el;

    var loadedQuiz = false;

    function bindEvent() {
        $el.entryForm.on("click", "button.open-quiz", function(/*e*/) {
            goQuiz.call(exports);
        });
        $el.middleContents.on("click", "button[type=submit]", function(e) {
            e.preventDefault();
            Quiz.check(MainView.getQuizAnswers(), renderScoreBoard);
        });
    }

    function renderQuizList(data) {
        MainView.renderQuizList(data, function() {
            $el.entryForm.slideUp('fast');
            loadedQuiz = true;
        });
    }

    function renderScoreBoard(result) {
        MainView.renderScore(result, function() {

        });
    }

    function goQuiz() {
        if(loadedQuiz) {

        }
        else {
            Utils.showIndicator();
            Quiz.list(function(data) {
                renderQuizList(data);
                Utils.hideIndicator();
            }, exports);
        }
    }

    exports.init = function () {
        bindEvent.apply(exports);
    };

    return exports;

});
