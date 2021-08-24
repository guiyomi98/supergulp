'use strict';

// node module
import gulp from "gulp"
import pug from "gulp-pug"
import del from "del"
import webserver from "gulp-webserver"
import image from "gulp-image"
import autoprefixer from "gulp-autoprefixer"
import minify from "gulp-minify"

const sass = require('gulp-sass')(require('sass'));

// directory
const paths = {
  html: {
    src: "src/*.pug",
    dist: "dist",
    watch: "src/**/*.pug"
  },
  img: {
    src: "src/images/*",
    dist: "dist/assets/img"
  }
}

// htmls
const pugs = () => 
  gulp
    .src(paths.html.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.html.dist))

// images
const imgs = () => 
  gulp
    .src(paths.img.src)
    .pipe(image())
    .pipe(gulp.dest(paths.img.dist))

// scss
const styles = () => 
  gulp
    .src("src/scss/styles.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest("dist/assets/stylesheets/styles.css"))

// clean
const clean = () => del(["dist"])

// watch
const watch = () => {
  gulp.watch(paths.html.watch, pugs)
  // gulp.watch(paths.img.watch, imgs)
  gulp.watch('src/scss/*.scss', styles)
}

// webserver
const server = () => 
  gulp
    .src("dist")
    .pipe(webserver({
      livereload: true,
      open: true
    }))


const prepare = gulp.series([clean, imgs])

const assets = gulp.series([pugs, styles])

const post = gulp.series([server, watch])

// develop oreder
export const dev = gulp.series([assets, post])
