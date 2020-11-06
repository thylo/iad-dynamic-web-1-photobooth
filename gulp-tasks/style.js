const gulp = require('gulp');
const sass = require('gulp-sass');

// Define tasks after requiring dependencies

function style() {
  return (
    gulp
      .src("assets/scss/**/*.scss")

      // Use sass with the files found, and log any errors

      .pipe(sass())
      .on("error", sass.logError)
      .pipe(gulp.dest("public/css"))
  );
}

// Expose the task by exporting it

// This allows you to run it from the commandline using

// $ gulp style

module.exports = style;
