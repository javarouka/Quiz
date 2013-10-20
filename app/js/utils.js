/**
 * Created by javarouka on 13. 10. 20.
 */
define([
    "jquery",
    "underscore"
],function($, _) {
    var $body = $(document.body),
        $indicator = $("<div class='ajax-indicator'>Now Loading...</div>");

    return {
        showIndicator: function() {
            $body.before($indicator);
        },
        hideIndicator: function() {
            $indicator.hide();
        }
    };
});