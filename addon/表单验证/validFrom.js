/**
 * Created by Administrator on 2015/10/22 0022.
 */

/**
 *
 *< form action="提交表单的url" sucmsg="表单提交成功的信息" errormsg="表单提交失败的信息" ajax="自定义ajax提交表单" data="发送到服务器的非表单数据">
     < input type="text" value="" name="name"                       //name 默认ajax提交发送到服务器的属性名，不指定name,改表单默认不发送到服务器
            datatype="e"                                            //必须是字母，数字、下划线、-或*号组成;
                                                                    //内置基本的datatype类型有： * | *6-16 | n | n6-16 | s | s6-18 | p | m | e | url
            ajax="valid.php?myparam1=value1&myparam2=value2"        //指定ajax实时验证的后台文件的地址、配置 或者 自定义验证方法。
            sucmsg="用户名验证通过！"                                //当表单元素通过验证时的提示信息，不绑定，默认提示"通过信息验证！"。
            nullmsg="请输入用户名！"                                 //当表单元素值为空时的提示信息，不绑定，默认提示"请填入信息！"。
            errormsg="请用邮箱或手机号码注册！"                       //输入内容不能通过验证时的提示信息，默认提示"请输入正确信息！"
            recheck="password1"                                     //表单里面经常需要检查两次密码输入是否一致，recheck就是用来指定需要比较的另外一个表单元素（name===recheck）。
            tip="默认提示文字"                                       //表单里经常有些文本框需要默认就显示一个灰色的提示文字，当获得焦点时提示文字消失，失去焦点时提示文字显示。tip属性就是用来实现这个效果。它通常和altercss搭配使用。
            altercss="gray"                                         //它需要和tip属性配合使用，altercss指定的样式名，会在文本框获得焦点时被删除，没有输入内容而失去焦点时重新加上。
            ignore="null" | "ignore"                                //绑定了ignore="null"的表单元素，在有输入时，会验证所填数据是否符合datatype所指定数据类型，没有填写内容时则会忽略对它的验证；
                                                                    //绑定了ignore="ignore"的表单元素，忽略对它的验证；
            sweep:"true"                                            //失去焦点时不验证，提交表单时验证
            event:"blur"                                            //验证事件
            multy:"xxxx"                                            //验证属性multy值为xxxx的表单，全部通过为通过否则不通过
            tiptype="type=2&left=0&right:0&top:0&bottom:0}}         //提示样式
                //tiptype = type=2 或者 2 文字提示；
                //tiptype = type=1 或者 1 弹框提示
                //tiptype = type=3 或者 3 标签提示
                //tiptype = ""       自定义提示信息，可以为tipmsg中的自定义函数对象名 ；可以为jQuery选择器
                //tiptype = left=3   提示信息的左边相对于本元素  左 边的位移
                //tiptype = right=3  提示信息的左边相对于本元素 右 边的位移
                //tiptype = top=3    提示信息的上边相对于本元素 上 边的位移
                //tiptype = bottom=3 提示信息的上边相对于本元素 下 边的位移
            //注意：默认type=2 向右10px; 只能有left top | bottom,right top | bottom;
      />< /form>
 *
 * Validform.defaults={
        tiptype:2,              //    提示类型。 可用的值有：1、2、3和自定义类型，默认tiptype为2
                                //1=> 自定义弹出框提示；
                                //2=> 文字提示
                                //3=> 标签提示
                                // 如果上面的3种提示方式不是你需要的，你可以给tiptype传入自定义函数。通过自定义函数，可以实现你想要的任何提示效果：
                                // tiptype:function(inputobj,msg,statusType,errorType,cssctl){
                                    //msg：提示信息;
                                    //obj指向的是当前验证的表单元素（或表单对象，验证全部验证通过，提交表单时o.obj为该表单对象），
                                    //statusType指示提示的状态，值为1、2、3， 0:正在检查 1：不检测/提交数据，2：通过验证，3：验证失败,
                                    //cssctl:添加默认的验证css样式
                                //}
                                也可以为自定义jQuery  class选择器"，默认为 所有的提示信息将承载到最近的class选择器元素中，深度遍历；

        datatype:{              // 传入自定义datatype类型，可以是正则，也可以是函数。
            "username":function(gets,obj){
                //参数gets是获取到的表单元素值，obj为当前表单元素
                var reg1=/^[\w\.]{4,16}$/,
                    reg2=/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,8}$/;

                if(reg1.test(gets)){return true;}
                if(reg2.test(gets)){return true;}
                return false;

                //注意return可以返回true 或 false 或 字符串文字，true表示验证通过，返回字符串表示验证失败，字符串作为错误提示显示，返回false则用errmsg或默认的错误提示;
            }},
        tipmsg:{},              // 通过该对象可以修改除 tit 以外的其他提示文字，这样可以实现同一个页面的不同表单使用不同的提示文字。
        tipSweep:false,         // 为true时提示信息将只会在表单提交时触发显示，各表单元素blur时不会触发信息提示；
        showAllError:false,     // true：提交表单时所有错误提示信息都会显示；false：一碰到验证不通过的对象就会停止检测后面的元素，只显示该元素的错误信息；
        postonce:false,         // 指定是否开启二次提交防御，true开启，不指定则默认关闭；为true时，在数据成功提交后，表单将不能再继续提交。
        dragonfly:false,        // 默认false，当为true时，值为空时不做验证；
        ajaxPost:false,         // 默认为false，使用ajax方式提交表单数据，将会把数据POST到config方法或表单action属性里设定的地址；
        btnSubmit:".btn_reset", // 指定当前表单下的哪一个按钮触发表单提交事件，如果表单下有submit按钮时可以省略该参数。示例中".btn_sub"是该表单下要绑定点击提交表单事件的按钮；
        btnReset:".btn_reset",  // 是该表单下要绑定点击重置表单事件的按钮,必须form标签包含;
        postonce: true | false, // 默认为false，指定是否开启二次提交防御，true开启，不指定则默认关闭；为true时，在数据成功提交后，表单将不能再继续提交。
        beforeCheck:function(curform){},    //在表单提交执行验证之前执行的函数，curform参数获取到的是当前表单对象。函数return false的话将不会继续执行验证操作;
        showAllError:true | false,          //提交表单时所有错误提示信息都会显示；false：一碰到验证不通过的对象就会停止检测后面的元素，只显示该元素的错误信息；
        label:".label",                     //选择符 在没有绑定nullmsg时查找要显示的提示文字，默认查找".Validform_label"下的文字；
                                              "{0}"是会被找到的label参数指定的对象或Validform_label里的文字替换掉的，
                                              "{填写|选择}"里的文字在绑定了"recheck"属性的表单元素上检测时是会不显示的，当前验证对象是radio、checkbox或select时，会输出"选择"，是其他类型的元素时会输出"填写"和后面的"信息"。
        callback:function(data){//在使用ajax提交表单数据时，数据提交后的回调函数。返回数据data是Json对象：
            //返回数据data是json对象，{"info":"demo info","status":"y"}
            //info: 输出提示信息;
            //status: 返回提交数据的状态,是否提交成功。如可以用"y"表示提交成功，"n"表示提交失败，在ajax_post.php文件返回数据里自定字符，主要用在callback函数里根据该值执行相应的回调操作;
            //你也可以在ajax_post.php文件返回更多信息在这里获取，进行相应操作；
            //ajax遇到服务端错误时也会执行回调，这时的data是{ status:**, statusText:**, readyState:**, responseText:** }；

            //这里执行回调操作;
            //注意：如果不是ajax方式提交表单，传入callback，这时data参数是当前表单对象，回调函数会在表单验证全部通过后执行，然后判断是否提交表单，如果callback里明确return false，则表单不会提交，如果return true或没有return，则会提交表单。
	    },
    }


 curform.validform_status="normal";     //normal | posting | posted;//防止表单按钮双击提交两次;posting 表单正在提交，posted：表单已经提交完毕
 curInput.validform_lastval=inputval;   //存储当前值;
 curInput.validform_inited="inited"     //已经绑定事件时跳过，避免事件重复绑定;
 curInput.validform_ajax="inited"       //表单ajax请求验证;
 注意：
   1. 失去焦点验证表单时，表单元素必须包含datatype属性,并且有值，否则不验证；datatype的值有三种模式及组合，用","分隔表示规则累加；用"|"分隔表示规则多选一。如：
        正则：/\w{3,6}/i,/\d{3,6}/ | *4-18
        函数：function1(gets,obj,curform,Validform.util.dataType) | function2(gets,obj,curform,Validform.util.dataType)
                //gets:input的值，obj：当前input对象， curform:当前表单的对象
        预定义字符：请看Validform.util.dataType

   2. 如果是radio，必须包含name属性；
   3. 如果有默认的value，必须设定tip属性为默认的value值
   4. 提示信息设定：
      1. 默认的提示信息，参考tipmsg;
      2. settings.tipmsg = {};
      3. 给input 对象添加  sucmsg="用户名验证通过！"
                          nullmsg="请输入用户名！"
                          errormsg="填写错误！"
  5. 必须要表单form元素包含 且表单元素有name属性作为表单提交的参数名称；

  6. 若为checkbox 或者 radio
        * 必须包含name 且值相同
        * 只给最后一个加datatype，因为他们都验证是否有选中（datatype都相同）
 */

(function($,win,undef){
    var tipmsg={//默认提示文字;
        tit:"提示信息",
        w:{
            "*":"不能为空！",
            "*6-16":"请填写6到16位任意字符！",
            "n":"请填写正整数！",
            "n6-16":"请填写6到16位数字！",
            "s":"不能输入特殊字符！",
            "s6-18":"请填写6到18位字符！",
            "zh2-4":"请输入2到4个中文字符！",
            "p":"请填写邮政编码！",
            "m":"请填写手机号码！",
            "e":"邮箱地址格式不对！",
            "url":"请填写网址！"
        },
        def:"请填写正确信息！",
        undef:"请正确设置datatype！",
        reck:"两次输入的内容不一致！",
        r:"信息通过验证！",
        c:"正在检测信息…",
        s:"请{填写|选择}{0|信息}！",
        v:"所填信息没有经过验证，请稍后…",
        p:"正在提交数据…",
        m:"请先正确填写信息",
        ajax:"ajax检查"
    }
    $.Tipmsg=tipmsg;
    var htmlCss = {
        offset:function(){

        }
    }
    var htmlDom = {
        setMsgPostion:function(inputobj,tipTypeStr,tiptype,msgBox,curform){
            var
                objWidth   = inputobj.outerWidth(),
                objHeight  = inputobj.outerHeight(),
                objLeft    = inputobj.offset().left,
                objTop     = inputobj.offset().top,
                isDir = /.*left=(-?\d+)|.*right=(-?\d+)|.*bottom=(-?\d+)|.*top=(-?\d+)/g,
                left   = isDir.test(tipTypeStr) ? parseInt(tipTypeStr.replace(isDir,"$1")) : tiptype.left,
                right  = isDir.test(tipTypeStr) ? parseInt(tipTypeStr.replace(isDir,"$2")) : tiptype.right,
                bottom = isDir.test(tipTypeStr) ? parseInt(tipTypeStr.replace(isDir,"$3")) : tiptype.bottom,
                top    = isDir.test(tipTypeStr) ? parseInt(tipTypeStr.replace(isDir,"$4")) : tiptype.top,
                setLeft = left&&$.type(left) === "number" ? (objLeft - left) : right&&$.type(right) === "number" ? (objLeft + right + objWidth) : (objLeft + objWidth+10),
                setTop = bottom&&$.type(bottom) === "number" ? (objTop + objHeight + bottom) : top&&$.type(top) === "number" ? (objTop - top) : objTop;
            msgBox.css({"height":objHeight+"px","line-height":objHeight+"px"});
            msgBox.offset({left:setLeft,top:setTop});
        },
        clearMsgBox:function(){
            var type = this.tiptypes;
            if(type){
                type.empty();
                Validform.util.cssctl($(this),1);
            }
        },
        findMsgBox:function(obj,tiptype){
            if($(tiptype).selector&&$(tiptype)[0]){
                return $(tiptype);
            }
            while(!obj.parent().is("body")){
                var checktip = obj.siblings("."+tiptype)[0];
                if(checktip){
                    return $(checktip);
                }
                obj = obj.parent();
            }
            return false;
        },
        replaceMsg:function(obj,content){
            obj.html(content);
        },
        createMsgBox:function(type,appendObj){
            var tiptype;
            switch (type){
                case 1:
                    break;
                case 3:
                    break;
                default :
                    tiptype = $('<div class="Validform_checktip"></div>');
                    break;
            }
            $(appendObj || "body").append( tiptype );
            return tiptype;
        },
        addMsgBoxEvent:function(obj){
            var _this = this;
            obj.on("click",function(){
                $(this).remove();
                _this.tiptype2= null;
            });
        }
    }

    var Validform=function(forms,settings){
        var settings=$.extend({},Validform.defaults,settings);
        settings.datatype && $.extend(Validform.util.dataType,settings.datatype);//如果有自定义datatype，合并自定义的datatype 到 Validform.util.dataType
        var tipmsgs = $.extend({w:{}},settings.tipmsg);
        forms.each(function(){
            //已经绑定事件时跳过，避免事件重复绑定;
            if(this.validform_inited=="inited"){return true;}
            this.validform_inited="inited";
            var curform=this;
            curform.settings=$.extend({},settings);
            var $this=$(curform);
            //防止表单按钮双击提交两次;
            curform.validform_status="normal"; //normal | posting | posted;
            //让每个Validform对象都能自定义tipmsg;
            $this.data("tipmsg",tipmsgs);
            //bind the blur event;

            // * 默认给属性为datatype且无event属性（不是自定义事件）的表单添加blur事件，触发后进行检查
            $this.on("blur","[datatype]",function(){
                Validform.util.check.call(this,$this);
            });
            // 给checkbox radio select 添加 change事件，切记给name相同的checkbox radio 只给最后一个元素添加datatype
            $this.find("[datatype]:checkbox,[datatype]:radio,[datatype]select").each(function(){
                var _this=this;
                var name = _this.name;
                var obj = _this.nodeName==="SELECT" ? $(_this):$this.find("[name='"+name+"']").filter(":checkbox,:radio");
                obj.on("change",function(){
                    $(_this).trigger("blur");
                });
            });
            //添加自定义 事件
            $this.find("[event][datatype]").each(function(){
                var event = $(this).attr("event");
                event && $(this).on(event,function(){
                    $(this).trigger("blur");
                });
            });

            //？？？？？？？？？？？？？？？？
            // $this.on("keypress",":text",function(event){
            //    if(event.keyCode==13 && $this.find(":submit").length==0){
            //        $this.submit();
            //    }
            //});

            //点击表单元素，默认文字消失效果;
            //表单元素值比较时的信息提示增强;
            //radio、checkbox提示信息增强;
            //外调插件初始化;
            //Validform.util.enhance.call($this,curform.settings.tiptype,curform.settings.usePlugin,curform.settings.tipSweep);

            curform.settings.btnSubmit && $this.find(curform.settings.btnSubmit).on("click",function(){
                curform.nodeName==="FORM" ? $this.trigger("submit"):Validform.util.submitForm.call($this,curform.settings);
                return false;
            });

            $this.submit(function(){
                var subflag=Validform.util.submitForm.call($this,curform.settings);
                subflag === undef && (subflag=true);
                return subflag;
            });

            $this.find("[type='reset']").add($this.find(curform.settings.btnReset)).on("click",function(){
                Validform.util.resetForm.call($this);
            });

        });

    }

    Validform.defaults={
        tiptype:{type:2,right:10},      // 承载提示内容的容器，默认是2，方向靠右10px;
        tipSweep:false,                 // 为true时提示信息将只会在表单提交时触发显示，各表单元素blur时不会触发信息提示；
        showAllError:false,             // true：提交表单时所有错误提示信息都会显示；false：一碰到验证不通过的对象就会停止检测后面的元素，只显示该元素的错误信息；
        postonce:false,                 // 指定是否开启二次提交防御，true开启，不指定则默认关闭；为true时，在数据成功提交后，表单将不能再继续提交。
        ajaxPost:false                 // 默认为false，使用ajax方式提交表单数据，将会把数据POST到config方法或表单action属性里设定的地址；
    }

    Validform.util={
        dataType:{
            "*":/[\w\W]+/,                                          //检测是否有输入，可以输入任何字符，不留空即可通过验证；
            "*6-16":/^[\w\W]{6,16}$/,                               //检测是否为6到16位任意字符；
            "n":/^\d+$/,                                            //数字类型；
            "n6-16":/^\d{6,16}$/,                                   //6到16位数字；
            "s":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,            //字符串类型；
            "s6-18":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,   //6到18位字符串；
            "zh2-4":/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,          //2到4位中文字符
            "p":/^[0-9]{6}$/,                                       //验证是否为邮政编码；
            "m":/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,  //手机号码格式；
            "e":/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,   //email格式；
            "url":/^(\w+:\/\/)?\w+(\.\w+)+.*$/                      //验证字符串是否为网址。
        },
        toString:Object.prototype.toString,
        isEmpty:function(val){
            val = val||$.trim(this.val());
            return val==="" || val===$.trim(this.attr("tip"));
        },
        getValue:function(obj){//obj 每个表单下的input对象
            var inputval,
                curform=this;//当前表单对象

            if(obj.is(":radio")){
                inputval=curform.find(":radio[name='"+obj.attr("name")+"']:checked").val();
                inputval= inputval===undef ? "" : inputval;
            }else if(obj.is(":checkbox")){
                inputval="";
                curform.find(":checkbox[name='"+obj.attr("name")+"']:checked").each(function(){
                    inputval +=$(this).val()+',';
                })
                inputval= inputval===undef ? "" : inputval;
            }else{
                inputval=obj.val();
            }
            inputval=$.trim(inputval);

            return Validform.util.isEmpty.call(obj,inputval) ? "" : inputval;
        },
        getNullmsg:function(curform){//获取预定义为空的提示信息
            var obj=this;
            var reg=/[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z\s]+/g;//匹配中文
            var nullmsg;
            //如果settings.label？ 获取settings.label的text()作为***为空；
            // 如；<span class="Validform_label">*用户名：</span><input type="text" val="" datatype="s" />提示："请输入用户名！"
            var label=curform[0].settings.label || ".Validform_label";
            label=obj.siblings(label).eq(0).text() || obj.siblings().find(label).eq(0).text() || obj.parent().siblings(label).eq(0).text() || obj.parent().siblings().find(label).eq(0).text() || obj.siblings("lable").eq(0).text();
            label=label.replace(/\s(?![a-zA-Z])/g,"").match(reg);//空白字符 + 不是A-z的字符（匹配空白字符，但是空白字符后不是字母）去掉空白符，如果是单词不去掉
            label=label? label.join("") : [""];//把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。

            reg=/\{(.+)\|(.+)\}/;//{任意一位 | 任意一位}"请{填写|选择}{0|信息}！"
            nullmsg=curform.data("tipmsg").s || tipmsg.s;

            if(label != ""){
                nullmsg=nullmsg.replace(/\{0\|(.+)\}/,label);//请{填写|选择}！
                if(obj.attr("recheck")){
                    nullmsg=nullmsg.replace(/\{(.+)\}/,"");//请！
                    obj.attr("nullmsg",nullmsg);
                    return nullmsg;
                }
            }else{
                nullmsg=obj.is(":checkbox,:radio,select") ? nullmsg.replace(/\{0\|(.+)\}/,"") : nullmsg.replace(/\{0\|(.+)\}/,"$1");
            }
                // $1、$2、...、$99	与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。
                // $&	与 regexp 相匹配的子串。
                // $`	位于匹配子串左侧的文本。
                // $'	位于匹配子串右侧的文本。
                // $$	直接量符号。
            nullmsg=obj.is(":checkbox,:radio,select") ? nullmsg.replace(reg,"$2") : nullmsg.replace(reg,"$1");

            obj.attr("nullmsg",nullmsg);
            return nullmsg;
        },
        getErrormsg:function(inputobj,curform,datatype){//获取预定义的错误信息
            var parseErrormsg = function(){
                var regxp=/^(.+?)((\d+)-(\d+))?$/,  //任意一位字符开头 0位或1位[0-9]-[0-9],如"n0-9", "n"
                    regxp2=/^(.+?)(\d+)-(\d+)$/,    //任意一位字符开头,[0-9]-[0-9]结尾,如"n0-9"
                    regxp3=/(.*?)\d+(.+?)\d+(.*)/,  //任意0位多位字符 + 至少一位数字 + 至少一位任意字符 + 至少一位数字 + 0位或多位任意字符
                    mac=datatype.match(regxp),
                    temp,str;
                var tipmsg_w_ex=$.extend({},tipmsg.w,curform.data("tipmsg").w);
                //如果原来就有，直接显示该项的提示信息;
                if(mac[0] in tipmsg_w_ex){
                    return curform.data("tipmsg").w[mac[0]] || tipmsg.w[mac[0]];
                }
                //没有的话在提示对象里查找相似;
                for(var name in tipmsg_w_ex){
                    if(name.indexOf(mac[1])!=-1 && regxp2.test(name)){
                        str=(curform.data("tipmsg").w[name] || tipmsg.w[name]).replace(regxp3,"$1"+mac[3]+"$2"+mac[4]+"$3");
                        curform.data("tipmsg").w[mac[0]]=str;
                        return str;
                    }
                }
                return curform.data("tipmsg").def || tipmsg.def;
            }
            return Validform.util.isEmpty.call(inputobj) ? (inputobj.attr("nullmsg") || Validform.util.getNullmsg.call(inputobj,curform)) : //  ==> 获取空值错误信息
            datatype=="recheck" ? (curform.data("tipmsg").reck || tipmsg.reck) :  //  ==> 获取重复错误信息
            datatype=="multy" ? (curform.data("tipmsg").m || tipmsg.m) :          //  ==> 获取多个验证关联默认错误信息
            datatype=="ajax" ? (curform.data("tipmsg").ajax || tipmsg.ajax) :     //  ==> 获取ajax请求错误信息
            datatype ? (inputobj.attr("errormsg") || parseErrormsg()) :           //  ==> 获取datatype检测错误信息
            (curform.data("tipmsg").undef||tipmsg.undef);                         //  ==> 获取atatype定义错误信息
        },
        cssctl:function(obj,status){
            var msgbox = obj[0].tiptypes;
            if(!msgbox)return;
            switch(status){
                case 0://移除错误信息，增加加载信息
                    msgbox.removeClass("Validform_right Validform_wrong").addClass("Validform_loading Validform_checktip");//checking;
                    obj.removeClass("Validform_error");
                    break;
                case 1://移除所有信息，回复原状
                    msgbox.empty();
                    msgbox.removeClass("Validform_right Validform_wrong Validform_loading Validform_checktip")//ignore;
                    obj.removeClass("Validform_error");
                    break;
                case 2://移除错误信息，增加正确信息
                    msgbox.removeClass("Validform_wrong Validform_loading").addClass("Validform_right Validform_checktip");//passed;
                    obj.removeClass("Validform_error");
                    break;
                default:
                    msgbox.removeClass("Validform_right Validform_loading").addClass("Validform_wrong Validform_checktip");//wrong;status ==  3
                    obj.addClass("Validform_error");
            }
        },
        showmsg:function(curform,tiptype,inputobj,statusType,bool,errorType){
            /*
             tiptype:   提示信息显示方式;
             inputobj:  当前对象,
             statusType:0 ==>正在检查
                        1 ==>不检测验证
                        2 ==>通过
                        3 ==> 错误
             errorType:datatpye    ==>  datatpye检测错误;
                        undefinded ==> 定义错误（解析到的正则在预定义中找不到）;
                        "recheck"  ==> 重复验证
                        "ajax"     ==> ajax验证
             isEmptyVal            ==> 空值错误

             bool:      只检查不显示检查信息
             */

            inputobj[0].checkStatus = statusType === 3 ? false :true;   //保存检查结果
            inputobj[0].statusType = statusType;                        //保存状态类型
            //多表单关联检查，只要有一个不通过即为不通过
            var multy = inputobj.attr("multy");
            multy&&(statusType===2||statusType===3)&&
            curform.find("[multy='"+multy+"'][datatype]").each(function(){
                if(this.checkStatus||(this.checkStatus===undef&&$(this).attr("ignore"))){
                    $(this).removeClass("Validform_error");
                    return true;
                }
                if(this===inputobj[0]){
                    if(statusType===3)
                        return false;
                    return true;
                }
                statusType = 3;
                inputobj = $(this);
                errorType="multy";
                return false;
            });
            if(bool){return inputobj[0].checkStatus;}                   // bool只检查不显示检查信息

            var msg = statusType === 0 ? (errorType==="submitAjax" ? (curform.data("tipmsg").p||tipmsg.p):(curform.data("tipmsg").c||tipmsg.c)) :                               //检测状态  ==> 正在检查
                      statusType === 1 ? Validform.util.cssctl(inputobj,statusType):                          //检测状态  ==> 忽略
                      statusType === 2 ? (errorType==="ajax"&&tipmsg.ajax || inputobj.attr("sucmsg") || curform.data("tipmsg").r || tipmsg.r):   //检测状态  ==> 正确
                      statusType === 3 ? Validform.util.getErrormsg(inputobj,curform,errorType):null;         //检测状态  ==> 错误

            if(!msg){return;}// 如果msg为undefined，那么就没必要执行后面的操作，ignore有可能会出现这情况;

            var msgBox = null,
                tipTypeStr = inputobj.attr("tiptype"),
                istype = /.*type=([1-4]{1}).*|(^[1-4]{1}$)/,
                type   = istype.test(tipTypeStr) && parseInt(tipTypeStr.replace(istype,"$1$2")) || tipTypeStr || tiptype.type || tiptype;
            if(type==1){
                $("body").layer({
                    content:msg,
                    icon:1
                });
                return ;
            }
            //type ===2
            if(!inputobj[0].tiptypes){
                if($.type(type)==="string"){
                    //自定义方法
                    var fun = curform.data("tipmsg")[type];
                    if($.type(fun)==="function"){
                        fun(inputobj,msg,statusType,errorType,Validform.util.cssctl);
                        return ;
                    }
                    //若type==="default",本对象后面创建承载信息的dom
                    if(type==="default"){
                        msgBox = $("<span></span>");
                        inputobj.after(msgBox);
                    }else{
                        // 自定义jQuery选择器
                        msgBox=htmlDom.findMsgBox(inputobj,type);
                    }
                }
            }else{
                msgBox = inputobj[0].tiptypes;
            }
            if(!msgBox){
                msgBox = htmlDom.createMsgBox(type);//默认样式
                htmlDom.setMsgPostion(inputobj,tipTypeStr,tiptype,msgBox,curform);
            }
            htmlDom.replaceMsg(msgBox,msg);
            inputobj[0].tiptypes = msgBox;
            Validform.util.cssctl(inputobj,statusType);
        },
        parseDatatype:function(datatype){
            /*
            解析datatype（验证内容）：
             字符串里面只能含有一个正则表达式;
             Datatype名称必须是字母，数字、下划线或*号组成;
             datatype="/regexp/|phone|tel,s,e|f,e";
             ==>[["/regexp/"],["phone"],["tel","s","e"],["f","e"]];
             */
            /**
             * datatype="m | e, *4-18 | /\w{3,6}/i | /^validform\.rjboy\.cn$/"，
             * /[\w\*-]+/g  ---------------------------------->全局至少匹配 一位[A-z 0-9 *]
             * /\/.+?\/[mgi]*(?=(,|$|\||\s))/g --------------->全局匹配紧随正则表达式后的 ，空格，| 或者以正则表达式结尾
             * 上面两个正则必须要有一个符合
             * 用","分隔表示规则累加；用"|"分隔表示规则多选一
             *
             */
            var reg=/!?\/.+?\/[mgi]*(?=(,|$|\||\s))|!?[\w\*-]+/g,//全局匹配/./[mgi] (0 , | $ | "|" |  ) | (word*-)
                dtype=datatype.match(reg),
                sepor=datatype.replace(reg,"").replace(/\s*/g,"").split(""),//过滤掉匹配的字符，留下 分隔符，比如， |；
                arr=[],
                m=0;
            arr[0]=[];
            arr[0].push(dtype[0]);
            for(var n=0;n<sepor.length;n++){//将|的分为一组arr = [[patt1,patt2],[patt3]]  patt1,patt2和patt3各为一组，patt1和patt2都满足或者patt3满足，才能满足
                if(sepor[n]=="|"){
                    m++;
                    arr[m]=[];
                }
                arr[m].push(dtype[n+1]);
            }
            return arr;
        },
        _regcheck:function(datatype,gets,obj,curform){//执行验证内容datatype
            var curform=curform,
                reg=/!?\/.+\//g,
                regex=/^(.+?)(\d+)-(\d+)$/,
                passed=false,       //验证对错
                isQuFan = false;
            if(datatype.indexOf("!")===0){
                isQuFan = !isQuFan;
                datatype=datatype.slice(1);

            };
            //datatype有三种情况：正则，函数和直接绑定的正则;
            //直接是正则;
            if(reg.test(datatype)){
                var regstr=datatype.match(reg)[0].slice(1,-1);// stringObject.slice(start,end)提取字符串的某个部分，并以新的字符串返回被提取的部分。
                                                              // start:要抽取的片断的起始下标。如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。
                                                              // end:紧接着要抽取的片段的结尾的下标。若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。
                var param=datatype.replace(reg,"");
                var rexp=RegExp(regstr,param);
                passed=rexp.test(gets);
                //function;
            }else if(Validform.util.toString.call(Validform.util.dataType[datatype])=="[object Function]"){
                //注意return可以返回true 或 false 或 字符串文字，true表示验证通过，返回字符串表示验证失败，字符串作为错误提示显示，返回false则用errmsg或默认的错误提示;
                var result=Validform.util.dataType[datatype](gets,obj);
                tipmsg.w[datatype] = null;
                if(result===true||result===undefined){
                    passed = true;
                }else{
                    passed = false;
                    result&&(tipmsg.w[datatype] = result);
                }
                //自定义正则;
            }else{
                //自动扩展datatype;
                var tip = tipmsg.w[datatype];
                if(!(datatype in Validform.util.dataType)){//  /^(.+?)(\d+)-(\d+)$/
                    var mac=$.type(datatype)==="string" ? datatype.match(regex):false,
                        temp;
                    if(!mac){
                        passed=false;
                        datatype = undefined;
                    }else{
                        for(var name in Validform.util.dataType){
                            temp=name.match(regex);
                            if(!temp){continue;}
                            if(mac[1]===temp[1]){
                                tip = temp[0];
                                var str=Validform.util.dataType[name].toString(),
                                    param=str.match(/\/[mgi]*/g)[1].replace("\/",""),
                                    regxp=new RegExp("\\{"+temp[2]+","+temp[3]+"\\}","g");
                                str=str.replace(/\/[mgi]*/g,"\/").replace(regxp,"{"+mac[2]+","+mac[3]+"}").replace(/^\//,"").replace(/\/$/,"");
                                Validform.util.dataType[datatype]=new RegExp(str,param);
                                break;
                            }
                        }
                    }
                }

                if(Validform.util.toString.call(Validform.util.dataType[datatype])=="[object RegExp]"){
                    passed=Validform.util.dataType[datatype].test(gets);
                }

            }
            passed = datatype&&isQuFan&&!Validform.util.isEmpty.call(obj,gets) ? !passed :passed;
            if(passed&&obj.attr("recheck")){
                //规则验证通过后，还需要对绑定recheck的对象进行值比较;
                var theother=curform.find("input[name='"+obj.attr("recheck")+"']:first");
                if(gets!=theother.val()){
                    passed=false;
                    datatype="recheck";
                }
            }
            datatype = isQuFan&&datatype&&datatype!=="recheck"? "!"+datatype:datatype;
            return{
                checkStatus:(passed ? 2:3), //检查状态: 2 通过,3未通过
                errorType:datatype          //错误类型: datatype检查未通过, recheck重复未通过，undefined解析到的正则在预定义中找不到
            };

        },
        regcheck:function(curform,datatype,gets,obj){
            /*
            循环验证步骤
             datatype:datatype;
             gets:inputvalue;
             obj:input object;
             */
            var dtype=obj[0]["datatypes"] ? obj[0]["datatypes"] : Validform.util.parseDatatype(datatype);
            obj[0]["datatypes"] = dtype;
            var res;
            for(var eithor=0; eithor<dtype.length; eithor++){
                for(var dtp=0; dtp<dtype[eithor].length; dtp++){
                    res=Validform.util._regcheck(dtype[eithor][dtp],gets,obj,curform);
                    if(res.checkStatus === 3){//验证错误跳出本循环
                        break;
                    }
                }
                if(res.checkStatus === 2){//如果本组验证全部通过，则跳出循环，验证完成
                    break;
                }
            }
            return res;
        },
        abort:function(){
            if(this.validform_ajax){
                this.validform_ajax.abort();//取消ajax请求
            }
        },
        ajaxCheck:function(inputobj,inputval,curform,ajaxurl,settings,bool,subpost){
            /**
             * ajaxurl 字符串，可以是设置ajax的默认参数、自定义请求方法、 或者  url
             *
             * 1. 请求参数统一为
             *      name = name的值，
             *      value = value的值
             * 2. 返回json, 属性统一为：
             *      status:1,成功 2 失败，
             *      info : 为提示信息
             *
             * @type {Validform.util}
             */
            var thiss = this;
            Validform.util.abort.call(inputobj[0]);
            Validform.util.showmsg(curform,2,inputobj,0,bool);
            var ajaxsetup = settings[ajaxurl] || {};
            if($.type(ajaxsetup)==="function"){
                ajaxsetup( Validform.util.showmsg);
                return;
            }
            var localconfig={
                type: "POST",
                cache:false,
                url: ajaxurl,
                dataType:"json",
                data: "value="+encodeURIComponent(inputval)+"&name="+encodeURIComponent(inputobj.attr("name")),
                success: function(data){
                    if (window.console && window.console.log){
                        console.log("--------------------------------");
                        console.log(data);
                    }
                    var isAjax = "";
                    if(data.info){
                        tipmsg.ajax = data.info;
                        isAjax = "ajax";
                    }
                    var checkStatus = 3;
                    if(data.status==1){
                        checkStatus=2;
                        if(subpost==="ajaxpost"){//提交表单
                            curform.find("[datatype]").each(function(){

                            })
                        }
                    }
                    Validform.util.showmsg(curform,2,inputobj,checkStatus,bool,isAjax);
                    inputobj[0].validform_ajax=null;
                },
                error: function(xhr,textStatus,errorThrown){
                    if (window.console && window.console.log)console.log("------------ajax 请求错误--------------------");
                    if (window.console && window.console.log)console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState+";XMLHttpRequest.status"+XMLHttpRequest.status);
                    if (window.console && window.console.log)console.log("textStatus:"+textStatus+";errorThrown:"+errorThrown);
                    if(xhr.status=="200"){
                        xhr.responseText==1 ? ajaxsetup.success({"status":1}):
                            ajaxsetup.success({"status":2,"info":xhr.responseText});
                        return false;
                    }
                    tipmsg.ajax = "ajax请求出错==>"+xhr.statusText;
                    Validform.util.showmsg(curform,2,inputobj,3,bool,"ajax");
                    inputobj[0].validform_ajax=null;
                    return true;
                }
            }
            if(ajaxsetup.success){
                var temp_suc=ajaxsetup.success;
                ajaxsetup.success=function(data){
                    localconfig.success(data);
                    temp_suc(data,inputobj);
                }
            }
            if(ajaxsetup.error){
                var temp_err=ajaxsetup.error;
                ajaxsetup.error=function(data){
                    //localconfig.error返回false表示不需要执行temp_err;
                    localconfig.error(data) && temp_err(data,inputobj);
                }
            }
            ajaxsetup=$.extend({},localconfig,ajaxsetup);
            //inputobj[0].validform_ajax=$.ajax(localconfig);
        },
        check:function(curform,subpost,bool){
            /*
             检测单个表单元素;
             验证通过返回true，否则返回false、实时验证返回值为ajax;
             curform:jQuery 对象
             subpost 判断是否是在提交表单操作时触发的验证请求；
             bool，传入true则只检测不显示提示信息，当在提交表单时，ajax 调用的时候传入["postform"];
             */
            var settings=curform[0].settings;
            var inputobj = $(this);
            var ignore = $.trim(inputobj.attr("ignore"));
            var inputval = Validform.util.getValue.call(curform,inputobj);
            var isEmptyVal = Validform.util.isEmpty.call(inputobj,inputval);
            //添加了ignore属性且等于“ignore”的表单不做验证
            if(ignore==="ignore"){
                return true;
            }
            //sweep==="true",失去焦点不验证,只在表单提交时验证
            //tipSweep为true(只在表单提交时触发)，且当前不是处于错误状态时，blur事件不触发信息显示;
            if(!subpost&&!inputobj.is(".Validform_error")&&(settings.tipSweep || inputobj.attr("sweep")==="true")){
                return true;
            }
            //内容未发生变化的不进行第二次验证
            if( inputval===this.validform_lastval ){
                return this.checkStatus;
            }
            this.validform_lastval = inputval;
            var recheck = this.recheck;
            if(recheck){//当有重复检查时，被重复数据有变化，删除重复数据的检查信息
                Validform.util.cssctl($(recheck),1);
                recheck.value = $(recheck).attr("tip") ||"";
                $(recheck).focus();
            }else{
                recheck = inputobj.attr("recheck");
                recheck&&(curform.find("input[name='"+recheck+"']:first")[0].recheck=this);//获取重复验证的对象
            }
            //验证是否通过返回通过
            var flag = ignore==="null" && isEmptyVal ? {checkStatus:1}://ignore;
            Validform.util.regcheck(curform,inputobj.attr("datatype"),inputval,inputobj);
            var statusType = flag.checkStatus;
            if(statusType === 3){
                Validform.util.abort.call(inputobj[0]);//取消正在进行的ajax验证;
                Validform.util.showmsg(curform,settings.tiptype,inputobj,statusType,bool,flag.errorType);
                return false;
            }
            //验证通过的话，如果绑定有ajaxurl，要执行ajax检测;
            var ajax=inputobj.attr("ajax");
            if(ajax&&!isEmptyVal){
                Validform.util.ajaxCheck.call(this,inputobj,inputval,curform,ajax,settings,bool,subpost);
            }else{
                Validform.util.showmsg(curform,settings.tiptype,inputobj,statusType,bool);
            }
            return true;

        },
        submitForm:function(settings,flg,url,ajaxPost,sync){
            /*
             flg===true时跳过验证直接提交;
             ajaxPost==="ajaxPost"指示当前表单以ajax方式提交;
             */
            var curform=this;
            //表单正在提交时点击提交按钮不做反应;
            if(curform[0].validform_status==="posting"){return false;}
            curform[0].validform_status="posting";
            //要求只能提交一次时;
            if(settings.postonce && curform[0].validform_status==="posted"){return false;}
            //在表单提交执行验证之前执行的函数，curform参数获取到的是当前表单对象。函数return false的话将不会继续执行验证操作;
            var beforeCheck=settings.beforeCheck && settings.beforeCheck(curform);
            if(beforeCheck===false){return false;}
            var flag =true;
            curform.find("[datatype]").each(function(){
                flag = Validform.util.check.call(this,curform,"subpost");
                if(!flag){
                    flag=false;
                    //默认为false，true：提交表单时所有错误提示信息都会显示；false：一碰到验证不通过的对象就会停止检测后面的元素，只显示该元素的错误信息；
                    if(!settings.showAllError){
                        $(this).focus();
                        return false;
                    }
                    return true;
                }
            });
            if(!flag){
                curform.find(".Validform_error:first").focus();
                curform[0].validform_status="normal";
                return false;
            }
            var ajaxs = curform.find("[datatype][ajax]");
            var ajaxok = function(ajax){
                ajaxs = [];
                ajax.each(function(){
                    var statusType = this.statusType;
                    if(statusType===3){
                        flag=false;
                        return false;
                    }
                    statusType===0 && ajaxs.push(this);//所有的ajax验证对象
                });
                if(!flag){
                    curform[0].validform_status="normal";
                    return false;
                }
                ajaxs.length>0 ? setTimeout(function(){ajaxok(ajaxs)},20) : commitForm();
            }
            ajaxok(ajaxs);
            var commitForm = function(){
                if(curform.attr("action")){
                    return true;
                }
                //在表单验证通过，提交表单数据之前执行的函数，data参数是当前表单对象。
                //函数return false的话表单将不会提交;
                var beforeSubmit=settings.beforeSubmit && settings.beforeSubmit(curform);
                if(beforeSubmit===false){return false;}
                //获取配置参数;
                var ajaxurl = curform.attr("ajax");
                var ajaxsetup = settings[ajaxurl] || {};
                if($.type(ajaxsetup)==="function"){
                    ajaxsetup( Validform.util.showmsg);
                    return;
                }
                Validform.util.showmsg(curform,1,curform,0,bool,"submitAjax");
                if(ajaxsetup.success){
                    var temp_suc=ajaxsetup.success;
                    ajaxsetup.success=function(data){
                        settings.callback && settings.callback(data);
                        curform[0].validform_ajax=null;
                        curform[0].validform_status = data.status==1 ? "posted" : "normal";
                        temp_suc(data,curform);
                    }
                }
                if(ajaxsetup.error){
                    var temp_err=ajaxsetup.error;
                    ajaxsetup.error=function(data){
                        settings.callback && settings.callback(data);
                        curform[0].validform_status="normal";
                        curform[0].validform_ajax=null;
                        temp_err(data,curform);
                    }
                }

                var localconfig={
                    url:ajaxurl,
                    type: "POST",
                    async:true,
                    dataType:"json",
                    data: curform.serialize(),
                    success: function(data){
                        if (window.console && window.console.log){
                            console.log("--------------------------------");
                            console.log(data);
                        }
                        var isAjax = "";
                        if(data.info){
                            tipmsg.ajax = data.info;
                            isAjax = "ajax";
                        }
                        var checkStatus = 3;
                        curform[0].validform_status="normal";
                        if(data.status==1){
                            checkStatus=2;
                            curform[0].validform_status="posted";
                        }
                        isAjax&&Validform.util.showmsg(curform,1,curform,checkStatus,bool,isAjax);
                        settings.callback && settings.callback(data);
                        curform[0].validform_ajax=null;
                    },
                    error: function(data){
                        tipmsg.ajax ="status: "+data.status+"; statusText: "+data.statusText;
                        Validform.util.showmsg(curform,1,curform,3,bool,"ajax");
                        curform[0].validform_status="normal";
                        curform[0].validform_ajax=null;
                    }
                }
                ajaxsetup=$.extend({},localconfig,ajaxsetup);
                curform[0].validform_ajax=$.ajax(ajaxsetup);
            }
            return false;

        },
        resetForm:function(){
            var brothers=this;
            brothers.each(function(){
                this.reset && this.reset();
                this.validform_status="normal";
            });
            //brothers.find(".passwordStrength").children().removeClass("bgStrength");
            //$(".Validform_checktip").remove();
            brothers.find("[datatype]").each(function(){
                this.validform_lastval=null;
                Validform.util.cssctl($(this),1);
            });
            brothers.eq(0).find("input:first").focus();
        },
        enhance:function(tiptype,usePlugin,tipSweep,addRule){
            var curform=this;

            //页面上不存在提示信息的标签时，自动创建;
            curform.find("[datatype]").each(function(){
                if(tiptype==2){
                    if($(this).parent().next().find(".Validform_checktip").length==0){
                        $(this).parent().next().append("<span class='Validform_checktip' />");
                        $(this).siblings(".Validform_checktip").remove();
                    }
                }else if(tiptype==3 || tiptype==4){
                    if($(this).siblings(".Validform_checktip").length==0){
                        $(this).parent().append("<span class='Validform_checktip' />");
                        $(this).parent().next().find(".Validform_checktip").remove();
                    }
                }
            })

            //表单元素值比较时的信息提示增强;
            curform.find("input[recheck]").each(function(){
                //已经绑定事件时跳过;
                if(this.validform_inited=="inited"){return true;}
                this.validform_inited="inited";

                var _this=$(this);
                var recheckinput=curform.find("input[name='"+$(this).attr("recheck")+"']");
                recheckinput.bind("keyup",function(){
                    if(recheckinput.val()==_this.val() && recheckinput.val() != ""){
                        if(recheckinput.attr("tip")){
                            if(recheckinput.attr("tip") == recheckinput.val()){return false;}
                        }
                        _this.trigger("blur");
                    }
                }).bind("blur",function(){
                    if(recheckinput.val()!=_this.val() && _this.val()!=""){
                        if(_this.attr("tip")){
                            if(_this.attr("tip") == _this.val()){return false;}
                        }
                        _this.trigger("blur");
                    }
                });
            });

            //hasDefaultText;
            curform.find("[tip]").each(function(){//tip是表单元素的默认提示信息,这是点击清空效果;
                //已经绑定事件时跳过;
                if(this.validform_inited=="inited"){return true;}
                this.validform_inited="inited";

                var defaultvalue=$(this).attr("tip");
                var altercss=$(this).attr("altercss");
                $(this).focus(function(){
                    if($(this).val()==defaultvalue){
                        $(this).val('');
                        if(altercss){$(this).removeClass(altercss);}
                    }
                }).blur(function(){
                    if($.trim($(this).val())===''){
                        $(this).val(defaultvalue);
                        if(altercss){$(this).addClass(altercss);}
                    }
                });
            });

            //enhance info feedback for checkbox & radio;
            curform.find(":checkbox[datatype],:radio[datatype]").each(function(){
                //已经绑定事件时跳过;
                if(this.validform_inited=="inited"){return true;}
                this.validform_inited="inited";

                var _this=$(this);
                var name=_this.attr("name");
                curform.find("[name='"+name+"']").filter(":checkbox,:radio").bind("click",function(){
                    //避免多个事件绑定时的取值滞后问题;
                    setTimeout(function(){
                        _this.trigger("blur");
                    },0);
                });

            });

            //select multiple;
            curform.find("select[datatype][multiple]").bind("click",function(){
                var _this=$(this);
                setTimeout(function(){
                    _this.trigger("blur");
                },0);
            });

            //plugins here to start;
            Validform.util.usePlugin.call(curform,usePlugin,tiptype,tipSweep,addRule);
        },
        usePlugin:function(plugin,tiptype,tipSweep,addRule){
            /*
             plugin:settings.usePlugin;
             tiptype:settings.tiptype;
             tipSweep:settings.tipSweep;
             addRule:是否在addRule时触发;
             */

            var curform=this,
                plugin=plugin || {};
            //swfupload;
            if(curform.find("input[plugin='swfupload']").length && typeof(swfuploadhandler) != "undefined"){

                var custom={
                    custom_settings:{
                        form:curform,
                        showmsg:function(msg,type,obj){
                            Validform.util.showmsg.call(curform,msg,tiptype,{obj:curform.find("input[plugin='swfupload']"),type:type,sweep:tipSweep});
                        }
                    }
                };

                custom=$.extend(true,{},plugin.swfupload,custom);

                curform.find("input[plugin='swfupload']").each(function(n){
                    if(this.validform_inited=="inited"){return true;}
                    this.validform_inited="inited";

                    $(this).val("");
                    swfuploadhandler.init(custom,n);
                });

            }

            //datepicker;
            if(curform.find("input[plugin='datepicker']").length && $.fn.datePicker){
                plugin.datepicker=plugin.datepicker || {};

                if(plugin.datepicker.format){
                    Date.format=plugin.datepicker.format;
                    delete plugin.datepicker.format;
                }
                if(plugin.datepicker.firstDayOfWeek){
                    Date.firstDayOfWeek=plugin.datepicker.firstDayOfWeek;
                    delete plugin.datepicker.firstDayOfWeek;
                }

                curform.find("input[plugin='datepicker']").each(function(n){
                    if(this.validform_inited=="inited"){return true;}
                    this.validform_inited="inited";

                    plugin.datepicker.callback && $(this).bind("dateSelected",function(){
                        var d=new Date( $.event._dpCache[this._dpId].getSelected()[0] ).asString(Date.format);
                        plugin.datepicker.callback(d,this);
                    });
                    $(this).datePicker(plugin.datepicker);
                });
            }

            //passwordstrength;
            if(curform.find("input[plugin*='passwordStrength']").length && $.fn.passwordStrength){
                plugin.passwordstrength=plugin.passwordstrength || {};
                plugin.passwordstrength.showmsg=function(obj,msg,type){
                    Validform.util.showmsg.call(curform,msg,tiptype,{obj:obj,type:type,sweep:tipSweep});
                };

                curform.find("input[plugin='passwordStrength']").each(function(n){
                    if(this.validform_inited=="inited"){return true;}
                    this.validform_inited="inited";

                    $(this).passwordStrength(plugin.passwordstrength);
                });
            }

            //jqtransform;
            if(addRule!="addRule" && plugin.jqtransform && $.fn.jqTransSelect){
                if(curform[0].jqTransSelected=="true"){return;};
                curform[0].jqTransSelected="true";

                var jqTransformHideSelect = function(oTarget){
                    var ulVisible = $('.jqTransformSelectWrapper ul:visible');
                    ulVisible.each(function(){
                        var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
                        //do not hide if click on the label object associated to the select
                        if( !(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
                    });
                };

                /* Check for an external click */
                var jqTransformCheckExternalClick = function(event) {
                    if ($(event.target).parents('.jqTransformSelectWrapper').length === 0) { jqTransformHideSelect($(event.target)); }
                };

                var jqTransformAddDocumentListener = function (){
                    $(document).mousedown(jqTransformCheckExternalClick);
                };

                if(plugin.jqtransform.selector){
                    curform.find(plugin.jqtransform.selector).filter('input:submit, input:reset, input[type="button"]').jqTransInputButton();
                    curform.find(plugin.jqtransform.selector).filter('input:text, input:password').jqTransInputText();
                    curform.find(plugin.jqtransform.selector).filter('input:checkbox').jqTransCheckBox();
                    curform.find(plugin.jqtransform.selector).filter('input:radio').jqTransRadio();
                    curform.find(plugin.jqtransform.selector).filter('textarea').jqTransTextarea();
                    if(curform.find(plugin.jqtransform.selector).filter("select").length > 0 ){
                        curform.find(plugin.jqtransform.selector).filter("select").jqTransSelect();
                        jqTransformAddDocumentListener();
                    }

                }else{
                    curform.jqTransform();
                }

                curform.find(".jqTransformSelectWrapper").find("li a").click(function(){
                    $(this).parents(".jqTransformSelectWrapper").find("select").trigger("blur");
                });
            }

        }
    };
    $.fn.Validform=function(settings){
        return new Validform(this,settings);
    };
})(jQuery,window);

