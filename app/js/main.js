/**
 * Created with JetBrains WebStorm.
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 9:02
 * To change this template use File | Settings | File Templates.
 */
requirejs.config({
    baseUrl: "./",
    waitSeconds: 120,
    paths: {

         // Application
        'app': "js/app",

        // requirejs plugins
        'async' : '../components/requirejs-plugins/src/async',
        'propertyParser' : '../components/requirejs-plugins/src/propertyParser',
        'goog' : '../components/requirejs-plugins/src/goog',

        // ext modules
        'highlightjs': [
          'components/highlightjs/highlight.pack'
        ],
        'jquery': [
            'components/jquery/jquery.min'
        ],
        'crosscutting': [
            'components/crosscutting/build/crosscutting.min'
        ],
        'underscore': [
            'components/underscore/underscore-min'
        ],
        'bootstrap': [
            'components/bootstrap/dist/js/bootstrap.min'
        ],
        'socket.io': '/socket.io/socket.io'
    },
    shim: {
        'socket.io': {
            exports: 'io'
        },
        'underscore': {
            exports: '_'
        },
        'highlightjs': {
          exports: 'hljs'
        },
        'crosscutting': {
            exports: 'crosscutting'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});
require(
    [
        "app",
        "crosscutting",
        "underscore",
        "bootstrap",
        'goog!visualization,1,packages:[corechart,geochart]'
    ],
    function(App, AOP) {
        AOP.before(App, true, function(option) {
            console.log("execute ## " + option.method);
        });
        App.init();
    },
    function errorHandler(err) {
        (console.error || console.log).call(console, err);
    }
);