
/**
 * XMLHttpRequest.readyState: 状态码
     0 － （未初始化）还没有调用send()方法
     1 － （载入）已调用send()方法，正在发送请求
     2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
     3 － （交互）正在解析响应内容
     4 － （完成）响应内容解析完成，可以在客户端调用了
 * XMLHttpRequest.status
     1xx-信息提示
     这些状态代码表示临时的响应。客户端在收到常规响应之前，应准备接收一个或多个1xx响应。
     2xx-成功
     这类状态代码表明服务器成功地接受了客户端请求。
     3xx-重定向
     客户端浏览器必须采取更多操作来实现请求。例如，浏览器可能不得不请求服务器上的不同的页面，或通过代理服务器重复该请求。
     4xx-客户端错误
     发生错误，客户端似乎有问题。例如，客户端请求不存在的页面，客户端未提供有效的身份验证信息。400-错误的请求。
     5xx-服务器错误
     服务器由于遇到错误而不能完成该请求。
     FTP
     1xx-肯定的初步答复
     这些状态代码指示一项操作已经成功开始，但客户端希望在继续操作新命令前得到另一个答复。
     2xx-肯定的完成答复
     一项操作已经成功完成。客户端可以执行新命令。200命令确定。
     3xx-肯定的中间答复
     该命令已成功，但服务器需要更多来自客户端的信息以完成对请求的处理。331用户名正确，需要密码。
     4xx-瞬态否定的完成答复
     该命令不成功，但错误是暂时的。如果客户端重试命令，可能会执行成功。421服务不可用，正在关闭控制连接。如果服务确定它必须关闭，将向任何命令发送这一应答。
     5xx-永久性否定的完成答复
     该命令不成功，错误是永久性的。如果客户端重试命令，将再次出现同样的错误。500语法错误，命令无法识别。这可能包括诸如命令行太长之类的错误。
 */



(function($){
    if(!$){alert("请引入jQuery ----");return;}
    var ajax = function(){
        var parameters = arguments;
        var ajaxObj = {
            url: parameters[0],                                                     //默认值: 当前页地址。发送请求的地址。
            type: parameters[1] ? parameters[1] : "GET",                            //默认值: "GET"。请求方式 ("POST" 或 "GET") 注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
            success:function(result,status,XMLHttpRequest ){                        //请求成功后的回调函数。参数：result:由服务器返回，并根据 dataType 参数进行处理后的数据；status:描述状态的字符串,success。
                var res = window.JSON&&JSON.stringify ? JSON.stringify(result) :result;
                log().info("ajax success---- status :"+status+"----------result:" + res);
                parameters[2] ? parameters[2](result) :false;
            },
            data: parameters[3] ? parameters[3] :"",                                //类型：String 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo:["bar1", "bar2"]} 转换为 '&foo=bar1&foo=bar2'。
            dataType:parameters[4] ? parameters[4] :"text",  //类型：String 预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如 XML MIME 类型就被识别为 XML。在 1.4 中，JSON 就会生成一个 JavaScript 对象，而 script 则会执行这个脚本。随后服务器端返回的数据会根据这个值解析后，传递给回调函数。可用值:
                                                             // "xml": 返回 XML 文档，可用 jQuery 处理。
                                                             //"html": 返回纯文本 HTML 信息；包含的 script 标签会在插入 dom 时执行。
                                                             //"script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了 "cache" 参数。注意：在远程请求时(不在同一个域下)，所有 POST 请求都将转为 GET 请求。（因为将使用 DOM 的 script标签来加载）
                                                             //"json": 返回 JSON 数据 。
                                                             //"jsonp": JSONP 格式。使用 JSONP 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
                                                             //"text": 返回纯文本字符串
            cache:parameters[5] ? parameters[5] : true,      //默认值: true，dataType 为 script 和 jsonp 时默认为 false。设置为 false 将不缓存此页面。
            async: parameters[6]==false? parameters[6]: true,//默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
            beforeSend:function(XHR,ajaxParas){              //发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头,如果返回 false 可以取消本次 ajax 请求。
                log().info(" ajax beforeSending--------------XHR.readyState:"+XHR.readyState);
                parameters[7] ? parameters[7](XHR.readyState) :false;
            },
            complete:function(XHR, TS){//请求完成后回调函数 (请求成功或失败之后均调用)。参数： XMLHttpRequest 对象和一个描述请求类型的字符串。
                if (window.console && window.console.log)console.log(" ajax completing--------------status:"+TS+";  XHR.readyState:"+XHR.readyState);
                parameters[8] ? parameters[8](XHR.readyState):false;
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){//有以下三个参数：XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。
                //如果发生了错误，错误信息（第二个参数）除了得到 null 之外，还可能是 "timeout", "error", "notmodified" 和 "parsererror"。
                if (window.console && window.console.log)console.log("------------ajax 请求错误--------------------");
                if (window.console && window.console.log)console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState+";XMLHttpRequest.status"+XMLHttpRequest.status);
                if (window.console && window.console.log)console.log("textStatus:"+textStatus+";errorThrown:"+errorThrown);
            }
        };
        var XMLHttpRequest = $.ajax(ajaxObj);//返回XMLHttpRequest对象
    }
//contentType:"", //默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。默认值适合大多数情况。如果你明确地传递了一个 content-type 给 $.ajax() 那么它必定会发送给服务器（即使没有数据要发送）。
 //context:"",//类型：Object 这个对象用于设置 Ajax 相关回调函数的上下文。也就是说，让回调函数内 this 指向这个对象（如果不设定这个参数，那么 this 就指向调用本次 AJAX 请求时传递的 options 参数）。比如指定一个 DOM 元素作为 context 参数，这样就设置了 success 回调函数的上下文为这个 DOM 元素。
//            默认值: 自动判断 (xml 或 html)。请求失败时调用此函数。
//有以下三个参数：XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。
//如果发生了错误，错误信息（第二个参数）除了得到 null 之外，还可能是 "timeout", "error", "notmodified" 和 "parsererror"。
//dataFilter:function(){}, //类型：Function 给 Ajax 返回的原始数据的进行预处理的函数。提供 data 和 type 两个参数：data 是 Ajax 返回的原始数据，type 是调用 jQuery.ajax 时提供的 dataType 参数。函数返回的值将由 jQuery 进一步处理。
//global:true, //类型：Boolean是否触发全局 AJAX 事件。默认值: true。设置为 false 将不会触发全局 AJAX 事件，如 ajaxStart 或 ajaxStop 可用于控制不同的 Ajax 事件。
// ifModified 类型：Boolean 仅在服务器数据改变时获取新数据。默认值: false。使用 HTTP 包 Last-Modified 头信息判断。在 jQuery 1.4 中，它也会检查服务器指定的 'etag' 来确定数据没有被修改过。
//jsonp 类型：String 在一个 jsonp 请求中重写回调函数的名字。这个值用来替代在 "callback=?" 这种 GET 或 POST 请求中 URL 参数里的 "callback" 部分，比如 {jsonp:'onJsonPLoad'} 会导致将 "onJsonPLoad=?" 传给服务器。
//jsonpCallback //类型：String 为 jsonp 请求指定一个回调函数名。这个值将用来取代 jQuery 自动生成的随机函数名。这主要用来让 jQuery 生成度独特的函数名，这样管理请求更容易，也能方便地提供回调函数和错误处理。你也可以在想让浏览器缓存 GET 请求的时候，指定这个回调函数名。
//password 类型：String 用于响应 HTTP 访问认证请求的密码
// processData 类型：Boolean 默认值: true。默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
//scriptCharset 类型：String 只有当请求时 dataType 为 "jsonp" 或 "script"，并且 type 是 "GET" 才会用于强制修改 charset。通常只在本地和远程的内容编码不同时使用。
//traditional 类型：Boolean如果你想要用传统的方式来序列化数据，那么就设置为 true。请参考工具分类下面的 jQuery.param 方法。
//timeout类型：Number设置请求超时时间（毫秒）。此设置将覆盖全局设置。
//username 类型：String 用于响应 HTTP 访问认证请求的用户名。
//xhr 类型：Function 需要返回一个 XMLHttpRequest 对象。默认在 IE 下是 ActiveXObject 而其他情况下是 XMLHttpRequest 。用于重写或者提供一个增强的 XMLHttpRequest 对象。这个参数在 jQuery 1.3 以前不可用。


}(jQuery));
