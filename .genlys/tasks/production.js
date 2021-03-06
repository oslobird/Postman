var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    filter = require('gulp-filter'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    concat = require("gulp-concat"),
    config = require('../config');

    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    useref = require('gulp-useref'),

gulp.task('production', [
    'font:production',
    'img:production',
    'view:production',
    'compress:production',
])

gulp.task('font:production', function () {
    gulp.src('dev/fonts/**/*.*')
        .pipe(gulp.dest(config.path.production.fonts));
});
gulp.task('img:production', function () {
    gulp.src('dev/images/**/*.*')
        .pipe(gulp.dest(config.path.production.images));
});
gulp.task('models:production', function () {
    gulp.src('dev/models/**/*.*')
        .pipe(gulp.dest(config.path.production.models));
});
gulp.task('view:production', function () {
    gulp.src('dev/*.html')
        // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.path.production.views));
});

gulp.task('compress:production', function () {
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});
    var htmlFilter = filter('**/*.html', {restore: true});
    var notIndexFilter = filter(['**/*.*', '!**/*.html'], {restore: true});

    return gulp.src('dev/*.html')
        .pipe(useref())

        .pipe(jsFilter)
        .pipe(uglify({mangle: false}))
        .pipe(jsFilter.restore)

        .pipe(cssFilter)
        .pipe(cssFilter.restore)

        .pipe(htmlFilter)
        // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(htmlFilter.restore)

        .pipe(notIndexFilter)
        .pipe(rev())
        .pipe(notIndexFilter.restore)

        .pipe(revReplace())

        .pipe(gulp.dest(config.path.production.main));
});