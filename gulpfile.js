/*non-gulp devDependencies*/
var browserify = require("browserify"); //bundle js files together for build
var critical = require("critical").stream; //create critical path css to inline
var buffer = require("vinyl-buffer"); //convert streaming vinyl files to use as buffers
var source = require("vinyl-source-stream"); //use text streams at start of gulp/vinyl pipelines.

/*gulp devDependencies*/
var gulp = require("gulp"); //task manager
var autoprefixer = require("gulp-autoprefixer"); //prefix css
var cleanCSS = require("gulp-clean-css"); //minify css
var concat = require("gulp-concat"); //join files together
var htmlmin = require("gulp-htmlmin"); //minify html
var jshint = require("gulp-jshint"); //js linter
var rename = require("gulp-rename"); //rename files w/o breaking things
var sass = require("gulp-sass"); //sass transpiler
var sequence = require("gulp-sequence"); //execute gulp tasks in sequence.
var uglify = require("gulp-uglify"); //minify js files.

/*task methods*/
tasks = {
  // critical: function(){
  //   return gulp.src("index.html")
  //     .pipe(critical({base: "shopping-list-2/", inline: true}))
  //     .pipe(gulp.dest("app/index.html"));
  // },
  html: function(){
    return gulp.src("index.html")
      //.pipe(critical({base: "shopping-list-2/", inline: true, css: ["app/css/stylesheet.css"]}))
      //.pipe(htmlmin({collapseWhitespace: true}))
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
        .includePaths, includePaths: require('node-neat').includePaths, includePaths: require("node-refills").includePaths}))
      .pipe(gulp.dest("css"));
  },
  scripts: function(){
    return browserify("js/index.js")
      .bundle()
      .pipe(source("app.js"))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest("./app/js"));
  },
  styles: function(){
    return gulp.src("css/*.css")
      .pipe(concat("stylesheet.css"))
      .pipe(cleanCSS())
      .pipe(autoprefixer({browsers: ["last 2 versions"]}))
      .pipe(gulp.dest("app/css"));
  },
  watch: function(){
    gulp.watch("js/*.js", ["jshint"]);
    gulp.watch("scss/*.scss", ["sass"]);
  }
};

/*Individual tasks*/
gulp.task("critical", tasks.critical);
gulp.task("html", tasks.html);
gulp.task("jshint", tasks.jshint);
gulp.task("sass", tasks.sass);
gulp.task("scripts", tasks.scripts);
gulp.task("styles", tasks.styles);
gulp.task("watch", tasks.watch);

/*Tasks for build process*/
//default task to watch/lint/transpile js and scss files.
gulp.task("default", function(cb){sequence("jshint", "sass", "watch", cb); });

//critical css test
gulp.task("critical", ["build"], function(cb){
  critical.generate({
    inline: true,
    base: "shopping-list-2/",
    src: "index.html",
    css: ["app/css/stylesheet.css"],
    dest: "app/index.html"
  });
});

//build task to lint/transpile/concat/minify all files to app folder.
gulp.task("build", function(cb){sequence("jshint", "sass", "html", "scripts",
  "styles", cb); });
