/**
 * Created by Administrator on 2015/6/15 0015.
 * 加载第三方统计控件
 *
 */

(function($){
    function bdCount(){
        document.write(unescape("%3Cscript src='" + (("https:" == document.location.protocol) ? " https://" : " http://")
            + "hm.baidu.com/h.js%3F85ebcf5ba73aeae68dbcd4842547bcd9' type='text/javascript'%3E%3C/script%3E"));
    }

    function jslCount1(){
        document.write(unescape('%3Cscript src=///static.jiasule.com/static/js/stat/picture_stat.js type="text/javascript"%3E%3C/script%3E'));
    }
    function jslCount2(){
        document.write(unescape('%3Cscript src=//static.jiasule.com/static/js/stat/picture2_stat.js type="text/javascript"%3E%3C/script%3E'));
    }
    if(!$){
        window.$ = {bdCount : bdCount,jslCount1 : jslCount1,jslCount2 : jslCount2};
        return;
    }
    $.extend({
        bdCount:bdCount,
        jslCount2:jslCount2,
        jslCount1:jslCount1
    });

}());
