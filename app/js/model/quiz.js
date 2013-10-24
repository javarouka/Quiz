/**
 * Created by javarouka on 13. 10. 20.
 */
define([
    "jquery", "underscore"
], function($, _) {

    var exports = {};

    exports.list = function (cb) {
        $.get("/data/quiz/list").then(function(data) {
            if(_.isFunction(cb)) {
                cb.call(exports, data);
            }
        });
    };

    exports.statistics = function(cb) {
      $.post("/data/quiz/statistics").then(function(data) {
        if(_.isFunction(cb)) {
          cb.call(exports, data);
        }
      });
    };

    exports.check = function(params, cb) {
        $.post("/data/quiz/check", params).then(function(data) {
            if(_.isFunction(cb)) {
                cb.call(exports, data);
            }
        });
    };

    return exports;

});