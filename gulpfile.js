// main dependencies
import gulp from "gulp";
import { create as bsCreate } from "browser-sync";
const browserSync = bsCreate();

// scss minify devendencies
import autoprefixer from "gulp-autoprefixer";
import minifyCss from "gulp-clean-css";
import sourcemaps from "gulp-sourcemaps";
import wait from "gulp-wait";
import cssnano from "gulp-cssnano";
import dependents from "gulp-dependents";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

// javascript minify devpendencies
import terser from "gulp-terser";
import concat from "gulp-concat";
import babel from "gulp-babel";

// image minify dependencies
import imagemin from "gulp-imagemin";

// json minify
import jsonMinify from "gulp-jsonminify";

// html minify
import htmlmin from "gulp-htmlmin";

// util dependencies
import { deleteAsync } from "del";
import { preload } from "./gulp-preload.js";
import { generate } from "./gulp-generate.js";
try {
  require("dotenv").config();
} catch (e) {}

/*  ==================================================
    all core task
    default         build the project for run development mode
    build           build and clean the project
    watch           run in development & browser
    optimize        compress all image, make it suitable for websites
    preload         create a custome preload image file
    make            create a new html, js, scss and json template
================================================== */

gulp.task(
  "default",
  gulp.parallel(minifyDevScss, minifyLibrary, minifyController)
);
gulp.task(
  "build",
  gulp.series(
    clean,
    gulp.parallel(
      minifyProdScss,
      minifyLibrary,
      minifyController,
      minifyHtml,
      // minifyImage,
      minifyJson
    ),
    moveFile,
    moveFolder
  )
);

gulp.task("watch", function (done) {
  browserSync.init({
    files: "index.html",
    server: { baseDir: "./" },
    notify: false,
  });

  // file that need to pack and minify
  gulp.watch("scss/**/*.scss", minifyDevScss);
  gulp.watch("js/controller/*.js", minifyController);
  gulp.watch("js/libs/*.js", minifyLibrary);
  gulp.watch("images/**/**/**/**/*.{png,jpg,jpeg,gif,svg}", autoPreload);

  // file that only require reload browser
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("js/pages/*.js").on("change", browserSync.reload);
  gulp.watch("data/**/*.json").on("change", browserSync.reload);
  gulp.watch("templates/*.html").on("change", browserSync.reload);

  done();
});

gulp.task("optimize", function () {
  return gulp
    .src("./images/**/**/**/*{png,jpg,jpeg,svg}", { base: "./" })
    .pipe(imagemin())
    .pipe(gulp.dest("./"));
});

gulp.task("preload", async function (done) {
  await preload();
});

gulp.task("make", function (done) {
  generate(done);
});

/*  ==================================================
    all minify function
================================================== */

function minifyDevScss() {
  return gulp
    .src("scss/main.scss")
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(dependents())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
}

// FIXME: need improvement,
function minifyProdScss() {
  return (
    gulp
      .src("scss/*.scss")
      .pipe(wait(500))
      // .pipe(sourcemaps.init()) // remove sourcemap
      .pipe(sass().on("error", throwError))
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cssnano())

      // .pipe(sourcemaps.write()) // remove sourcemap
      .pipe(wait(500))
      .pipe(gulp.dest("css"))
  );
}

function minifyController() {
  return gulp
    .src("js/controller/*.js")
    .pipe(
      babel({
        presets: [["@babel/preset-env", { modules: false }]],
      })
    )
    .pipe(concat("scripts.js"))
    .pipe(terser())
    .pipe(gulp.dest("js"))
    .pipe(browserSync.stream());
}

function minifyLibrary() {
  return gulp
    .src([
      "js/libs/jquery.min.js",
      "js/libs/jquery-ui.min.js",
      "js/libs/jquery.ui.touch-punch.min.js",
      "js/libs/jquery.mousewheel.min.js",

      "js/libs/gsap.min.js",
      "js/libs/selectcustomizer.min.js",
      "js/libs/polyfill.min.js",
    ])
    .pipe(
      babel({
        presets: [["@babel/preset-env", { modules: false }]],
      })
    )
    .pipe(concat("library.js"))
    .pipe(terser())
    .pipe(gulp.dest("js"))
    .pipe(browserSync.stream());
}

function minifyImage() {
  return gulp
    .src("./images/**/**/**/*", { base: "./" })
    .pipe(imagemin())
    .pipe(gulp.dest("./dist"));
}

function minifyJson() {
  return gulp
    .src("./data/**/*.json", { base: "./" })
    .pipe(jsonMinify())
    .pipe(gulp.dest("./dist"));
}

function minifyHtml() {
  return gulp
    .src(["./templates/**/**.html", "index.html"], {
      base: "./",
    })
    .pipe(
      htmlmin({
        removeComments: true,
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("./dist"));
}

/*  ==================================================
    all utils function
================================================== */

async function autoPreload() {
  return preload();
}

function clean() {
  return deleteAsync(["build"]);
}

async function moveFile() {
  const fileName = ["js/scripts.js", "js/library.js", "data/**/*.vtt"];

  await fileName.forEach((file) => {
    gulp.src(file, { base: "./" }).pipe(gulp.dest("./dist"));
  });
}

async function moveFolder() {
  const folderName = [
    "js/pages",
    "css",
    "sound",
    "sounds",
    "video",
    "videos",
    "pdf",
    "images",
  ];
  await folderName.forEach((folder) => {
    gulp
      .src("./" + folder + "/**/**/*", { base: "./" })
      .pipe(gulp.dest("./dist"));
  });
}

function throwError(error) {
  return console.log(error);
}
