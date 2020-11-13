const gulp = require("gulp");
const style = require("./gulp-tasks/style");

function watch() {
   gulp.watch("assets/scss/*.scss", style);
}

exports.watch = watch;
exports.default = style;
