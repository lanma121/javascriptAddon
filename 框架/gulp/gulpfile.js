/**
 *  gulp.src(globs[, options])//该任务针对的文件 . 传回的串流(stream)让它成为非同步机制，所以在我们收到完成通知之前，确保该任务已经全部完成。
 *  gulp.dest(path[, options])  //将管道中的数据写入到文件夹。
 *  gulp.task(name[, deps], fn) //使用orchestrator定义任务。
 *      deps 是任务数组，在执行本任务时数组中的任务要执行并完成。
 *  gulp.watch(glob [, opts], tasks), gulp.watch(glob [, opts, cb]) //监控文件。当监控的文件有所改变时执行特定的任务。
 *
 *
 *
 *
 * @type {*|exports|module.exports}
 */

/**
 * gulp-load-plugin
 *  自动地从package.json中加载任意Gulp插件
 *  使用“驼峰式”的方式进行命名（例如，gulp-ruby-sass将被加载成plugins.rubySass）
 *package.json文件如下面所示：
     {
        "devDependencies": {
           "gulp-concat": "~2.2.0",
           "gulp-uglify": "~0.2.1",
           "gulp-jshint": "~1.5.1",
           "gulp": "~3.5.6"
        }
  *
  *
 * @type {*|exports|module.exports}
 */
var plugins = require('gulp-load-plugins')();



//gulp.task('js', function () {
//    return gulp.src('js/*.js')
//        .pipe(plugins.jshint())
//        .pipe(plugins.jshint.reporter('default'))
//        .pipe(plugins.uglify())
//        .pipe(plugins.concat('app.js'))
//        .pipe(gulp.dest('build/'));
//});

var
    requireDir = require('require-dir')('./gulp/tasks'),
    del = require('del'),//多文件删除
    replace = require('gulp-replace'),
    gulpif = require('gulp-if'),
    ignore = require('gulp-ignore');    //https://github.com/robrich/gulp-ignore
    rev = require('gulp-rev');
    livereload = require('gulp-livereload'),//https://github.com/vohof/gulp-livereload 需浏览器安装liveReload插件
    notify = require('gulp-notify'),//更动通知
    rename = require('gulp-rename'),//改变管道中的文件名。
    sourcemaps = require('gulp-sourcemaps'),
    gulp = require('gulp');

gulp.task('help',function () {

    console.log('	gulp build			文件打包');

    console.log('	gulp watch			文件监控打包');

    console.log('	gulp help			gulp参数说明');

    console.log('	gulp server			测试server');

    console.log('	gulp -p				生产环境（默认生产环境）');

    console.log('	gulp -d				开发环境');

    console.log('	gulp -m <module>		部分模块打包（默认全部打包）');

});
gulp.task('default',function () {

    gulp.start('help');

});

/**
 * 清除目的地目录并重建档案
 *
 */
var  clean = require('gulp-clean');
gulp.task('clean', function() {
    return gulp.src(['dist/css', 'dist/js', 'dist/img'], {read: false})//read:false不读取已经被删除的档案
        .pipe(clean());
});

/**
 *
 *字符串替换
 */
gulp.task('templates', function(){
    gulp.src(['file.txt'])
        .pipe(replace(/foo(.{3})/g, '$1foo'))
        .pipe(gulp.dest('build/file.txt'));
});
/**
 * 逻辑判断执行任务
 *
 * @type {*|exports|module.exports}
 */
var condition = true; // TODO: add business logic
gulp.task('task', function() {
    gulp.src('./src/*.js')
        .pipe(gulpif(condition, uglify()))
        .pipe(gulp.dest('./dist/'));
});

/**
 *  过滤文件
 *
 */
gulp.task('ignore', function() {
    gulp.src('./**/*.js')
        .pipe(jshint())
        .pipe(ignore.exclude('./gulpfile.js'))//排除gulpfile.js  ignore.include('./public/**.js')//只包含public中的js
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});
/************************ js 处理 ***********************************************************/

var jshint = require('gulp-jshint');    //侦测javascript代码中错误和潜在问题的工具。
var stylish = require('jshint-stylish');//高亮提示
var uglify = require('gulp-uglify');    //压缩javascript文件，减小文件大小。
gulp.task('jshint', function() {
    return gulp.src('www/js/*.js')
        .pipe(jshint.extract('never'))//'auto|always|never' // 侦测html中的JavaScript
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

var mocha = require('gulp-mocha');
gulp.task('mocha', function() {
    return gulp.src('www/js/*.js')
        .pipe(mocha({reporter: 'nyan'}));
});

var jslint = require('gulp-jslint');//javascript代码质量检测工具。
gulp.task('jslint', function () {
    return gulp.src(['www/js/index.js'])
        // pass your directives
        // as an object
        .pipe(jslint({
            // these directives can
            // be found in the official
            // JSLint documentation.
            node: true,
            evil: true,
            nomen: true,
            // you can also set global
            // declarations for all source
            // files like so:
            global: [],
            predef: [],
            // both ways will achieve the
            // same result; predef will be
            // given priority because it is
            // promoted by JSLint
            // pass in your prefered
            // reporter like so:
            reporter: 'default',
            // ^ there's no need to tell gulp-jslint
            // to use the default reporter. If there is
            // no reporter specified, gulp-jslint will use
            // its own.
            // specify whether or not
            // to show 'PASS' messages
            // for built-in reporter
            errorsOnly: false
        }))
        // error handling:
        // to handle on error, simply
        // bind yourself to the error event
        // of the stream, and use the only
        // argument as the error object
        // (error instanceof Error)
        .on('error', function (error) {
            console.error(String(error));
        });
});




/**
 * js 拼接
 *
 * @type {*|exports|module.exports}
 */
var concat = require('gulp-concat');
gulp.task('concat', function() {
    return gulp.src(['./www/js/a.js','www/js/b.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});
var stripDebug = require('gulp-strip-debug');//删除console日志和debug

gulp.task('stripDebug', function () {
    return gulp.src('www/js/app.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('dist'));
});
/**
 * angularjs
 *
 */
var ngAnnotate = require('gulp-ng-annotate');//添加angularjs依赖注入//https://github.com/olov/ng-annotate
var ngmin = require('gulp-ngmin');//压缩angularjs
gulp.task('ngAnnotate', function () {
    return gulp.src('www/js/app.js')
        .pipe(ngAnnotate())
        .pipe(ngmin())
        .pipe(gulp.dest('dist/js/'));
});

var wrapAmd = require('gulp-wrap-amd');

gulp.task('wrapAmd', function() {
    gulp.src('./www/js/a.js')
        .pipe(wrapAmd({
            deps: ['jade'],          // dependency array
            params: ['jade'],        // params for callback
            exports: 'jade',         // variable to return
            moduleRoot: 'templates/', // include a module name in the define() call, relative to moduleRoot
            modulePrefix: 'rocks/'  // optional, prefix of the module name. It depends on existance of `moduleRoot`
        }))
        .pipe(gulp.dest('./dist/js/'))
});


/*** 模板引擎
 *
 */
var handlebars = require('gulp-handlebars');//https://github.com/lazd/gulp-handlebars
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var path = require('path');
var defineModule = require('gulp-define-module');
gulp.task('templates', function(){
    gulp.src('www/templates/*.hbs')
        // Compile each Handlebars template source file to a template function
        .pipe(handlebars({
            // Pass your local handlebars version
            handlebars: require('handlebars')//require('ember-handlebars')
        }))
        // Define templates as AMD modules
        .pipe(defineModule('amd'))
        //.pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
        //.pipe(declare({
        //    namespace: 'Ember.TEMPLATES',
        //    noRedeclare: true // Avoid duplicate declarations
        //}))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist/js/'));
});

/************************************** css 处理*****************************************************/

var minCss = require('gulp-minify-css'),//https://github.com/murphydanger/gulp-minify-css#user-content-options
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    cssver = require('gulp-make-css-url-version'),// 给css文件里引用url加版本号（根据引用文件的md5生产版本号）
    autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
    var stream = gulp
        .src('app/styles/main.less')
        .pipe(less())
        .pipe(gulp.dest('app/styles/'));
    return stream;
});

/**
 * sass 解析
 *
 */
gulp.task('sass', function() {
    return gulp.src('www/scss/*.scss')
        //.pipe(sourcemaps.init())      //generate source maps for the Sass to CSS compilation
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .on('error', sass.logError)
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css/'))//将会在www/css下生成index.css
        .pipe(minCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            //dirname: "main/text/ciao",//目录名
            //basename: "aloha",        // 文件名
            //prefix: "bonjour-",       // 前缀名
            //suffix: "-hola",          // 后缀名/main/text/ciao/bonjour-aloha-hola.min.css
            extname: '.min.css'         // 文件扩展名
        }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('rev', function () {
    return gulp.src('www/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/assets')); // write manifest to build dir ;
});
//检测CSS
var  csslint = require('gulp-csslint');
gulp.task('lintCss', function(){
    return gulp.src(cssSrc)
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(csslint.failReporter());
});

/** css 压缩
 *
 */
gulp.task('minCss', function () {
    gulp.src('www/css/*.css')
        .pipe(rev())
        .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: false
        }))
        .pipe(minCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});



var spriter = require('gulp-css-spriter');

gulp.task('spriter', function() {
    return gulp.src('./www/css/index.css')
        .pipe(spriter({
            // The path and file name of where we will save the sprite sheet
            'spriteSheet': './dist/images/spritesheet.png',
            // Because we don't know where you will end up saving the CSS file at this point in the pipe,
            // we need a litle help identifying where it will be.
            'pathToSpriteSheetFromCSS': '../images/spritesheet.png'
        }))
        .pipe(gulp.dest('./dist/css'));
});

/************************************** html 处理*****************************************************/

    //将jade 编译为HTML
var jade = require('gulp-jade');
gulp.task('templates', function() {
    var YOUR_LOCALS = {};

    gulp.src('./lib/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./dist/'))
});

/**
 * html 压缩
 * @type {function(): Transform|exports|module.exports}
 */
function getTask(task) {
    return require('./gulp/tasks/' + task)(gulp, plugins)();
}
gulp.task('minHtml', getTask('html-tasks'));
//var minHtml = require('gulp-htmlmin');//https://github.com/kangax/html-minifier#user-content-options-quick-reference
//gulp.task('minHtml', function () {
//    gulp.src('www/templates/*.html')
//        .pipe(minHtml({
//            removeComments: true,       //清除HTML注释
//            collapseWhitespace: true,   //压缩HTML
//            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
//            removeEmptyAttributes: true,        //删除所有空格作属性值 <input id="" /> ==> <input />
//            removeScriptTypeAttributes: true,   //删除<script>的type="text/javascript"
//            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
//            minifyJS: true,//压缩页面JS
//            minifyCSS: true//压缩页面CSS
//        }))
//        .pipe(gulp.dest('dist/html'))
//        .pipe(livereload())
//    ;
//});

/***
 *
 * gulp-usemin
 */
var usemin = require('gulp-usemin');//合并指定 block 中的文件
var minifyHtml = require('gulp-minify-html');
gulp.task('usemin', function() {
    gulp.src('./*.html')
        .pipe(usemin({
            css: [minCss(), 'concat'],
            html: [minifyHtml({empty: true})],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/html'));
});

/******************************** 依赖注入*********************************************/

var inject = require("gulp-inject");
gulp.task('inject', function () {
    var target = gulp.src('./www/templates/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./www/**/*.js', './www/**/*.css'], {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest('dist/html'));
});
var order = require("gulp-order");
var coffee = require("gulp-coffee");
gulp.task('order', function () {
    return gulp
        //.src("www/js/*.coffee")
        //.pipe(coffee())
        .src(["www/**/*.js","!www/js/app.js"])
        .pipe(order(["www/js/index.js","www/**/*.js"]))
        .pipe(concat("all.js"))
        .pipe(gulp.dest('dist/html'));
    });

/***
 * 将bower中的资源注入html
 *
 */
var wiredep = require('wiredep').stream;
gulp.task('bower', function () {
    gulp.src('index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./'));
});
//    <head>
//        <!-- bower:css -->
//        <!-- endbower -->
//    </head>
//    <body>
//        <!-- bower:js -->
//        <!-- endbower -->
//    </body>
//使静态页面具有文件访问能力，实现页面模块复用
var fileInclude = require("gulp-file-include");//https://github.com/coderhaoxin/gulp-file-include
gulp.task('fileInclude', function() {
    gulp.src(['www/templates/fileInclude.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/html'));
});
//fileInclude.html

//<!DOCTYPE html>
//<html>
//<body>
//@@include('./var.html', {
//    "name": "haoxin",
//    "age": 12345,
//    "socials": {
//        "fb": "facebook.com/include",
//        "tw": "twitter.com/include"
//    }
//})
//</body>
//</html>

//var.html
//
//<label>@@name</label>
//<label>@@age</label>
//<strong>@@socials.fb</strong>
//<strong>@@socials.tw</strong>


/**************************************** 图片压缩********************************************/
//var minImage = require('gulp-imagemin'),
//    pngquant = require('imagemin-pngquant'),
//    cache = require('gulp-cache');//图片快取，只有更改过得图片会进行压缩
//gulp.task('minImage', function () {
//    gulp.src('www/img/*')
//        .pipe(cache(minImage({
//            optimizationLevel: 5,   //类型：Number  默认：3  取值范围：0-7（优化等级）
//            progressive: true,      //类型：Boolean 默认：false 无损压缩jpg图片
//            interlaced: true,       //类型：Boolean 默认：false 隔行扫描gif进行渲染
//            multipass: true,        //类型：Boolean 默认：false 多次优化svg直到完全优化
//            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
//            use: [pngquant()]       //使用pngquant深度压缩png图片的imagemin插件
//        })))
//        .pipe(gulp.dest('dist/img'));
//});

/***************************************文件上传与发布********************************************************/
var sftp = require('gulp-sftp');//https://www.npmjs.com/package/gulp-sftp/

gulp.task('sftp', function () {
    return gulp.src('built/*')//打包好的文件上传到远程服务器
        .pipe(sftp({
            host: 'website.com',
            port: '22',
            remotePlatform: 'unix',//windows
            remotePath:'./',
            user: 'johndoe',
            pass: '1234'
        }));
});



/**
 * 改变项目的版本号，将更新提交到 git，以及创建一个 tag
 * 自动发布
 */

var runSequence = require('run-sequence');//让gulp任务，可以相互独立，解除任务间的依赖，增强task复用
var conventionalChangelog = require('gulp-conventional-changelog');
var conventionalGithubReleaser = require('conventional-github-releaser');
var bump = require('gulp-bump');
var gutil = require('gulp-util');
var git = require('gulp-git');
var fs = require('fs');

gulp.task('changelog', function () {
    return gulp.src('CHANGELOG.md', {
        buffer: false
    })
        .pipe(conventionalChangelog({
            preset: 'angular' // Or to any other commit message convention you use.
                            //'angular', 'atom', 'codemirror', 'ember', 'eslint', 'express', 'jquery', 'jscs', 'jshint'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('github-release', function(done) {
    conventionalGithubReleaser({
        type: "oauth",
        token: '0126af95c0e2d9b0a7c78738c4c00a860b04acc8' // change this to your own GitHub token or use an environment variable
    }, {
        preset: 'angular' // Or to any other commit message convention you use.
    }, done);
});

gulp.task('bump-version', function () {
// We hardcode the version change type to 'patch' but it may be a good idea to
// use minimist (https://www.npmjs.com/package/minimist) to determine with a
// command argument whether you are doing a 'major', 'minor' or a 'patch' change.
    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump({type: "patch"}).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', function () {
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('push-changes', function (cb) {
    git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', function (cb) {
    var version = getPackageJsonVersion();
    git.tag(version, 'Created Tag for version: ' + version, function (error) {
        if (error) {
            return cb(error);
        }
        git.push('origin', 'master', {args: '--tags'}, cb);
    });

    function getPackageJsonVersion () {
        // We parse the json file instead of using require because require caches
        // multiple calls so the version number won't be updated
        return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    };
});

gulp.task('release', function (callback) {
    runSequence(
        'bump-version',
        'changelog',
        'commit-changes',
        'push-changes',
        'create-new-tag',
        'github-release',
        function (error) {
            //if (error) {
            //    console.log(error.message);
            //} else {
            //    console.log('RELEASE FINISHED SUCCESSFULLY');
            //}
            //callback(error);
        });
});


// 预设任务
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});


// 看手
gulp.task('watch', function() {

    livereload.listen({port: 1234, basePath: 'dist' });
    gulp.watch('www/templates/*.html', ['minHtml']);
    // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
    //gulp.watch(['dist/**']).on('change', function(file) {
    //    console.log(server)
    //    server();
    //});


    //// 看守所有.scss档
    //gulp.watch('www/scss/*.scss', ['sass']);
    //
    // 看守所有.js档
    gulp.watch('www/js/*.js', ['jshint']);

    //// 看守所有图片档
    //gulp.watch('src/images/**/*', ['images']);


});
/************************************web 服务**************************************************************/
/**
 * 创建 Web Server (with Live Reload)，常用：
 *
 * @type {initSingleton|exports|module.exports}
 */
var browserSync = require('browser-sync');//https://github.com/BrowserSync/gulp-browser-sync

gulp.task('browser-sync', function() {
    browserSync({
        files: ["www/css/*.css","www/js/*.js","www/templates/*.html"],
        //proxy: "myhost.dev",
        server: {
            baseDir: "www/templates" // Change this to your web root dir
        }
    });
});
var webserver  = require('gulp-webserver');
var opn = require('opn');//打开网站，应用程序等 //https://github.com/sindresorhus/opn#readme
//开启本地 Web 服务器功能
gulp.task('webserver', function() {
    gulp.src( './' )
        .pipe(webserver({
            host:             config.localserver.host,//config 文件中配置
            port:             config.localserver.port,
            livereload:       true,
            directoryListing: false
        }));
});
//通过浏览器打开本地 Web服务器 路径
gulp.task('openbrowser', function() {
    opn( 'http://' + config.localserver.host + ':' + config.localserver.port );
});

var connect = require("gulp-connect");//创建 Web Server
var connect = require("connect-history-api-fallback");//用于匹配资源，但用起来简单很多。(常用于 SPA 开发)
gulp.task('html', function () {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});
gulp.task('connect', function () {
    connect.server({
        root: './app',
        port: 9000,
        //host: Default: localhost,
        livereload: true,
        middleware: function (connect, o) {
            return [
                (function () {
                    var url = require('url');
                    var proxy = require('proxy-middleware');//用来代理请求，可以把 /api/xxx 发送到指定的地址。(常用于 SPA 开发)
                    var options = url.parse('http://localhost:3000/api');
                    options.route = '/api';
                    return proxy(options);
                })(),
                modRewrite([
                    '!\\.html|\\.js|\\.css|\\.swf|\\.jp(e?)g|\\.png|\\.gif|\\.eot|\\.woff|\\.ttf|\\.svg$ /index.html'
                ])
            ];
        }
    });
});

var merge = require('merge-stream');

gulp.task('merge', function() {
    var bootstrap = gulp.src('www/js/a.js')
        .pipe(gulp.dest('dist/js'));

    var jquery = gulp.src('www/js/b.js')
        .pipe(gulp.dest('dist/js'));

    return merge(bootstrap, jquery);
});

//var browserify = require('browserify');
//var source = require('vinyl-source-stream');
//var buffer = require('vinyl-buffer');
//
//gulp.task('javascript', function () {
//    // 在一个基础的 task 中创建一个 browserify 实例
//    var b = browserify({
//        entries: './www/js/b.js',
//        debug: true
//    });
//
//    return b.bundle()
//        .pipe(source('a.js'))
//        .pipe(buffer())
//        .pipe(sourcemaps.init({loadMaps: true}))
//        // 在这里将转换任务加入管道
//        //.pipe(uglify())
//        .on('error', gutil.log)
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('./dist/js/'));
//});

/*****************************错误处理*********************************************************************/

//默认情况下,在管道中发出一个错误就会抛出,除非它已经有一个监听器附加到错误事件。如果管道较长，就有点棘手。
//通过使用stream-combiner2可以将一系列的流转换成一个单独的数据流,这意味着你只需要在一个地方倾听代码中的错误事件。
var combiner = require('stream-combiner2');
gulp.task('test', function() {
    var combined = combiner.obj([
        gulp.src('bootstrap/js/*.js'),
        uglify(),
        gulp.dest('public/bootstrap')
    ]);

    // any errors in the above streams will get caught
    // by this listener, instead of being thrown:
    combined.on('error', console.error.bind(console));

    return combined;
});

//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['revFont', 'revImg'],
        ['lintJs'],
        ['revCollectorCss'],
        ['miniCss', 'miniJs'],
        ['miniHtml', 'delRevCss'],
        done);
});

//正式构建
gulp.task('build', function (done) {
    runSequence(
        ['revFont', 'revImg'],
        ['lintJs'],
        ['revCollectorCss'],
        ['miniCss', 'miniJs'],
        ['miniHtml', 'delRevCss'],
        done);
});
