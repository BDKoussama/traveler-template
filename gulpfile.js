// --------------------------------------------
// Dependencies
// --------------------------------------------
var autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    del = require('del'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    webpack = require('webpack-stream'),
    minifycss = require('gulp-minify-css'),
    minifyJs = require('gulp-minify'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    images = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

// paths
var styleSrc = 'source/sass/**/*.sass',
    styleDest = 'public/assets/css/',
    htmlSrc = 'source/',
    htmlDest = 'public/',
    vendorSrc = 'source/js/vendors/',
    vendorDest = 'public/assets/js/',
    scriptSrc = 'source/js/*.js',
    scriptDest = 'public/assets/js/';


// --------------------------------------------
// Stand Alone Tasks                           |
// --------------------------------------------


// Compiles all SASS files
gulp.task('sass', function () {
    gulp.src('source/sass/**/*.sass')
        .pipe(plumber())
        .pipe(sass({
            style: 'compressed'
        }))
        .pipe(postcss([autoprefixer({
            browsers: 'last 2 versions, > 2%'
        })]))
        .pipe(rename({
            basename: 'main'
        }))
        .pipe(gulp.dest('public/assets/css'));
});


gulp.task('images', function () {
    gulp.src('source/img/*')
        .pipe(images())
        .pipe(gulp.dest('public/assets/img'));
});

// transpile Es6 (webpack / babel)
gulp.task('scripts', function () {
    return gulp.src('source/js/app.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('public/assets/js'));
});

//Concat and Compress Vendor .js files
gulp.task('vendors', function () {
    gulp.src(
            [
                'source/js/vendors/jquery.min.js',
                'source/js/vendors/*.js'
            ])
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js'));
});


// Watch for changes
gulp.task('watch', function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        notify: false
    });

    gulp.watch(styleSrc, ['sass']);
    gulp.watch(scriptSrc, ['scripts']);
    gulp.watch(vendorSrc, ['vendors']);
    gulp.watch(['public/*.html', 'public/assets/css/*.css', 'public/assets/js/*.js', 'public/assets/js/vendors/*.js']).on('change', browserSync.reload);

});


// use default task to launch Browsersync and watch JS files
gulp.task('default', ['sass', 'scripts', 'vendors', 'watch'], function () {});