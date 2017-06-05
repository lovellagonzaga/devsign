var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    $ = require('gulp-load-plugins')();

var jsSources,
    sassSources,
    htmlSources,
    outputDir;

outputDir = 'builds/';
jsOutputDir = outputDir + 'js/';
cssOutputDir = outputDir + 'css/';

jsSources = [
    'resources/js/jquery-2.2.2.min.js',
    'resources/js/app.js'
];

sassSources = ['resources/scss/styles.scss'];
htmlSources = [outputDir+'*.html'];

gulp.task('js', function(){
    gulp.src(jsSources)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsOutputDir))
        .pipe(connect.reload())
});

gulp.task('sass', function() {
    gulp.src('resources/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(cssOutputDir))
        .pipe(connect.reload())
});

gulp.task('html', function(){
    gulp.src(outputDir+'*.html')
        .pipe(connect.reload())
});

gulp.task('watch', function(){
    gulp.watch(jsSources, ['js']);
    gulp.watch('resources/scss/*.scss', ['sass']);
    gulp.watch(outputDir+'*.html', ['html']);
});

gulp.task('connect', function(){
    connect.server({
        root: outputDir,
        port: 6060,
        livereload: true
    });
});

gulp.task('default', ['js', 'sass', 'html', 'connect', 'watch']);
// EOF
