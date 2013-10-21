/**
 * Created by javarouka on 13. 10. 20.
 */
define([
    "jquery", "underscore", "highlightjs"
], function($, _, hljs) {

    var $el = {
        middleContents: $("#middle-contents"),
        entryForm: $(".entry-form")
    };

    return {
        $el: $el,
        renderQuizList: function(data, callback) {
            $.get("/tpl/quiz.tpl").then(function(tpl) {
                $el.middleContents.empty();
                var complied = _.template(tpl, data);
                $el.middleContents.html(complied);
                if(_.isFunction(callback)) {
                    callback();
                }
                hljs.tabReplace = '    ';
                hljs.initHighlighting();
            });
        }
    };

});