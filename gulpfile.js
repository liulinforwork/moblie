'use strict';

// 引入 gulp
var gulp = require('gulp');

//- LESS编译
var less = require('gulp-less');
//- 压缩CSS为一行；
var minifyCss = require('gulp-minify-css');
//- 压缩JS为一行；
var uglify = require('gulp-uglify');
//- images
var imagemin = require('gulp-imagemin');
//- html
var htmlmin = require('gulp-htmlmin');


// CSS处理
gulp.task('less', function() {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'));                         //- 输出文件本地
});


// JS处理
gulp.task('js', function() {
    gulp.src('./src/js/*/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));                          //- 输出文件本地
});


// img处理
gulp.task('images', function () {
    gulp.src('src/img/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});


gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/pages/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/pages'));
});


gulp.task('default',['less','js','images','html'],function (){});