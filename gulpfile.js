import {style} from "./gulp-tasks/style";

function defaultTask(cb) {
    // place code for your default task here
    cb();
}


function watch(){
    gulp.watch('styles/*.sass', style)
}



// Don't forget to expose the task!

exports.watch = watch

exports.default = defaultTask