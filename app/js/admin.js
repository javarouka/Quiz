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


    User.isAdminLogin(function(isLogin) {
        if(!isLogin) {
            View.renderLoginForm({}, function() {

            });
        }
        else {
            User.list(function(userList) {
                View.renderUserList(userList, function() {
                    // do Some
                });
            });
        }
    });

    $(document.body).on("click", "#logout", function() {
      $.ajax({
          url: '/logout',
          type: 'GET'
      }).always(function() {
          View.renderLoginForm({}, function() {

          });
      });
    });

    $(document.body).on("click", "#btnLogin", function(e) {
      $.ajax({
        url: '/login',
        type: 'POST',
        data: {
          username: $("#id").val(),
          password: $("#password").val()
        }
      }).done(function() {
          User.list(function(userList) {
              View.renderUserList(userList, function() {
                  // do Some
              });
          });

      }).fail(function() {
        alert("패스워드와 아이디를 제대로 입력해주세요");
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