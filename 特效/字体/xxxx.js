/*! uvip - v3.1.0 - 2015 */
!
    function($) {
        "use strict";
        var Modal = function(element, options) {
            this.options = options,
                this.$element = $(element).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this)),
            this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
        };
        Modal.prototype = {
            constructor: Modal,
            toggle: function() {
                return this[this.isShown ? "hide": "show"]()
            },
            show: function() {
                var that = this,
                    e = $.Event("show");
                this.$element.trigger(e),
                this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function() {
                    var transition = $.support.transition && that.$element.hasClass("fade");
                    that.$element.parent().length || that.$element.appendTo(document.body),
                        that.$element.show(),
                    transition && that.$element[0].offsetWidth,
                        that.$element.addClass("in").attr("aria-hidden", !1),
                        that.enforceFocus(),
                        transition ? that.$element.one($.support.transition.end,
                            function() {
                                that.$element.focus().trigger("shown")
                            }) : that.$element.focus().trigger("shown")
                }))
            },
            hide: function(e) {
                e && e.preventDefault();
                e = $.Event("hide"),
                    this.$element.trigger(e),
                this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), $(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), $.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
            },
            enforceFocus: function() {
                var that = this;
                $(document).on("focusin.modal",
                    function(e) {
                        that.$element[0] === e.target || that.$element.has(e.target).length || that.$element.focus()
                    })
            },
            escape: function() {
                var that = this;
                this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal",
                    function(e) {
                        27 == e.which && that.hide()
                    }) : this.isShown || this.$element.off("keyup.dismiss.modal")
            },
            hideWithTransition: function() {
                var that = this,
                    timeout = setTimeout(function() {
                            that.$element.off($.support.transition.end),
                                that.hideModal()
                        },
                        500);
                this.$element.one($.support.transition.end,
                    function() {
                        clearTimeout(timeout),
                            that.hideModal()
                    })
            },
            hideModal: function() {
                var that = this;
                this.$element.hide(),
                    this.backdrop(function() {
                        that.removeBackdrop(),
                            that.$element.trigger("hidden")
                    })
            },
            removeBackdrop: function() {
                this.$backdrop && this.$backdrop.remove(),
                    this.$backdrop = null
            },
            backdrop: function(callback) {
                var animate = this.$element.hasClass("fade") ? "fade": "";
                if (this.isShown && this.options.backdrop) {
                    var doAnimate = $.support.transition && animate,
                        pageHeight = $(document).height(),
                        pageWidth = "100%";
                    if (this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body), this.$backdrop.css({
                            width: pageWidth,
                            height: pageHeight
                        }).click("static" == this.options.backdrop ? $.proxy(this.$element[0].focus, this.$element[0]) : $.proxy(this.hide, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !callback) return;
                    doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback()
                } else ! this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, callback) : callback()) : callback && callback()
            }
        };
        var old = $.fn.modal;
        $.fn.modal = function(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("modal"),
                    options = $.extend({},
                        $.fn.modal.defaults, $this.data(), "object" == typeof option && option);
                data || $this.data("modal", data = new Modal(this, options)),
                    "string" == typeof option ? data[option]() : options.show && data.show()
            })
        },
            $.fn.modal.defaults = {
                backdrop: !0,
                keyboard: !0,
                show: !0
            },
            $.fn.modal.Constructor = Modal,
            $.fn.modal.noConflict = function() {
                return $.fn.modal = old,
                    this
            },
            $(document).on("click.modal.data-api", '[data-toggle="modal"]',
                function(e) {
                    var $this = $(this),
                        href = $this.attr("href"),
                        $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")),
                        option = $target.data("modal") ? "toggle": $.extend({
                                remote: !/#/.test(href) && href
                            },
                            $target.data(), $this.data());
                    e.preventDefault(),
                        $target.modal(option).one("hide",
                            function() {
                                $this.focus()
                            })
                })
    } (window.jQuery);;
function setCookie(name, value, min, domain) {
    var _cookie = name + "=" + escape(value);
    if (min) {
        var exp = new Date;
        exp.setTime(exp.getTime() + 60 * min * 1e3),
            _cookie += ";expires=" + exp.toGMTString()
    }
    domain && (_cookie += ";domain=" + escape(domain)),
        document.cookie = _cookie
}
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    return null != arr ? unescape(arr[2]) : null
}
var showModel = function(option) {
    var $modelDialog = $('<div class="modal hide" id="modalDialog"><div class="modal-header"><a type="button" data-dismiss="modal" aria-hidden="true" class="close"><i class="iconfont">&#xe617;</i></a><h3></h3></div><div class="modal-body"></div></div>');
    $modelDialog.find(".modal-header h3").html(option.header),
        $modelDialog.find(".modal-body").html(option.content),
        $modelDialog.attr("class", "modal hide"),
    option.extraClass && $modelDialog.addClass(option.extraClass),
        $modelDialog.modal(),
        $modelDialog.find(".act_close").on("click",
            function() {
                return $modelDialog.modal("hide"),
                    !1
            }),
        $modelDialog.on("hide",
            function() {
                $modelDialog.remove()
            })
};
$.fn.updateRocket = function() {
    var $obj = $(this),
        $level = $obj.find("li"),
        $num = $obj.find(".nums"),
        changeLevel = function(level) {
            $num.attr("class", "nums num_level_" + level),
                $level.filter(".current").removeClass("current"),
                $level.filter(".level_" + level).addClass("current")
        };
    $level.on("mouseover.update",
        function() {
            var _item = $(this);
            if (!_item.hasClass("current")) {
                var _level = _item.attr("data-level");
                changeLevel(_level)
            }
        });
    var init = function() {
        changeLevel(1)
    };
    init()
},
    $.fn.historyList = function() {
        var $obj = $(this),
            $toggle = $obj.find(".toggle");
        $toggle.on("click.history",
            function() {
                $obj.toggleClass("unfold")
            })
    };
var showModelNotice = function(string) {
        var _showNotice = getCookie("_showNotice"),
            _time = (new Date).getHours();
        _showNotice || (setCookie("_showNotice", !1, 60 * (24 - _time)), showModel({
            header: "公告",
            content: "<p>" + string + "</p><a href='#' class='btn act_close'>查看我的账户最新等级</a>"
        }))
    },
    showModelTip = function(string) {
        showModel({
            header: "提示",
            content: "<p class='center'>" + string + "</p><a href='#' class='btn act_close'>我知道了</a>"
        })
    },
    init = function() {
        $(".at_update").updateRocket(),
            $(".history").historyList()
    };
$(document).ready(function() {
    init()
});;