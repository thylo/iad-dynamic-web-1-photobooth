const gulp = require('gulp');
const style = require("./gulp-tasks/style");

function watch() {
  gulp.watch("styles/*.sass", style);
}

exports.watch = watch;
exports.default = style;