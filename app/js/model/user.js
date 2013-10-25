/**
 * Created by javarouka on 13. 10. 20.
 */
define([
    "jquery", "underscore"
], function($, _) {

    var exports = {};

    exports.exists = function(user, callback) {
        var $promise = $.get("/data/user/" + user.email);
        $promise.always(
            function(data) {
                callback((data && data.result && !data.user) ? false : true);
            }
        );
    };

    exports.list = function(callback) {
        var $promise = $.get("/data/user-list");
        $promise.always(
            function(data) {
                callback((data && data.result && data.list) ? data : {});
            }
        );
    };

    return exports;


});