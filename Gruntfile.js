var LIVERELOAD_PORT = 35279,
  liveReloadSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });

module.exports = function(grunt) {

  var destinationName = '<%= pkg.name %>',
    testHostURL = 'localhost',
    livePort = 9000,
    testPort = 9001,
    banner = "/*\n <%= pkg.name %> - Dev on Quiz\n" +
      " create date: <%= grunt.template.today('yyyy-mm-dd') %> */",
    testURLs = [
      'http://'+testHostURL+':'+testPort+'/test.html'
    ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: []
    },
    copy: {
      build: {
        files: [
        ]
      }
    },
//    uglify: {
//      options: {
//        banner: banner
//      },
//      build: {
//        src: [ './app/js/app.js' ],
//        dest: [ './app/js/*.js' ]
//      }
//    },
    watch: {
      live: {
        files: [
          'app/**/*.html',
          'app/**/*.css',
          'app/**/*.js',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: LIVERELOAD_PORT
        }
      },
      scripts: {
        tasks: ['jshint'],
        files: ['./app/js/**/*.js', './server/**/*.js' ],
        options: {
          interrupt: true
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls: testURLs
        }
      }
    },
    connect: {
      options: {
        hostname: testHostURL
      },
      live: {
        options: {
          port: livePort,
          base: "app",
          middleware: function(connect, options) {
            return [
              liveReloadSnippet,
              connect.static(options.base)
            ];
          }
        }
      },
      test: {
        options: {
          port: testPort,
          base: "test"
        }
      }
    },
    open: {
      server: {
        url: 'http://'+testHostURL+':<%= connect.live.options.port %>'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          window: true,
          document: true
        }
      },
      uses_defaults: [ 'app/js/**.js' ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('doHint',
        ['watch:scripts']);

  grunt.registerTask('server',
    ['clean', /*'uglify',*/ 'connect:live', 'open', 'watch:live']);

  grunt.registerTask('test',
    ['clean', 'copy', 'jshint', 'connect:test', 'qunit']);

  grunt.registerTask('build',
    ['clean', 'copy', 'jshint', 'connect:test', 'qunit'*/, 'uglify'*/]);
};
