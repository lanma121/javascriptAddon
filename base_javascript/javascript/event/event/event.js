/**
 * Created by Administrator on 2015/7/1 0001.
 */
/**
 *
 *  originalEvent:[object MouseEvent]
    type:click                                                     //触发事件的类型
     isDefaultPrevented:function returnFalse() { return false; }
     timeStamp:1435714110802                                        //该属性返回从 1970 年 1 月 1 日到事件发生时的毫秒数。
     jQuery111309299387647770345:true
     toElement:[object HTMLButtonElement]
     screenY:126                                                    //chrome,firfox,IE7+,Safari,opera  鼠标相对于屏幕左上角的位置
     screenX:30                                                     //chrome,firfox,IE7+,Safari,opera  鼠标相对于屏幕左上角的位置
     pageY:65                                                       //chrome,firfox,IE8+,Safari,opera  鼠标相对于document（文档）左上角的位置,ie7不包含body与document的margin(空隙)
     pageX:30                                                       //chrome,firfox,IE8+,Safari,opera  鼠标相对于document（文档）左上角的位置,ie7不包含body与document的margin(空隙)
     offsetY:18                                                     //chrome,IE7+,Safari,opera 鼠标相对于本元素左上角的位置
     offsetX:22                                                     //chrome,IE7+,Safari,opera 鼠标相对于本元素左上角的位置
     clientY:65                                                    //chrome,firfox,IE7+,Safari,opera  鼠标相对于document（文档）左上角的位置
     clientX:30                                                    //chrome,firfox,IE7+,Safari,opera  鼠标相对于document（文档）左上角的位置
     fromElement:null
     buttons:0
     button:0
     which:1                                                        //指示按了哪个键或按钮
     view:[object Window]
     target:[object HTMLButtonElement]                              //触发该事件的 DOM 元素。
     shiftKey:false
     relatedTarget:null
     metaKey:false
     eventPhase:2
     currentTarget:[object HTMLButtonElement]
     ctrlKey:false
     cancelable:true
     bubbles:true
     altKey:false
     delegateTarget:[object HTMLButtonElement]
     handleObj:[object Object]
     data:undefined
     isPropagationStopped:function returnFalse() { return false; }
     isImmediatePropagationStopped:function returnFalse() {return false;}
     //阻止事件的默认动作。例如，当点击提交按钮时阻止对表单的提交
     preventDefault:function () {
        var e = this.originalEvent;
        this.isDefaultPrevented = returnTrue;
        if ( !e ) {
            return;
        }

        // If preventDefault exists, run it on the original event
        if ( e.preventDefault ) {
            e.preventDefault();

            // Support: IE
            // Otherwise set the returnValue property of the original event to false
        } else {
            e.returnValue = false;
        }
    }
    stopPropagation:function () {
        var e = this.originalEvent;
        this.isPropagationStopped = returnTrue;
        if ( !e ) {
            return;
        }
        // If stopPropagation exists, run it on the original event
        if ( e.stopPropagation ) {
            e.stopPropagation();
        }
        // Support: IE
        // Set the cancelBubble property of the original event to true
        e.cancelBubble = true;
    }
    stopImmediatePropagation:function () {
        var e = this.originalEvent;
        this.isImmediatePropagationStopped = returnTrue;
        if ( e && e.stopImmediatePropagation ) {
            e.stopImmediatePropagation();
        }
        this.stopPropagation();
    }
 */
