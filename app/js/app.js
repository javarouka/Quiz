/**
 * Created with JetBrains WebStorm.
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 9:02
 * To change this template use File | Settings | File Templates.
 */
requirejs.config({
    baseUrl: "./",
    paths: {
        'jquery': [
            'components/jquery/jquery.min'
        ],
        'underscore': [
            'components/underscore/underscore-min'
        ],
        'bootstrap': [
            'components/bootstrap/dist/js/bootstrap.min'
        ]
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});
require(
    [
        "jquery", "underscore", "bootstrap"
    ],
    function($, _) {
        console.log("init app...");
    },
    function errorHandler(err) {
        console.log(err);
    }
);