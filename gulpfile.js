const { src, dest, task, series, parallel } = require('gulp');
const uglify = require('gulp-uglify');//js压缩
const cssmin = require("gulp-cssmin");//css压缩
const htmlmin = require('gulp-htmlmin');//html压缩
const path = require('path');
const del = require('del');
const platform = process.platform;
let isLinux = platform.startsWith('linux') ? true : false;   //linux
let outPutPath = isLinux ? path.resolve(__dirname, '/var/lib/ebistrategy/earth/resources/ui/default/mrobot') : path.resolve(__dirname, 'D:/EarthResource/ui/default/mrobot')

// build 文件夹清理
task("clean", () => {
  return del([outPutPath], { force: true });
})

task('Htmlmin', () => {

  var options = {

    collapseWhitespace: true,

    collapseBooleanAttributes: true,

    removeComments: true,

    removeEmptyAttributes: true,

    removeScriptTypeAttributes: true,

    removeStyleLinkTypeAttributes: true,

    minifyJS: true,

    minifyCSS: true

  };

  return src('src/*.html')

    .pipe(htmlmin(options))

    .pipe(dest(outPutPath));

});

task("csscompress", () => {
  return src('src/css/*.css')

    .pipe(cssmin())

    .pipe(dest(outPutPath + '/css'));

});

task('jscompress', () => {
  return src('src/js/*.js')
    .pipe(uglify())
    .pipe(dest(outPutPath + '/js'))
});
task('copySvg', () => {
  return src('src/img/*')
    .pipe(dest(outPutPath + '/img'))
});

exports.build = series('clean',parallel('jscompress', 'csscompress', 'copySvg', 'Htmlmin')) 