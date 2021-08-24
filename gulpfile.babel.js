'use strict';

// Load node module
import gulp      from "gulp"
import pug       from "gulp-pug"
import del       from "del"
import webserver from "gulp-webserver"
import image     from "gulp-image"
import autopf    from "gulp-autoprefixer"
import minify    from "gulp-minify"

const sass = require('gulp-sass')(require('sass'));

// directory
const paths = {
  html: {
    src: "src/*.pug",
    dist: "dist",
    watch: "src/**/*.pug"
  },
  font: {
    src: "src/fonts/*",
    dist: "dist/assets/fonts/"
  },
  img: {
    src: "src/images/*",
    dist: "dist/assets/images"
  },
  scss: {
    src: "src/scss/*.scss",
    dist: "dist/assets/stylesheets/"
  }
}

/*
 * tasks
 */
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
    .src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autopf({
      "overrideBrowserslist": ["last 2 versions"]
    }))
    .pipe(gulp.dest(paths.scss.dist))

// fonts
const fonts = () =>
  gulp
    .src(paths.font.src)
    .pipe(gulp.dest(paths.font.dist))

// clean
const clean = () => del(["dist"])

// watch
const watch = () => {
  gulp.watch(paths.html.watch, pugs)
  // gulp.watch(paths.img.watch, imgs)
  gulp.watch(paths.scss.src , styles)
}

// webserver
const server = () => 
  gulp
    .src("dist")
    .pipe(webserver({
      livereload: true,
      open: true
    }))

/*
 * running tasks
 */
const prepare = gulp.parallel([clean, imgs, fonts])  // before task
const assets = gulp.series([pugs, styles])
const post = gulp.series([server, watch])   // after task

export const dev = gulp.series([prepare, assets, post])
