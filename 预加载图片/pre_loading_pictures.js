/**
 * Created by Administrator on 2015/7/21 0021.
 *
 *http://www.2cto.com/kf/201203/122180.html
 *
 * 由于javascript无法获取img文件头数据，必须等待其加载完毕后才能获取真实的大小然后展示出来，所以显示的图片的速度体验要比直接输出的差很多
 *
 * 常用的技术
    有两种常用的图片预加载技术：
     1.CSS sprites
     CSS sprites技术可以用来减少页面产生的HTTP请求数。
                它是这么实现的，把所有的图型状态（比如按钮的默认状态，悬停及激活等状态）保存到一张图片中。
                并依据元素的状态，使用CSS对图片进行相应的定位、切割。
                不过这样有个重要的缺点——需要提前加载的图片不适用这项技术。一些后面才需要显示的图片并没有被加载，这可能会导致一个延迟。
                因此，此技术一般适合静态站点，主要用来减少图片加载数。
    2.JavaScript
        使用JavaScript的image对象。
            先把网站中使用的每个图片的地址（URL）放到一个数组中。
                var myImages = ["image_1.jpg', 'image_2.jpg', 'image_3.jpg', ...];
            然后遍历这个数组，根据图片地址创建各自的image对象。这样可以保证所有的图片都能被浏览器缓存，等用到的时候就无需等待了。
             for (var i = 0; i <= myImages.length; i++) {
                 var img = new Image();
                 img.src = myImages[i];
            }
        此方案费时的地方是，不仅要制造一个包含每张图片地址的数组，还要维护它的一致性。
        网站的每个需求变更（添加或更改图片地址）都会影响到这个数组。试想频繁变更的应用，又拥有数百张图片，这真会让人筋疲力尽的。
    3.图片自动预加载（带进度指示器）
        一个更好的方式是自动收集图片的地址。
        首先要分析页面中（包括外链及内联）的样式表。这可以通过遍历“document.styleSheets”对象来获得页面使用的所有样式表。
            for (var i = 0; i < document.styleSheets.length; i++){
        接下来要找出样式表的根目录。用来得到各个图片的绝对地址。
            var baseURL = getBaseURL(document.styleSheets[i].href);
        考虑到浏览器的兼容性，必须同时检查每个样式表的“cssRules”或“rules”中是否包含CSS规则。
            if (document.styleSheets[i].cssRules) {
                cssRules = document.styleSheets[i].cssRules
            }
            else if (document.styleSheets[i].rules) {
                cssRules = document.styleSheets[i].rules
            }
        所有非空的CSS规则都要被解析，来确认它是否关联了图片。一个简单的正则表达式就可以解析出图片地址。
            var cssRule = cssRules[j].style.cssText.match(/[^\(]+\.(gif|jpg|jpeg|png)/g);
        然后，把这里收集到的所有图片地址保存到一个数组中供后面使用。
        function analyzeCSSFiles() {
            var cssRules; // CSS rules

            for (var i = 0; i < document.styleSheets.length; i++) { // loop through all linked/inline stylesheets

                var baseURL = getBaseURL(document.styleSheets[i].href); // get stylesheet's base URL

                // get CSS rules
                if (document.styleSheets[i].cssRules) {
                    cssRules = document.styleSheets[i].cssRules
                }
                else if (document.styleSheets[i].rules) {
                    cssRules = document.styleSheets[i].rules
                }

                // loop through all CSS rules
                for (var j = 0; j < cssRules.length; j++) {
                    if (cssRules[j].style && cssRules[j].style.cssText) {
                        // extract only image related CSS rules
                        // parse rules string and extract image URL
                        var cssRule = cssRules[j].style.cssText.match(/[^\(]+\.(gif|jpg|jpeg|png)/g);
                        if (cssRule) {
                            // add image URL to array
                            cssRule = (cssRule + "").replace("\"", "")
                            imageURLs.push(baseURL + cssRule);
                        }
                    }
                }
            }
        }
 *
 *
 *
 *
 *
 */


var imgLoad = function (url, callback) {
    var img = new Image();

    img.src = url;
    if (img.complete) {
        callback(img.width, img.height);
    } else {
        img.onload = function () {
            callback(img.width, img.height);
            img.onload = null;
        };
    };

};

// 更新：
// 05.27: 1、保证回调执行顺序：error > ready > load；2、回调函数this指向img本身
// 04-02: 1、增加图片完全加载后的回调 2、提高性能

/**
 * 图片头数据加载就绪事件 - 更快获取图片尺寸
 * @version 2011.05.27
 * <a href="http://my.oschina.net/arthor" class="referer" target="_blank">@author</a> TangBin
 * <a href="http://my.oschina.net/see" class="referer" target="_blank">@see</a>     http://www.planeart.cn/?p=1121
 * @param   {String}    图片路径
 * @param   {Function}  尺寸就绪
 * @param   {Function}  加载完毕 (可选)
 * @param   {Function}  加载错误 (可选)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
        alert('size ready: width=' + this.width + '; height=' + this.height);
    });
 */
var imgReady = (function () {
    var list = [], intervalId = null,

    // 用来执行队列
        tick = function () {
            var i = 0;
            for (; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]();
            };
            !list.length && stop();
        },

    // 停止所有定时器队列
        stop = function () {
            clearInterval(intervalId);
            intervalId = null;
        };

    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image();

        img.src = url;

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        };

        width = img.width;
        height = img.height;
alert(img);
        // 加载错误后的事件
        img.onerror = function () {alert(23332);
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };

        // 图片尺寸就绪
        onready = function () {alert(11);
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                    // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
            ) {alert(22);
                ready.call(img);
                onready.end = true;
            };
        };
        onready();

        // 完全加载完毕的事件
        img.onload = function () {alert(11212);
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();

            load && load.call(img);

            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };
        alert(onready.end);
        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
})();

imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
    alert('size ready: width=' + this.width + '; height=' + this.height);
});

