var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    del = require('del');


// File paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';

// Styles (For regular CSS)
// gulp.task('styles', function() {
//     console.log('starting styles task');
//
//     return gulp.src(['public/css/reset.css', CSS_PATH])
//         .pipe(plumber(function(err) {
//           console.log('WOAH!!! That wasnt right... there was an error');
//           console.log(err);
//           // internal gulp method that stops all processes, but keeps gulp up
//           this.emit('end');
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer({
//             // will add vendor prefixes for last 2 versions of all browsers AND ie 8
//             // autoprefixer docs have all of the browsers supported
//             browsers: ['last 2 versions', 'ie 8']
//         }))
//         .pipe(concat('styles.css'))
//         .pipe(minifyCss())
//         // writes info to source file that was acquired when sourcemaps.init was run
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(DIST_PATH))
//         .pipe(livereload());
// });

// Styles (For SCSS)
gulp.task('styles', function() {
    console.log('starting scss task');

    return gulp.src('public/scss/styles.scss')
        .pipe(plumber(function(err) {
            console.log('WOAH!!! That wasnt right... there was an error');
            console.log(err);
            // internal gulp method that stops all processes, but keeps gulp up
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            // will add vendor prefixes for last 2 versions of all browsers AND ie 8
            // autoprefixer docs have all of the browsers supported
            browsers: ['last 2 versions', 'ie 8']
        }))
        // dont need concat and minify because SASS does this for us
        // .pipe(concat('styles.css'))
        // .pipe(minifyCss())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        // writes info to source file that was acquired when sourcemaps.init was run
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

// Scripts
gulp.task('scripts', function() {
    console.log('starting scripts task');

    return gulp.src(SCRIPTS_PATH)
        .pipe(plumber(function(err) {
            console.log('WOAH!!! That wasnt right.... there wasn an error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

// Images
gulp.task('images', function() {
    console.log('starting images task');
});

// Clean DIST directory before build
gulp.task('clean', function() {
    return del.sync([
        DIST_PATH
    ]);
});

// Default task that runs ERRRYTHING at ones
gulp.task('default', ['clean', 'images', 'styles', 'scripts'], function() {
    console.log('starting default task');
});

// HTML
gulp.task('html', function() {
    return gulp.src('public/**/*.html')
        .pipe(livereload());
});

// Keeps us from having to manually restart the server after every change
gulp.task('watch', ['default'], function() {
    console.log('watch');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch('public/**/*.html', ['html']);
    // gulp.watch(CSS_PATH, ['styles']);
    gulp.watch('public/scss/**/*.scss', ['styles']);
});
