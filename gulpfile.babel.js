'use strict';

//Load node module
import gulp            from "gulp"
import pug             from "gulp-pug"
import del             from "del"
import webserver       from "gulp-webserver"
import image           from "gulp-image"
import autoprefixer    from "gulp-autoprefixer"
import concat          from "gulp-concat"
import ghpages         from "gulp-gh-pages"
import bro             from "gulp-bro"
import babelify        from "babelify"
import pretty          from "gulp-pretty-html"

const sass = require('gulp-sass')(require('sass'))


//directory
const paths = {
  html: {
    src: "src/*.pug",
    dist: "dist",
    watch: "src/**/*.pug"
  },
  font: {
    src: "src/fonts", 
    dist: "dist/assets/fonts"
  },
  img: {
    src: "src/images/*",
    dist: "dist/assets/images"
  },
  scss: {
    src: "src/stylesheets/*.scss",
    dist: "dist/assets/"
  },
  js: {
    src: "src/scripts",
    dist: "dist/assets/"
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
    .pipe(pretty())
    .pipe(gulp.dest(paths.html.dist))

//images
const imgs = () => 
  gulp
    .src(paths.img.src + '/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(image())
    .pipe(gulp.dest(paths.img.dist))

//scss
const styles = () => 
  gulp
    .src(paths.scss.src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({"overrideBrowserslist": ["last 2 versions"]}))
    // .pipe(minicss())
    // .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest(paths.scss.dist))

//script
const js = () => 
gulp
  .src([
    paths.js.src + '/*.js',
    '!' + paths.js.src + '/_*.js'
  ])
  .pipe(bro({
    transform: [
      babelify.configure({ presets: ['@babel/preset-env'] }),
      [ 'uglifyify', { global: true } ]
    ]
  }))
  .pipe(concat('ui.js'))
  .pipe(gulp.dest(paths.js.dist))

//fonts
const fonts = () =>
  gulp
    .src(paths.font.src + '/*.{ttf,woff,woff2}')
    .pipe(gulp.dest(paths.font.dist))

//clean
const clean = () => del(["dist", ".publish"])

//watch
const watch = () => {
  gulp.watch(paths.html.watch, htmls)
  gulp.watch(paths.img.src, imgs)
  gulp.watch(paths.scss.src, styles)
  gulp.watch(paths.js.src, js)
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
const assets = gulp.parallel([htmls, styles, js])
const live = gulp.parallel([server, watch])

export const dev = gulp.series([resourece, assets, live])
export const build = gulp.series([resourece, assets])
export const deploy = gulp.series([build, pages, clean])
