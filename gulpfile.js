'use strict';

let gulp = require('gulp'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    fileInclude = require('gulp-file-include'),
    cleancss = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    runSequence = require('run-sequence'),
    reload = browserSync.reload;

let path = {
    build: {
        html: 'build',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/css/**/*.scss',
        img: 'src/img/**/*.*'
    },
    watch: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/css/**/*.scss',
        img: 'src/img/**/*.*'
    },
    clean: 'build/'
};

let config = {
    server: {
        baseDir: "build"
    },
};

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(concat('index.html'))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(fileInclude({
            prefix: '@@'
        }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('css:build', function () {
    return gulp.src(path.src.css)
        .pipe(concat('index.css'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('build', [
    'html:build',
    'css:build',
    'js:build',
    'image:build'
], function () {
    console.log('=====ALL COMPRESSED=====');
});

gulp.task('watch', ['webServer'], function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function (event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('webServer', function () {
    browserSync(config);
});

gulp.task('clean', function () {
    return gulp.src('./build', {read: false})
        .pipe(clean());
});


gulp.task('default', function () {
    runSequence('clean', 'build', 'watch', function () {
        console.log('=====ALL DONE=====')
    });
});