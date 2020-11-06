const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
// Define tasks after requiring dependencies

function style() {
  console.log(path.join(__dirname,"/public/css"));
  return (
    gulp
      .src("assets/scss/**/*.scss")

      // Use sass with the files found, and log any errors

      .pipe(sass())
      .on("error", sass.logError)
      .pipe(gulp.dest(path.join(__dirname,"..","/public/css")))
  );
}

// Expose the task by exporting it

// This allows you to run it from the commandline using

// $ gulp style

module.exports = style;
