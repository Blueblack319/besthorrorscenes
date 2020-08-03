"use strict";

import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-csso";
import del from "del";

sass.compiler = require("node-sass");

const routes = {
  scss: {
    watch: "src/scss/*.scss",
    src: "src/scss/style.scss",
    dist: "dist/css",
  },
};

const clean = () => del("dist/");

const watch = () => {
  gulp.watch(routes.scss.watch, scss);
};

const scss = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.scss.dist));

const prepare = gulp.series([clean]);

const assets = gulp.series([scss]);

const live = gulp.parallel([watch]);

export const dev = gulp.series([prepare, assets, live]);
