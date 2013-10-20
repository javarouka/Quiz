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
        'app': "js/app",
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
        "app", "underscore", "bootstrap"
    ],
    function(App) {
        App.init();
    },
    function errorHandler(err) {
        console.log(err);
    }
);