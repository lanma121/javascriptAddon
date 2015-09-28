/**
 * Created by Administrator on 2015/9/11 0011.
 */
(function($){

    /**
     *
     * var defaults = {
            event:"mousemove",          //可选，默认为mouseover，放大触发事件
            bigImgCon:null,             //可选，object 承载大图的对象。可以设其href属性为小图对应的大图路径 (注意必须是一对一)，系统用该对象承载大图。
                                                string 大图的路径，系统自动创建承载大图的对象。
                                          注意：bigImgCon === null时，必须在本对象中指定href属性，其值为显示图片的路径。系统自动创建承载大图的对象。
            show:null,                  //可选，display:设置了大图容器对象style的display,此时要设置position：absolute，top,left,z-index;
                                                visibility：设置了大图容器对象style的visibility,此时表示占用空间，但是不显示
                                                null:显示大图容器

                                           注意：gibigImgCon === null时，不指定
            position: "right",          //可选，默认right，大图相对于缩略图的位置（left,top,bottom,right）,bigImgCon！=null时，不指定。
            xOffset: 10,                //可选，默认为10px,大图与缩略图左/右间隔距离，bigImgCon！=null时，不指定。
            yOffset: 0,                 //可选，默认为0px,大图与缩略图上/下间隔距离，bigImgCon！=null时，不指定。
            zoomWidth:null,             //可选，默认为小图的大小，大图容器宽度，bigImgCon！=null时，不指定。
            zoomHeight:null,            //可选，默认为小图的大小，大图容器高度，bigImgCon！=null时，不指定。
            fadeinSpeed:0,              //可选，显示大图的速度
            fadeoutSpeed:0              //可选，移除大图的速度
        };
     *
     *
     *
     * @param options
     * @returns {*}
     */

    $.fn.magnifier = function(options){
        var defaults = {
            event:"mousemove",             //放大触发事件
            position: "right",             //大图相对于缩略图的位置
            bigImgCon:null,
            xOffset: 10,                   //大图与缩略图左/右间隔距离
            yOffset: 0                     //大图与缩略图上/下间隔距离
        };var i = 0;
        return this.each(function(){
            var obj = $(this);
            var setOptions = $.extend(defaults,options);
            var
                smallImage = new Smallimage(obj),
                isLargeImg = $.type(setOptions.bigImgCon) === "object" && (setOptions.bigImgCon.context === document || setOptions.bigImgCon.nodeName),//是html元素对象吗？
                largeImageUrl = isLargeImg && $(setOptions.bigImgCon).attr("href") ? $(setOptions.bigImgCon).attr("href") :
                                             $.type(setOptions.bigImgCon) === "string" ? setOptions.bigImgCon : obj.attr("href"),
                zoomWidth = setOptions.zoomWidth ? setOptions.zoomWidth: isLargeImg ?
                            $(setOptions.bigImgCon).width() || parseFloat(setOptions.bigImgCon.style.width.replace(/px/,"")):smallImage.w,
                zoomHeight = setOptions.zoomHeight ? setOptions.zoomHeight:isLargeImg ?
                            $(setOptions.bigImgCon).height() ||parseFloat(setOptions.bigImgCon.style.height.replace(/px/,"")): smallImage.h;
            if(!largeImageUrl || !zoomWidth ||!zoomHeight){
                alert("出现异常，请仔细检查！");
                return;
            };
            var lens = new Lens();          //创建放大部分块
            var stage = new Stage();        //创建放大显示块
            var largeImage = new Largeimage(largeImageUrl);
            /*========================================================,
             |   Smallimage
             |---------------------------------------------------------:
             |   Base image into the anchor element
             `========================================================*/
            function Smallimage(thumbnail) {
                var $obj = this;
                //用span标签包裹小图对象
                this.node = $("<div/>").addClass("wrapImg");
                this.wrap = function(){
                    this.node.css({
                        'position':'relative',
                        'width':$obj.ow + 'px',
                        'height':$obj.oh + 'px'
                    });
                    thumbnail.wrap(this.node);
                }
                //获取小图的信息
                this.fetchdata = function () {
                    $obj.w = thumbnail.width();
                    $obj.h = thumbnail.height();
                    $obj.ow = thumbnail.outerWidth();
                    $obj.oh = thumbnail.outerHeight();
                    //图片对象的边框数据
                    $obj.border = {
                        l:parseFloat(thumbnail.css("border-left-width").replace(/px/,"")),
                        t:parseFloat(thumbnail.css("border-top-width").replace(/px/,"")),
                        r:parseFloat(thumbnail.css("border-right-width").replace(/px/,"")),
                        b:parseFloat(thumbnail.css("border-bottom-width").replace(/px/,""))
                    }
                    $obj.pos = thumbnail.offset();
                    //图片对象距窗口的偏移量
                    $obj.pos.inner = {
                        l : $obj.pos.left + $obj.border.l,
                        t : $obj.pos.top + $obj.border.t,
                        r : $obj.pos.left + $obj.ow - $obj.border.r,
                        b : $obj.pos.top + $obj.oh - $obj.border.b
                    }

                    //图片对象外边距窗口的偏移量
                    $obj.pos.outter = {
                        l : $obj.pos.left,
                        t : $obj.pos.top ,
                        r : $obj.pos.left + $obj.ow,
                        b : $obj.pos.top + $obj.oh
                    }
                };

                thumbnail.on("error", function () {
                    alert('Problems while loading image.');
                    throw 'Problems while loading image.';
                });
                $obj.fetchdata();
                return $obj;
            }

            /*========================================================,
             |   Lens
             |---------------------------------------------------------:
             |   Lens over the image
             `========================================================*/

            function Lens() {
                var $obj = this;
                this.node = $('<div name="ZoomPup" style="background:#fff;-moz-opacity:0.6;opacity:0.6;filter:alpha(opacity=60);' +
                    'z-index:120;border:1px solid #CCC;cursor:move;overflow:hidden;display:none;position:absolute;"><\/div>');
                this.append = function () {
                        $(obj).after(this.node);
                };
                this.setdimensions = function () {
                    this.scale = {x:(largeImage.w / smallImage.w),y:(largeImage.h / smallImage.h)};
                    this.node.w = (parseFloat(zoomWidth /  this.scale.x) > smallImage.w ) ? smallImage.w : (parseFloat(zoomWidth /  this.scale.x));
                    this.node.h = (parseFloat(zoomHeight /  this.scale.y) > smallImage.h ) ? smallImage.h : (parseFloat(zoomHeight /  this.scale.y));
                    //centering lens
                    this.node.css({
                        width: this.node.w + 'px',
                        height: this.node.h + 'px'
                    });
                }
                this.setposition = function (e) {
                    var mouseposX = e.pageX;
                    var mouseposY = e.pageY;
                    var lensleft =  mouseposX - (this.node.w / 2) < smallImage.pos.inner.l ? smallImage.border.l - 1 :
                                    mouseposX + (this.node.w) / 2 > smallImage.pos.inner.r ? smallImage.w + smallImage.border.l - this.node.w - 1 :
                                    mouseposX - smallImage.pos.outter.l - (this.node.w + 2) / 2;
                    var lenstop =   mouseposY - (this.node.h) / 2 < smallImage.pos.inner.t ? smallImage.border.t - 1  :
                                    mouseposY + (this.node.h) / 2 > smallImage.pos.inner.b ? smallImage.h + smallImage.border.t - this.node.h - 1 :
                                    mouseposY  - smallImage.pos.outter.t - (this.node.h + 2) / 2;
                    this.node.left = lensleft;
                    this.node.top = lenstop;
                    this.node.css({
                        'left': lensleft + 'px',
                        'top': lenstop + 'px'
                    });
                };
                this.hide = function () {
                    this.node.hide();
                };
                this.show = function () {
                    this.node.show();
                };
                this.getoffset = function () {
                    var o = {};
                    o.left = $obj.node.left;
                    o.top = $obj.node.top;
                    return o;
                };
                return this;
            };

            /*========================================================,
             |   Stage
             |---------------------------------------------------------:
             |   Window area that contains the large image
             `========================================================*/

            function Stage() {
                var $obj = this;
                this.name = i++;
                this.node = isLargeImg ? setOptions.bigImgCon :
                    $("<div name='zoomWindow' style='border: 1px solid blue;display:none;z-index: 5001;'>" +
                    "<div name='zoomWrapperImage' style='position: relative;  overflow: hidden;width: 100%;height: 100%;'></div></div>");
                this.append = function () {
                    if(isLargeImg){
                        if(this.node.css("position") === "static" || this.node.css("position") === ""){
                            this.node.css("position","relative");
                        }
                        this.node.css("overflow","hidden");
                        return;
                    }
                    $(obj).after(this.node);
                    this.node.css({
                        position: 'absolute',
                        width:zoomWidth + "px",
                        height:zoomHeight + "px"
                    });
                    $obj.setposition();//设置大图的位置
                };
                this.setposition = function () {
                    switch (setOptions.position) {
                        case "left":
                            this.node.leftpos = (smallImage.pos.outter.l - Math.abs(setOptions.xOffset) - zoomWidth > 0) ?
                                (0 - zoomWidth - Math.abs(setOptions.xOffset)) : (smallImage.ow + Math.abs(setOptions.xOffset));
                            this.node.toppos = Math.abs(setOptions.yOffset);
                            break;
                        case "top":
                            this.node.leftpos = Math.abs(setOptions.xOffset);
                            this.node.toppos = (smallImage.pos.outter.t - Math.abs(setOptions.yOffset) - zoomHeight > 0) ?
                                (0 - zoomHeight - Math.abs(setOptions.yOffset)) : (smallImage.oh + Math.abs(setOptions.yOffset));
                            break;
                        case "bottom":
                            this.node.leftpos = Math.abs(setOptions.xOffset);
                            this.node.toppos = (smallImage.pos.outter.b + Math.abs(setOptions.yOffset) + zoomHeight < screen.height) ?
                                (smallImage.oh + Math.abs(setOptions.yOffset)) : (0 - zoomHeight - Math.abs(setOptions.yOffset));
                            break;
                        default:
                            this.node.leftpos = (smallImage.pos.outter.r + Math.abs(setOptions.xOffset) + zoomWidth < screen.width) ?
                                (smallImage.ow + Math.abs(setOptions.xOffset)) : (0 - zoomWidth - Math.abs(setOptions.xOffset));
                            this.node.toppos = Math.abs(setOptions.yOffset);
                            break;
                    }
                    this.node.css({
                        'left': this.node.leftpos + 'px',
                        'top': this.node.toppos + 'px'
                    });
                    return this;
                };
                this.hide = function () {
                    if(isLargeImg){
                        setOptions.show === "display" ? this.node.hide() :
                        setOptions.show === "visibility" ? this.node.css("visibility","hidden"):false;
                        return;
                    }
                    this.node.hide();
                };
                this.show = function () {
                    if(isLargeImg){
                        if(setOptions.show){
                            setOptions.show === "display" ? this.node.css("display","block") :
                                setOptions.show === "visibility" ? this.node.css("visibility","visible"):false;
                        }
                        return;
                    }
                    this.node.show();
                };
            };

            /*========================================================,
             |   LargeImage
             |---------------------------------------------------------:
             |   The large detailed image
             `========================================================*/

            function Largeimage(url) {
                var $obj = this;
                this.url = url;
                this.node = new Image();
                this.append = function(){
                    this.node.style.position = 'absolute';
                    this.node.style.border = '0px';
                    this.node.style.display = 'none';
                    document.body.appendChild(this.node);
                    this.node.src = this.url; // fires off async
                    $obj.largeimageloading = true;
                }
                this.fetchdata = function () {
                    var image = $(this.node);
                    $obj.w = image.width();
                    $obj.h = image.height();
                    $obj.pos = image.offset();
                    $obj.pos.l = image.offset().left;
                    $obj.pos.t = image.offset().top;
                    $obj.pos.r = $obj.w + $obj.pos.l;
                    $obj.pos.b = $obj.h + $obj.pos.t;
                    document.body.removeChild(this.node);
                    var appendImg = isLargeImg ? stage.node:$("div[name='zoomWrapperImage']",stage.node)
                    appendImg.append(this.node);
                };
                this.node.onerror = function () {
                    alert('Problems while loading the big image.');
                    throw 'Problems while loading the big image.';
                };
                this.node.onload = function () {
                    $obj.fetchdata();//fetching data
                    lens.setdimensions();//设置lens的高宽
                    $obj.largeimageloaded = true;
                    $obj.largeimageloading = false;
                };
                this.setposition = function () {
                    var left = -lens.scale.x * (lens.getoffset().left - smallImage.border.l + 1);
                    var top = -lens.scale.y * (lens.getoffset().top - smallImage.border.t + 1);
                    $(this.node).css({
                        'left': left + 'px',
                        'top': top + 'px'
                    });
                };
                return this;
            };

            $.extend(obj, {
                create: function () { //create the main objects
                    //create wrapImg
                    if ($(obj).parent().attr("class") !== "wrapImg") {
                        smallImage.wrap();
                    }
                    //creating ZoomPup
                    if(setOptions.event === "mousemove"){
                        lens.append();
                    }
                    //creating zoomWindow
                    stage.append();
                    //加载大图
                    largeImage.append();
                },
                init: function () {

                    if(setOptions.event === "mousemove" || setOptions.event === "mouseout"){
                        $(".wrapImg").on('mouseleave', function (e) {
                            obj.deactivate();
                            return false;
                        });
                        $(".wrapImg").on('click', function (e) {
                            obj.activate();
                            return false;
                        });
                    }
                    $(".wrapImg").on(setOptions.event, function (e) {
                        //prevent fast mouse mevements not to fire the mouseout event
                        if (e.pageX > smallImage.pos.inner.r || e.pageX < smallImage.pos.inner.l || e.pageY < smallImage.pos.inner.t || e.pageY > smallImage.pos.inner.b) {
                            obj.deactivate();
                            return false;
                        }
                        if (!largeImage.largeimageloaded && !largeImage.largeimageloading) {
                            largeImage.append();
                        }
                        obj.activate(e);
                        lens.setposition(e);
                        largeImage.setposition();
                    });
                },
                activate: function (e) {
                    //show lens and zoomWindow
                    lens.show();
                    stage.show();
                    largeImage.node.style.display = "";
                },
                deactivate: function (e) {
                    lens.hide();
                    stage.hide();
                    largeImage.node.style.display = "none";
                }
            });
            obj.create();
            obj.init();
        });

    }



}(jQuery))