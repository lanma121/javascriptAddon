({
    appDir: './appDir',//项目目录，相对于参数文件的位置。
    baseUrl: './js',//js文件的位置。
    dir: './dist',//输出目录
    mainConfigFile:'./appDir/js/main.js',//主配置js文件
    modules: [//一个包含对象的数组，每个对象就是一个要被优化的模块。
        {
            name: "main",
            exclude: [//将模块文件压缩合并成两个文件，第一个是main.js（指定排除infrastructure.js），第二个则是infrastructure.js。
                "infrastructure"
            ]
        },
        {
            name: "infrastructure"
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,//凡是匹配这个正则表达式的文件名，都不会被拷贝到输出目录。
    optimizeCss: 'standard',//自动压缩CSS文件，可取的值包括“none”, “standard”, “standard.keepLines”, “standard.keepComments”, “standard.keepComments.keepLines”。
    removeCombined: true,//如果为true，合并后的原文件将不保留在输出目录中。
    //paths: {//各个模块的相对路径，可以省略js后缀名。
    //    jquery: 'lib/jquery',
    //    underscore: 'lib/underscore',
    //    backbone: 'lib/backbone/backbone',
    //    backboneLocalstorage: 'lib/backbone/backbone.localStorage',
    //    text: 'lib/require/text'
    //},
    generateSourceMaps:false//是否要生成source map文件。
    //shim: {//配置依赖性关系。如果某一个模块不是AMD模式定义的，就可以用shim属性指定模块的依赖性关系和输出值。
    //    underscore: {
    //        exports: '_'
    //    },
    //    backbone: {
    //        deps: [
    //            'underscore',
    //            'jquery'
    //        ],
    //        exports: 'Backbone'
    //    },
    //    backboneLocalstorage: {
    //        deps: ['backbone'],
    //        exports: 'Store'
    //    }
    //}
})