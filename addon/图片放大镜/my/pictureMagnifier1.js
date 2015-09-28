/**
 * Created by Administrator on 2015/9/11 0011.
 */
(function($){



    $.fn.magnifier = function(options){
        var defaults = {
            trigger:{event:"mousemove",elem: null},       //放大触发事件
            thumbnail:null,                                     //缩略图对象
            bigPicture:null,                                    //承载大图的对象（若为对象其href属性为大图的路径）或者路径
            position: "right",                                  //大图相对于缩略图的位置
            xOffset: 10,                                        //大图与缩略图左/右间隔距离
            yOffset: 0,                                         //大图与缩略图上/下间隔距离
            zoomWidth:null,                                      //大图容器宽度
            zoomHeight:null                                      //大图容器高度
        };
        return this.each(function(){
            var obj = $(this);
            var el = {};
            var setOptions = $.extend(defaults,options);
            var thumbnail = setOptions.thumbnail ? $(setOptions.thumbnail,obj) : obj,
                largeImageUrl = $.type(setOptions.bigPicture) === "object" ? $(setOptions.bigPicture,obj).attr("href") :
                    $.type(setOptions.bigPicture) === "string" ? setOptions.bigPicture : obj.attr("href"),
                zoomWidth = setOptions.zoomWidth ?setOptions.zoomWidth:smallImage.w,
                zoomHeight = setOptions.zoomHeight ?setOptions.zoomHeight:smallImage.h;
            var smallImage = new Smallimage(thumbnail);
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
                        'display' :'inline-block',
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
                        l:parseInt(thumbnail.css("border-left-width").replace(/px/,"")),
                        t:parseInt(thumbnail.css("border-top-width").replace(/px/,"")),
                        r:parseInt(thumbnail.css("border-right-width").replace(/px/,"")),
                        b:parseInt(thumbnail.css("border-bottom-width").replace(/px/,""))
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
                    'z-index:120;border:1px solid #CCC;cursor:move;overflow:hidden;display:none;"><\/div>');
                this.append = function () {
                        $(thumbnail).after(this.node);
                };
                this.setdimensions = function () {
                    this.scale = {x:(largeImage.w / smallImage.w),y:(largeImage.h / smallImage.h)};
                    this.node.w = (parseInt(zoomWidth /  this.scale.x) > smallImage.w ) ? smallImage.w : (parseInt(zoomWidth /  this.scale.x));
                    this.node.h = (parseInt(zoomHeight /  this.scale.y) > smallImage.h ) ? smallImage.h : (parseInt(zoomHeight /  this.scale.y));
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
                        'position':'absolute',
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
                this.node = $("<div name='zoomWindow' style='border: 1px solid blue;display:none;z-index: 5001;'>" +
                    "<div name='zoomWrapperImage' style='position: relative;  overflow: hidden;width: 100%;height: 100%;'></div></div>");
                this.append = function () {
                    $(thumbnail).after(this.node);
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
                    switch (setOptions.hideEffect) {
                        case 'fadeout':
                            this.node.fadeOut(setOptions.fadeoutSpeed, function () {});
                            break;
                        default:
                            this.node.hide();
                            break;
                    }
                };
                this.show = function () {
                    switch (setOptions.showEffect) {
                        case 'fadein':
                            this.node.fadeIn(setOptions.fadeinSpeed, function () {});
                            break;
                        default:
                            this.node.show();
                            break;
                    }
                };
            };

            /*========================================================,
             |   LargeImage
             |---------------------------------------------------------:
             |   The large detailed image
             `========================================================*/

            function Largeimage(url) {
                var $obj = this;
                this.node = new Image();
                this.append = function(){
                    this.node.style.position = 'absolute';
                    this.node.style.border = '0px';
                    this.node.style.display = 'none';
                    this.node.style.left = '-5000px';
                    this.node.style.top = '0px';
                    document.body.appendChild(this.node);
                    this.node.src = url; // fires off async
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
                    $("div[name='zoomWrapperImage']",stage.node).html(this.node);
                    this.node.style.display = '';
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
                    if ($(thumbnail).parent().attr("class") !== "wrapImg") {
                        smallImage.wrap();
                    }
                    //creating ZoomPup
                    if (!(options.trigger&&options.trigger.elem)) {
                        lens.append();
                    }
                    //creating zoomWindow
                    stage.append();
                    //加载大图
                    largeImage.append(largeImageUrl);
                },
                init: function () {
                    $(".wrapImg").on('mouseleave', function (e) {
                        obj.deactivate();
                        return false;
                    });
                    $(".wrapImg").on('mousemove', function (e) {
                        //prevent fast mouse mevements not to fire the mouseout event
                        if (e.pageX > smallImage.pos.inner.r || e.pageX < smallImage.pos.inner.l || e.pageY < smallImage.pos.inner.t || e.pageY > smallImage.pos.inner.b) {
                            obj.deactivate();
                            return false;
                        }
                        if (!largeImage.largeimageloaded && !largeImage.largeimageloading) {
                            largeImage.append(largeImageUrl);
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
                },
                deactivate: function (e) {
                    stage.hide();
                    lens.hide();

                }
            });


            obj.create();
            obj.init();




        })
    }



}(jQuery))