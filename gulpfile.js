// 引入 gulp
var gulp = require('gulp');

// LESS编译
var less = require('gulp-less');
//- 压缩CSS为一行；
var minifyCss = require('gulp-minify-css');
//- 多个文件合并为一个；
var concat = require('gulp-concat');
//- 压缩JS为一行；
var uglify = require('gulp-uglify');
//- 对文件名加MD5后缀
var rev = require('gulp-rev');
//- 路径替换
var revCollector = require('gulp-rev-collector');
//- 重命名
var rename = require('gulp-rename');
//- 清除文件
var clean = require('gulp-clean');
//- 压缩html
var minifyHTML   = require('gulp-minify-html');


// CSS处理
gulp.task('less', function() {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('./dist/css'))                          //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev/css'));                          //- 将 rev-manifest.json 保存到 rev 目录内
});


// JS处理
gulp.task('scripts', function() {
    gulp.src('./src/js/*/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        // .pipe(gulp.dest('./dist'));

        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('./dist/js'))                          //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev/js'));                          //- 将 rev-manifest.json 保存到 rev 目录内
});


gulp.task('rev', function () {
    return gulp.src(['./rev/**/*.json', './src/pages/*.html'])
        .pipe( revCollector({
            replaceReved:true,
            dirReplacements: {
                'css': 'css',
                '/js/': '/js/',
                'cdn/': function(manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }) )
        .pipe(minifyHTML({
            empty:true,
            spare:true
        }))
        .pipe( gulp.dest('./dist/pages') );
});


// 默认任务
gulp.task('default', function(){
    gulp.run('less','rev','scripts');

    // // 监听文件变化
    gulp.watch('./src/pages/*.html', function(){
        gulp.run('less','rev','scripts');
    });
});