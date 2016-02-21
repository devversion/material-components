var gulp = require('gulp');
var typescript = require('gulp-typescript');
var sass = require('gulp-sass');


gulp.task('typescript', function() {

    var tsProject = typescript.createProject('tsconfig.json');

    return tsProject.src()
        .pipe(typescript(tsProject))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function() {
   return gulp.src('src/**/*.html')
       .pipe(gulp.dest('dist/src'))
});

gulp.task('styles', function() {
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/src'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('src/**/*.ts', ['typescript']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.scss', ['styles']);
});


gulp.task('default', ['typescript', 'html', 'styles']);