/**
 * Created by javarouka on 13. 10. 20.
 */
define([
    "jquery",
    "underscore"
],function($, _) {
    var $body = $(document.body),
        $indicator = $("<div class='ajax-indicator'>Now Loading...</div>");

    // add jQuery function
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    return {
        showIndicator: function() {
            $body.before($indicator);
        },
        hideIndicator: function() {
            $indicator.hide();
        }
    };
});