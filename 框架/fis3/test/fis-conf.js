/**
 * fis3 主要功能
 *  资源定位：获取任何开发中所使用资源的线上路径；
 *  内容嵌入：把一个文件的内容(文本)或者 base64 编码(图片)嵌入到另一个文件中；给资源加 ?__inline 参数来标记资源嵌入需求。
 *  依赖声明：在一个文本文件内标记对其他资源的依赖关系；
 *
 * fis3 命令
 *
 * fis3 inspect 来查看文件被设置了哪些属性编译
 * fis3 release 发布命令，不加-d 构建被发布到内置 Web Server 的根目录下。此目录可以通过执行 fis3 server open命令打开。
 *          -d  后跟发布到任意目录
 *          -h  获取更多参数
 *          -w  启动文件监听功能。修改文件会构建发布。而且其编译是增量的，编译花费时间少。
 *          -L  文件修改自动构建发布后，浏览器能自动刷新，通常 -w 和 -L 一起使用 fis3 release -wL
 * fis3 server 内置 Web Server命令
 *          start 启动本地 Web Server，当此 Server 启动后，会自动浏览器打开 http://127.0.0.1:8080，默认监听端口 8080
 *          -h    得到更多启动参数，可以设置不同的端口号（当 8080 占用时）
 *
 */

/**
 * 所需 包
 *  1. npm install -g fis-parser-less                       解析less为css的包
 *  2. npm install -g fis3-postpackager-loader              可对页面散列文件进行合并
 *  3. npm install -g fis3-hook-amd                         采用 amd 规范作为模块化开发
 *
 * @type {string}
 */



const APP = 'test'; // APP的名称，根据项目的实际情况来制定
const lc_template = 'D:\\client\\php\\pdp\\template\\' + APP; //本地网站目录
const lc_static = 'D:\\client\\php\\pdp\\webroot\\' + APP + '\\static';  //静态文件目录
const lc_url = '/' + APP + '/static';
/**
 * 配置文件说明：
 *
 * 配置接口：
 * 1. fis.set(key, value)
 *      key    任意字符串，但系统占用了 project、namespace、modules、settings 它们在系统中有特殊含义
 *      value  任意变量
 * 2. fis.get(key) 获取已经配置的属性，和 fis.set() 成对使用
 *
 * 3. fis.match(selector, props,important); 给匹配到的文件分配属性
        props      编译规则属性，包括文件属性和插件属性，更多属性
        important   为true后面的规则无法覆盖
        selector   匹配文件路径,其设置的类型是 glob 或者是 [正则][]
            ::package       用来匹配 fis 的打包过程。
            ::image         用来匹配文件类型为图片的文件。通过 fis.set('project.fileType.image') 修改默认扩展图片
            ::text          用来匹配文本文件。通过 fis.set('project.fileType.text') 修改默认扩展文本
 *
 * 4. fis.media("dev") 多状态配置，每一份配置都可以让 fis3 进行不同的编译；默认为 dev
 * 5. fis.plugin(name [, props [, position]])
 *      name            插件名
 *      props           对象，给插件设置用户属性
 *      position        设置插件位置，如果目标文件已经设置了某插件，默认再次设置会覆盖掉。如果希望在已设插件执行之前插入或者之后插入，请传入 prepend 或者 append
 *
 */

//过滤发布配置
fis.set('project.ignore', [
    'node_modules/**',
    '.git/**',
    '.svn/**'
]);

//压缩配置
fis
    .match('{*.js,*.html:js,*.htm:js,*.tpl:js}', {//压缩所有的js文件 和 html、htm、tpl 中的js
        optimizer: fis.plugin('uglify-js')
    })
    .match('{*.css,*.less,*.html:css,*.htm:css,*.tpl:css}', {//压缩所有的css文件 和 html、htm、tpl文件中内嵌的 css
        optimizer: fis.plugin('clean-css')
    }).match('*.png', {// fis-optimizer-png-compressor 插件进行压缩，已内置
        optimizer: fis.plugin('png-compressor')
    })
    .match('*.{html,htm,tpl,tmpl}', {
    //invoke fis-optimizer-html-minifier，需要安装npm i fis-optimizer-html-minifier [-g]
    optimizer: fis.plugin('html-minifier')
});
/**
 * CssSprite图片合并
 *  FIS3 构建会对 CSS 中，路径带 ?__sprite 的图片进行合并。为了节省编译的时间，分配到 useSprite: true 的 CSS 文件才会被处理。
 *  默认情况下，对打包 css 文件启动图片合并功能。
 *  支持repeat-x, repeat-y, background-position 和 background-size
 *  参考：https://www.npmjs.com/package/fis-spriter-csssprites
 */
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
}).match('::package', {
    spriter: fis.plugin('csssprites')
})

//异构语言 less 的使用
fis.match('**.less', {
    parser: fis.plugin('less'), // invoke `fis-parser-less`,
    rExt: '.css'
}).match('*:less', {//:less 也是一种类 css 选择器。表示当目标文件内嵌了其他语言内容时，用来命中内嵌内容为 less 的编译处理
    parser: fis.plugin('less') // invoke `fis-parser-less`,
});
//前端模板的使用
fis.match('**.tmpl', {
    parser: fis.plugin('utc'), // invoke `fis-parser-utc`
    isJsLike: true
});
/**
 * fis3-postpackager-loader
 * 一种基于构建工具的加载组件的方法，构建出的 html 已经包含了其使用到的组件以及依赖资源的引用。
 * 静态资源前端加载器，用来分析页面中使用的和依赖的资源（js或css）, 并将这些资源做一定的优化后插入页面中。如把零散的文件合并。
 * 此插件会收集所有的资源，如果希望某个资源不被收集，请在资源结尾处如 < /script> 后面加上 <! --ignore-->
 * https://github.com/fex-team/fis3-postpackager-loader
 */
//给 loader 插件配置 allInOne 属性，即可对散列的引用链接进行合并，而不需要进行配置 packTo 指定合并包名，但是只适合于纯前端页面，并且要求资源都是静态引入的
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: {//js&css打包成一个文件
            css:"pkg/${filepath}_aio.css", // all in one打包后， css 文件的路径规则。默认为 pkg/${filepath}_aio.css
            js:"pkg/${filepath}_aio.js",   // all in one 打包后， js 文件的路径规则。默认为 pkg/${filepath}_aio.js
            includeAsyncs:false,           // 默认为 false。all in one 打包，是不包含异步依赖的，不过可以通过把此属性设置成 true，包含异步依赖。
            ignore:null                    // 默认为空。如果不希望部分文件被 all in one 打包，请设置 ignore 清单。
        },
        processor: {//默认为 {'.html': 'html'}, 即支持后缀是 .html 的文件，如果要支持其他后缀，请在此扩展。
            '.html': 'html',
            '.md': 'html'
        },
        obtainScript:true, //是否收集 <script> 内容。（非页面依赖部分）
        obtainStyle:true,  //是否收集 <style> 和 <link> 内容。（非页面依赖部分）
        resoucemap:true,   //默认为 /pkg/${filepath}_map.js 当 useInLineMap 为 false 的时候有效，用来控制 resourcemap 生成位置。
        sourceMap: true,   //是否生成依赖map文件
        useInlineMap: true //是否将sourcemap作为内嵌脚本输出
    })
});
//根据用户的配置信息对资源进行打包
//fis.match('/widget/*.js', {
//    packTo: '/static/widget_pkg.js'
//})
// 将html文件加入静态资源关系表中，例如：manifest.json
fis.match('*.html', {
    useMap: true
}).match('/widget/**/*', {// widget源码目录下的资源被标注为组件,文件会自动包裹成 amd 规范的。
    isMod: true
}).match('some big file', {// 另外需要注意的是 amd 插件需要把目标文件解析成 ast，然后再基于 ast 来处理，对于大的 js 文件来说，确实很费时间。那么如果想跳过某些文件的分析，请添加 skipDepsAnalysis:true, 可以大大减少编译时间。
    skipDepsAnalysis: true
});

/**
 * AMD模块化
 * fis 的 amd 方案，是把对依赖的分析过程从运行期改成了编译期，所以请尽量不要设置 require.config({options...}),
 * 因为一旦设置了 baseUrl 、 paths 或者 packages 什么的，会让 fis 静态编译时分析变得很困难，甚至分析不到。
 * https://github.com/fex-team/fis3-hook-amd
 */
fis.hook('amd', {
    //globalAsyncAsSync:false,  //是否将全局下面的异步用法，当同步处理。作用是，本来要运行时加载的，现在变成页面里面直接引用了。
                                 //fis sync                     /*当全局异步用法当同步用法关闭时，只有加了 fis sync 注释的异步用法才会当同步处理。*/
                                 //require(['./module/a'])
                                 //fis async                    /*当全局异步用法当同步用法开启时，只有加了 fis async 注释的异步用法才保留异步作用。*/
                                 //require(['./module/a'])
    //baseUrl: '.',            // 默认为 . 即项目根目录。用来配置模块查找根目录。
    //paths: {                 // 用来设置别名，路径基于 baseUrl 设置。
    //    jquery: '/static/common/js/mod/jquery',
    //    react: '/static/common/js/mod/react'
    //},
    //shim: {//不改目标文件，指定其依赖和暴露内容.注意只对不满足amd的js有效
    //    'comp/2-0/2-0.js': {
    //        deps: ['jquery'],//依赖的 module 列表
    //        exports: 'myFunc',//暴露的对象名称
    //        init: 'function($) {return $.extend({a: 1}, {b: 2})}'//暴露的可以通过自定的方法来控制
    //    }
    //},
    //packages: [//用来配置包信息，方便项目中引用。
    //    {
    //        name: 'foo',
    //        location: './modules/foo',//当 require('foo/a.js') 的时候，等价于 require('/modules/foo/a.js').
    //        main: 'index.js'          // 当 require('foo') 的时候等价于 require('/modules/foo/index.js').
    //    }
    //]
});
//*指定哪些目录下的文件执行define包裹*/
fis.match('/amd/**/*.js', {
    isMod: true,
    moduleId: '$1'//改模块ID
});

//npm install -g fis-parser-handlebars-3.x
fis.match('hbs/*.handlebars', {
    rExt: '.js', // from .handlebars to .js 虽然源文件不需要编译，但是还是要转换为 .js 后缀
    parser: fis.plugin('handlebars-3.x', {
        //fis-parser-handlebars-3.x option
    }),
    release: false // handlebars 源文件不需要编译
});


/**
 * 资源定位
 *   优势：
 *      1. 将相对路径替换为绝对路径
 *      2. 分离开发路径与部署路径之间的关系。通过配置，可以发布到任何静态资源服务器的任何路径上
 *      3. 可移植。 可以从一个产品线移植到另一个产品线而不用担心线上部署不一致的问题
 *   var img = __uri('images/logo.gif'); js中资源定位
 *   @import url('demo.css');            css中资源定位
 *
 */

//fis.media('dev')
//    .match('**', {
//        useHash: false  // MD5 戳，改变url 防止缓存
//    })
//    .match('/widget/**/*.js', {// widget下的 js 调用 jswrapper 进行自动化组件化封装
//        postprocessor: fis.plugin('jswrapper', {
//            type: 'commonjs'
//        })
//    })
//    .match('*.{tpl,json,html,htm}', {
//        //release:'/template/$0'             // -d 发布到本地对应的目录中，无-d 发布到fis3自定义的web server 目录中
//        deploy: fis.plugin('local-deliver', {//构建到本地 Web Server 服务目录下
//            to: lc_template//lc_root + APP
//        })
//    })
//    .match('*.{png,js,css,woff,ttf,woff2,otf,eot,svg,jpg,gif,swf}',{
//        // release: '/static/$0',//发布到/static/目录下
//        //url : '/mm/static/$0'//访问url是/mm/static/xxx
//        deploy: fis.plugin('local-deliver', {
//            to: lc_static   //发布目录
//        }),
//        url: lc_url+ '$0'   //访问地址
//    }).match('/test/**', {
//        release: '$0'
//    }).match('/test/server.conf', {
//        release: '/config/server.conf'
//    });



// 联调环境配置
const qa_cdn = 'http://192.168.5.3/';
const qa_tpl_receiver = 'http://192.168.5.3/receiver.php';//HTTP 提交的方式上传时的接受端，。这个接收端需要放到你的 Web 服务 WWW 目录下
const qa_img_receiver = 'http://192.168.5.3/receiver.php';//https://github.com/fex-team/fis-command-release/blob/master/tools/receiver.php
const qa_tpldir = '/home/work/pdp/template/' + APP;
const qa_imgdir = '/home/work/pdp/webroot/' + APP;
fis.media('qa')
    .match('**', {
        useHash: true,
        domain: qa_cdn
    })
    .match('*.{tpl,json,html,htm}', {
        deploy: fis.plugin('http-push', {//这个插件就是以 HTTP 提交的方式来完成远端部署的，当然由于安全性等原因这种方式只适用于测试阶段，请勿直接拿来上线；
            receiver: qa_tpl_receiver,
            to: qa_tpldir
        }),
        useHash: false
    })
    .match('*.{woff,ttf,woff2,otf,eot,svg,png,jpg,gif,css,js,swf}', {
        deploy: fis.plugin('http-push', {
            receiver: qa_img_receiver,
            to: qa_imgdir + '/static'
        }),
        url: APP + '/static$0'//$0 static文件后的目录
    })
/**
 * node 远程接收器使用方法：
    $ git clone https://github.com/fex-team/receiver.git
    $ cd receiver
    $ npm install
    $ node server.js # default port 8999, use `node server.js < port>` change port
 *
 * 最后配置文件如下：
 *
 */
//fis.config.merge({
//    deploy: {
//        remote: {
//            receiver: 'http://<host>:8999/receiver',
//            from: '/public',
//            //远端目录
//            to: '/home/fis/www/'
//        }
//    }
//});