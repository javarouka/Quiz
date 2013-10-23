/**
 * Created by javarouka on 13. 10. 20.
 */
define([
    "jquery", "underscore"
], function($, _) {

    var exports = {};

    exports.exists = function(user, callback) {
        var $promise = $.get("/data/user/" + user.nickname);
        $promise.always(
            function(data) {
                callback((data && data.result && !data.user) ? false : true);
            }
        );
    };

    exports.list = function(user, callback) {
        var $promise = $.get("/data/user/list" + user.nickname);
        $promise.always(
            function(data) {
                callback((data && data.result && !data.user) ? false : true);
            }
        );
    };

    return exports;


});