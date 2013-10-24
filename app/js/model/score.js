/**
 * Created by javarouka on 13. 10. 24.
 */
/**
 * Created by javarouka on 13. 10. 20.
 */
define([
  "jquery", "underscore"
], function($, _) {

  var exports = {};

  exports.statistics = function(cb) {
    $.get("/data/statistics").then(function(data) {
      if(_.isFunction(cb)) {
        cb.call(exports, data);
      }
    });
  };

  return exports;

});
