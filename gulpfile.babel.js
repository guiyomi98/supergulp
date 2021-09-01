'use strict';

//Load node module
import gulp            from "gulp"
import pug             from "gulp-pug"
import del             from "del"
import webserver       from "gulp-webserver"
import image           from "gulp-image"
import autoprefixer    from "gulp-autoprefixer"
import minicss         from "gulp-csso"
import ghpages         from "gulp-gh-pages"
import rename          from "gulp-rename"


const sass = require('gulp-sass')(require('sass'));

//directory
const paths = {
  html: {
    src: "src/*.pug",
    dist: "dist",
    watch: "src/**/*.pug"
  },
  font: {
    src: "src/fonts/*",
    dist: "dist/assets/fonts"
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
//htmls
const htmls = () => 
  gulp
    .src(paths.html.src)
    .pipe(pug({
      //pretty: true
    }))
    .pipe(gulp.dest(paths.html.dist))

//images
const imgs = () => 
  gulp
    .src(paths.img.src)
    .pipe(image())
    .pipe(gulp.dest(paths.img.dist))

//scss
const styles = () => 
  gulp
    .src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({"overrideBrowserslist": ["last 2 versions"]}))
    .pipe(gulp.dest(paths.scss.dist))

const minify = () => 
gulp
  .src(paths.scss.dist + "styles.css")
  .pipe(minicss())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest(paths.scss.dist))

//fonts
const fonts = () =>
  gulp
    .src(paths.font.src)
    .pipe(gulp.dest(paths.font.dist))

//clean
const clean = () => del(["dist", ".publish"])

//watch
const watch = () => {
  gulp.watch(paths.html.watch, htmls)
  gulp.watch(paths.img.src, imgs)
  gulp.watch(paths.scss.src, styles)
}

//deploy
const pages = () =>
  gulp
    .src("dist/**/*")
    .pipe(ghpages())

//webserver
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
const resourece = gulp.series([clean, imgs, fonts])
const assets = gulp.parallel([htmls, styles])
const live = gulp.parallel([server, watch])

export const dev = gulp.series([resourece, assets, live])
export const build = gulp.series([resourece, assets, minify])
export const deploy = gulp.series([build, pages, clean])
