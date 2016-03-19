/**
 * Created by liuzhentao on 2016/2/23 0023.
 */
var
    gulp = require('gulp'),
    minImage = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache');//图片快取，只有更改过得图片会进行压缩
gulp.task('minImage', function () {
    gulp.src('www/img/*')
        .pipe(cache(minImage({
            optimizationLevel: 5,   //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true,      //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true,       //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true,        //类型：Boolean 默认：false 多次优化svg直到完全优化
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()]       //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('dist/img'));
});