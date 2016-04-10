/*non-gulp devDependencies*/
var browserify = require("browserify");
var critical = require("critical").stream;
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");

/*gulp devDependencies*/
var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var clean-css = require("gulp-clean-css");
var concat = require("gulp-concat");
var htmlmin = require("gulp-htmlmin");
var jshint = require("gulp-jshint");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");

/*task methods*/
task = {
  // critical: function(){
  //   return gulp.src("index.html")
  //     .pipe(critical({base: ./, inline: true, css: ["css/"] }))
  // }, ------- try getting critical to work
  html: function(){
    return gulp.src("index.html")
      .pipe(htmlmin())
      .pipe(gulp.dest("app/"));
  },
  jshint: function(){
    return gulp.src("js/*.js")
      .pipe(jshint())
      .pipe(jshint.reporter("default"));
  },
  sass: function(){
    return gulp.src("scss/*.scss")
      .pipe(sass({includePaths: require("node-bourbon", "node-neat", "node-refills")
        .includePaths}))
      .pipe(gulp.dest("css"));
  },
  scripts: function(){
    return browserify("js/index.js")
      .bundle()
      .pipe(source("app.js"))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(./app/js));
  },
  styles: function(){
    return gulp.src("css/*.css")
      .pipe(concat("stylesheet.css"))
      .pipe(cleanCSS())
      .pipe(gulp.dest("app/css"));
  },
  watch: function(){
    gulp.watch("js/*.js", ["jshint"]);
    gulp.watch("scss/*.scss", ["sass"]);
  }
};

gulp.task("default", ["jshint", "sass", "watch"]);
//gulp.task()
