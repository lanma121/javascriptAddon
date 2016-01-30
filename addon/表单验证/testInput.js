/**
 * Created by Administrator on 2015/7/4 0004.
 *  给需要验证的表单元素绑定附加属性
        < input type="text" value="" name="name" datatype="s5-16" errormsg="昵称至少5个字符,最多16个字符！" />

 *
 *
 *
 */


(function($){
    function tips (conten){
        var
            tips_css = "margin: 0;padding: 0;font-size: 14px;font-family: 微软雅黑; z-index: 19891061; position: absolute; pointer-events: auto;",
            tips_arrow = "height:0px; width:0px;float: left;border-right:10px solid #FFAA25;border-top:8px solid transparent; border-bottom:0px solid transparent;",
            tips_content = "height: 25px;background: #FFAA25;float:left;line-height: 25px;padding: 3px 6px;text-align: center;color:white; border: 1px solid #FFAA25;border-radius: 5px;";
        var html = '<div class='+tips_css+'>' +
                        '<div class='+tips_arrow+'></div>' +
                        '<div class='+tips_content+'>'+conten+'</div>' +
                    '</div>';
        return html;
    }

    $.fn.testInput = function(options){
        var defaultOptions = {

        };
        this.each(function(){
            var el = this;
            if( !/INPUT/i.test(el.nodeName) ) return;
            var data = new function(){
                this.defaultVal = el.value;
                return this;
            };
            $(el).on(options.event, function( e ){
                var obj = this;
                var text = obj.value,
                    type = e.type;
                return type === "focus" ?　focusCallback( obj, text ) :
                       type === "blur" ? blurCallback( obj, text ) :
                       type === "click" ? clickCallback : false;
            });
            function focusCallback( obj, text ){
                if( text === data.defaultVal )obj.value = "";
                if( options.focus ) options.focus( obj );
                return true;
            }

            function blurCallback( obj, text ){
                if( !text )obj.value = data.defaultVal;
                if( options.blur ) {
                    var ok = options.blur(obj);
                    if(ok) return ;
                    options.type !== 1 ? true :tips();
                }

                return true;
            }

            function clickCallback( obj ){alert(12111);
                if( options.click ) options.click( obj );
                return true;
            }
        });
    }
}(jQuery))
