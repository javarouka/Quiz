/**
 * Created by javarouka on 13. 10. 24.
 */
requirejs.config({
    baseUrl: "./",
    waitSeconds: 120,
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
        "underscore", "bootstrap", "socket.io"
    ],
    function(_, $, io) {
    },
    function errorHandler(err) {
    }
);