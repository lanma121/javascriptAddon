/**
 * Created by Administrator on 2015/7/4 0004.
 *
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

    $.fn.testInput = function(event,callback,content){
        this.each(function(){
            var inputVal = this.value;
            $(this).on(event,function(e){
                var text = this.value,type = e.type;
                var input = type==="focus" && text === inputVal ?　"": type==="blur" && !text ? inputVal : true;
                if(input !== true){
                    this.value = input;
                    if(callback){callback();}
                }else if(type==="blur"&&$.isFunction(content)){
                    content(tips);
                }else{
                  return this;
                }
            });
        });
    }
}(jQuery))
