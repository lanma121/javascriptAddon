/**
 * Created by Administrator on 2015/10/10 0010.
 */
require.config({
    baseUrl: "/another/path",
    paths: {//path映射那些不直接放置于baseUrl下的模块名。设置path时起始位置是相对于baseUrl的，除非该path设置以"/"开头或含有URL协议（如http:）
        "some": "some/v1.0"
    },
    waitSeconds: 15,
    shim: {//为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置。
        'yanhua1': {
            deps: ['jquery-1.11.3.min'], //deps数组，表明该模块的依赖性。
            exports: 'loop'//exports值（输出的变量名），表明这个模块外部调用时的名称
        }


    }
});