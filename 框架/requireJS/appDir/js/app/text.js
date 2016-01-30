/**
 * Created by Administrator on 2015/10/9 0009.
 */
define([''],function(){

});
require(['./template/tpl1.html'], function(template ){alert(12);
    // ...
    return template;
});
//define(['lib/Deferred'], function( Deferred ){
//    var defer = new Deferred();
//    require(['lib/templates/?index.html','lib/data/?stats'],
//        function( template, data ){
//            defer.resolve({ template: template, data:data });
//        }
//    );
//    return defer.promise();
//});
require( [
    "http://someapi.com/foo?callback=define"
], function (data) {
    console.log(data);
});