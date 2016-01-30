/**
 * Created by Administrator on 2015/10/10 0010.
 */
/**
 * JSONP服务依赖 § 1.3.9
    JSONP是在javascript中服务调用的一种方式。它仅需简单地通过一个script标签发起HTTP GET请求，是实现跨域服务调用一种公认手段。
     为了在RequireJS中使用JSON服务，须要将callback参数的值指定为"define"。这意味着你可将获取到的JSONP URL的值看成是一个模块定义。
      下面是一个调用JSONP API端点的示例。该示例中，JSONP的callback参数为"callback"，因此"callback=define"告诉API将JSON响应包裹到一个"define()"中：
         require(["http://example.com/api/data.json?callback=define"],
         function (data) {
                //The data object will be the API response for the
                //JSONP data call.
                console.log(data);
            }
         );
     JSONP的这种用法应仅限于应用的初始化中。一旦JSONP服务超时，其他通过define()定义了的模块也可能得不得执行，错误处理不是十分健壮。
     仅支持返回值类型为JSON object的JSONP服务，其他返回类型如数组、字串、数字等都不能支持。
     这种功能不该用于long-polling类的JSONP连接——那些用来处理实时流的API。这些API在接收响应后一般会做script的清理，而RequireJS则只能获取该JSONP URL一次——后继使用require()或define()发起的的对同一URL的依赖(请求)只会得到一个缓存过的值。
     JSONP调用错误一般以服务超时的形式出现，因为简单加载一个script标签一般不会得到很 详细的网络错误信息。你可以override requirejs.onError()来过去错误。更多的信息请参看错误处理部分。
 *
 *
 */
