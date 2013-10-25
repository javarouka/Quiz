/**
 * Created by javarouka on 13. 10. 24.
 */
requirejs.config({
  baseUrl: "./",
  waitSeconds: 120,
  paths: {
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
    "underscore",
    "jquery",
    "js/model/user",
    "js/view/main",
    "bootstrap"
  ],
  function(_, $, User, View) {
    User.list(function(userList) {
      View.renderUserList(userList, function() {
        // do Some
      });
    });

    $(document.body).on("click", "#reset-info", function() {
      if(!confirm("정말 지우시겠습니까?")) {
        return;
      }
      $.ajax({
        url: '/data/user',
        type: 'DELETE'
      }).always(function() {
          console.log("deleted!");
          window.location.reload(true);
      });
    });
  },
  function errorHandler(err) {
  }
);