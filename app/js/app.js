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
        $el.entryForm.on("click", "button.open-quiz", function() {
            goQuiz.call(exports);
            $el.entryForm.slideUp('fast');
        });
    }

    function renderQuizList(data) {
        MainView.renderQuizList(data);
        loadedQuiz = true;
    }

    function goQuiz() {
        if(loadedQuiz) {

        }
        else {
            Quiz.list(renderQuizList, exports);
        }
    }

    exports.init = function () {
        bindEvent.apply(exports);
    };

    return exports;

});
