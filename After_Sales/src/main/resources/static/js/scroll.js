(function ($) {
    $.fn.beginScroll = function (options) {
        var defaults = {
            speed: 40,
            rowHeight: 24
        };
        var opts = $.extend({}, defaults, options),
            intId = [];

        function marquee(obj, step) {
            obj.find("ul").animate({
                marginTop: '-=1'
            }, 0, function () {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if (s >= step) {
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }
        this.each(function (i) {
            var sh = opts["rowHeight"],
                speed = opts["speed"],
                _this = $(this);
            intId[i] = setInterval(function () {
                if (_this.find("ul").height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh);
                }
            }, speed);
            _this.hover(function () {
                clearInterval(intId[i]);
            }, function () {
                intId[i] = setInterval(function () {
                    if (_this.find("ul").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(_this, sh);
                    }
                }, speed);
            });
        });
    }
    $.fn.initScroll = function (options) {
        $.each(options, function (index, item) {
            $('.kgo-croll-body').append('<li><a></a></li>')
            for (var key in item) {
                var span_dom = $('.kgo-scroll-head').find("div[name='" + key + "']").clone();
                span_dom.text(item[key]);
                $('.kgo-croll-body').find('li:last-child>a').append(span_dom);
            }
        });
    };
    $.fn.rowOnclick = function (callback) {
        $('.kgo-scroll-sty>ul>li').bind('click', function () {
            var scroll_obj = {};
            $(this).find('div').each(function (index, item) {
                scroll_obj[$(this).attr('name')] = $(this).text();
            });
            callback(scroll_obj);
        });
    };
    $.fn.addClassForEven = function (styleName) {
        $('.kgo-scroll-sty>ul>li:even').addClass(styleName);
    };
    $.fn.addClassForOdd = function (styleName) {
        $('.kgo-scroll-sty>ul>li:odd').addClass(styleName);
    };
    $.fn.addClassForHover = function (styleName) {
        $('.kgo-scroll-sty>ul>li').hover(function () {
            $('.kgo-scroll-sty>ul>li').each(function () {
                $(this).removeClass(styleName);
            });
            $(this).addClass(styleName);
        });
        $('.kgo-scroll-sty>ul>li').mouseleave(function () {
            $(this).removeClass(styleName);
        });
    };
})(jQuery);