/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
 window: false, clearInterval: false, document: false,
 self: false, setInterval: false */

/*RequireJS加载模块速度很快，很有可能在页面DOM Ready之前脚本已经加载完毕。需要与DOM交互的工作应等待DOM Ready。
    现代的浏览器通过DOMContentLoaded事件来知会。
    但是，不是所有的浏览器都支持DOMContentLoaded。domReady模块实现了一个跨浏览器的方法来判定何时DOM已经ready。
    下载并在你的项目中如此用它：
     require(['domReady'], function (domReady) {
         domReady(function () {
             //This function is called once the DOM is ready.
             //It will be safe to query the DOM and manipulate
             //DOM nodes in this function.
         });
     });
    基于DOM Ready是个常规需求，像上述API中的嵌套调用方式，理想情况下应避免。
    domReady模块也实现了Loader Plugin API，
    因此你可以使用loader plugin语法（注意domReady依赖的!前缀）来强制require()回调函数在执行之前等待DOM Ready。
    当用作loader plugin时，domReady会返回当前的document：
     require(['domReady!'], function (doc) {
         //This function is called once the DOM is ready,
         //notice the value for 'domReady!' is the current
         //document.
     });
 注意: 如果document需要一段时间来加载（也许是因为页面较大，或加载了较大的js脚本阻塞了DOM计算），
 使用domReady作为loader plugin可能会导致RequireJS“超时”错。
 如果这是个问题，则考虑增加waitSeconds配置项的值，或在require()使用domReady()调用（将其当做是一个模块）。*/
define(function () {
    'use strict';

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});
