"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var config = {
    pkg: grunt.file.readJSON("package.json"),

    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "img/**",
            "pictures/**",
            "js/**",
            "css/**",
            "index.html",
            "form.html",
            "blog.html",
            "post.html"
          ],
          dest: "build"
        }]
      }
    },

    less: {
      style: {
        files: {
          "build/css/style.css": ["source/less/style.less"]
        }
      }
    },

    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/style.css"
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}", "build/pictures/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },

    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "cmq", "postcss"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  };

  config = require("./.gosha")(grunt, config);

  grunt.initConfig(config);

  grunt.registerTask("default", "build", [
    "clean:build",
    "copy:build",
    "less",
    "cmq",
    "postcss",
    "cssmin",
    "imagemin"
  ]);
};
