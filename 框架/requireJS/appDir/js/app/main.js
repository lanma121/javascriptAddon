/**
 * Created by Administrator on 2015/10/9 0009.
 */
require.config({
    shim: {
        '../../../../jquery-1.11.3.min': {exports:'$'}
    }
});
require(['info'],function(info){alert(222);
    alert(info.name+"  "+info.age);
});
require(['../../../dist/js/infrastructure'],function(obj){
    alert(obj.name);
});
//如果服务器端采用JSONP模式，则可以直接在require中调用，方法是指定JSONP的callback参数为define。
require([ './template/tpl1.html'], function(template ){
    alert(template);

});