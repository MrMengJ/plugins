
; (function ($) {

    var RollAd = function (rollAd) {
        var self = this;
        this.rollAd = rollAd;
        this.rollItems = rollAd.find('.roll-item');
        this.firstRollItem = this.rollItems.first();
        this.secondRollItem = this.firstRollItem.next();
        this.lastRollItem = this.rollItems.last();

        this.prevBtn = rollAd.find('.roll-prev-btn');
        this.nextBtn = rollAd.find('.roll-next-btn');
        this.rollBtn = rollAd.find('.roll-btn');

        this.rollItemLen = this.rollItems.length;

        this.switchover = rollAd.find('.switchover');
        this.switchoverItem = rollAd.find('.switchover-item');
        //默认参数
        this.setting = {
            "width": 800,
            "height": 250,
            "liWidth": 520,
            "liHeight": 220,
            "delay": 1000
        }
        //自定义参数与默认参数合并，jq 的 extend 方法
        $.extend(this.setting, this.getSetting());

        this.initPosition();
        /*rollFlag=ture表示正在视觉内的三张图片*/
        this.rollFlag = true;
        this.prevBtn.on('click', function () {
            if (self.rollFlag) {
                self.rollFlag = false;
                self.rotateAnimate('prev');
            }
        });
        this.nextBtn.on('click', function () {
            if (self.rollFlag) {
                self.rollFlag = false;
                self.rotateAnimate('next');
            }
        });

        this.switchoverItem.hover(
            function () {
                $(this).addClass('active').siblings().removeClass('active');
                self.switchoverAnimate($(this).index());
            }, function () {
                 console.log("离开了");
            }
        )


        // this.autoRoll();
        /*鼠标进入轮播图范围，停止自动轮播，两侧按钮淡入*/
        /*鼠标离开轮播图范围，开始自动轮播，两侧按钮淡出*/
        this.rollAd.hover(function () {
            clearInterval(self.timer);
            self.rollBtn.fadeIn(600);
        }, function () {
            // self.autoRoll();
            self.rollBtn.fadeOut(600);
        });


    };
    /*构造函数Rollad的prototype属性*/
    RollAd.prototype = {
        autoRoll: function () {
            var roll_this = this;
            this.timer = window.setInterval(function () {
                roll_this.nextBtn.click();
            }, roll_this.setting.delay);
        },
        initPosition: function () {
            var rollWidth = this.setting.width;
            var rollHeight = this.setting.height;
            var liWidth = this.setting.liWidth;
            var liHeight = this.setting.liHeight;
            var firPos = (rollWidth - liWidth - 20) / 2;

            this.rollAd.css({ "width": rollWidth, "height": rollHeight });

            this.rollItems.each(function (index, item) {
                $(this).css({ "width": liWidth, "height": liHeight, "left": firPos });
            });

            this.firstRollItem.css({
                "left": firPos,
                "width": liWidth + 20,
                "height": liHeight + 10,
                "opacity": 1,
                //Math.ceil 向上取整
                "zIndex": 33,
                "top": 0
            }).attr('nowflag', '0');

            this.secondRollItem.css({
                "left": rollWidth - liWidth,
                // "opacity": 0.5,
                "zIndex": 22,
                "top": 10
            });

            this.lastRollItem.css({
                "left": 0,
                // "opacity": 0.5,
                "zIndex": 22,
                "top": 10
            });
        },

        "nowflag": 0,
        "oldflag": null,

        rotateAnimate: function (type) {

            var rollWidth = this.setting.width;
            var rollHeight = this.setting.height;
            var liWidth = this.setting.liWidth;
            var liHeight = this.setting.liHeight;
            var delay = this.setting.delay;

            if (parseInt(this.nowflag) >= this.rollItemLen) {

                this.nowflag = 0;

            } else if (parseInt(this.nowflag) < 0) {

                this.nowflag = this.rollItemLen - 1;
            }
            console.log(".... this.nowflag...." + this.nowflag);
            var nowEle = this.rollItems.eq(this.nowflag).removeAttr('nowflag');
            // console.log("nowEle:" + nowEle);
            // console.log("nowflag:" + this.nowflag);
            var that = this;
            var nextEle = nowEle.next().get(0) ? nowEle.next() : this.firstRollItem;
            var prevEle = nowEle.prev().get(0) ? nowEle.prev() : this.lastRollItem;

            if (type == 'next') {
                // this.getEleCss(nextEle);
                var nextEleTwo = nextEle.next().get(0) ? nextEle.next() : this.firstRollItem;
                // nextEleTwo.animate(this.getEleZIndex(nextEle), 0);
                nextEleTwo.animate(this.getEleCss(nextEle), delay, function () {
                    that.rollFlag = true;
                    // console.log(that.getEleCss(nextEle));
                });
                // console.log(this.getEleCss(nextEle))
                // nextEle.css('display','none');
                nextEle.animate(this.getEleZIndex(nowEle), 0);
                // nextEle.fadeIn(delay);
                nextEle.animate(this.getEleCss(nowEle), delay, function () {
                    that.rollFlag = true;
                }).attr('nowflag', ++this.nowflag);
                setTimeout(function () {
                    nextEle.addClass('active').siblings().removeClass('active');
                    console.log("hello");
                }, 100);
                // nowEle.css("opacity","22");
                // nextEleTwo.animate(this.getEleZIndex(prev), 0);
                nowEle.animate(this.getEleCss(prevEle), delay, function () {
                    that.rollFlag = true;
                });

                prevEle.animate({
                    "width": liWidth,
                    "height": liHeight,
                    "zIndex": 0,
                    "left": "140px",
                    // "opacity": 0,
                    "top": "10px"
                }, delay, function () {
                    that.rollFlag = true;
                });
                console.log("nowflag" + this.nowflag);

            }

            if (type == 'prev') {
                var prevEleTwo = prevELe.prev().get(0) ? prev.prev() : this.lastRollItem;

                // prevEleTwo.animate(this.getEleZIndex(prev), 0);
                prevEleTwo.animate(this.getEleCss(prev), delay, function () {
                    that.rollFlag = true;
                });
                prev.animate(this.getEleZIndex(nowEle), 0);
                prev.animate(this.getEleCss(nowEle), delay, function () {
                    that.rollFlag = true;
                }).attr('nowflag', --this.nowflag);
                setTimeout(function () {
                    prevEle.addClass('active').siblings().removeClass('active');
                }, 200);

                // nowEle.css("opacity","22");
                // nowEle.animate(this.getEleZIndex(nextEle),0);
                nowEle.animate(this.getEleCss(nextEle), delay, function () {
                    that.rollFlag = true;
                });

                nextEle.animate({
                    "width": liWidth,
                    "height": liHeight,
                    "zIndex": 0,
                    "left": "140px",
                    // "opacity": 0,
                    "top": "10px"
                }, delay, function () {
                    that.rollFlag = true;
                });

            }
        },
        switchoverAnimate: function (nowIndex) {
            var that = this;
            var rollWidth = this.setting.width;
            var rollHeight = this.setting.height;
            var liWidth = this.setting.liWidth;
            var liHeight = this.setting.liHeight;
            var delay = this.setting.delay;
            this.oldflag = this.nowflag;
            this.nowflag = nowIndex;
            console.log(this.oldflag);
            console.log(this.nowflag);
            if (parseInt(this.nowflag) >= this.rollItemLen) {

                this.nowflag = 0;

            } else if (parseInt(this.nowflag) < 0) {

                this.nowflag = this.rollItemLen - 1;
            }
            var oldEle = this.rollItems.eq(this.oldflag);
            var nowEle = this.rollItems.eq(this.nowflag).attr('nowflag',this.nowflag).siblings().removeAttr('nowflag');
            // console.log("nowEle:" + nowEle);
            // console.log("nowflag:" + this.nowflag);
            var oldNextEle = oldEle.next().get(0) ? nowEle.next() : this.firstRollItem;
            var nextEle = nowEle.next().get(0) ? nowEle.next() : this.firstRollItem;
            var oldPrevEle = oldEle.next().get(0) ? nowEle.prev() : this.lastRollItem;
            var prevEle = nowEle.prev().get(0) ? nowEle.prev() : this.lastRollItem;
            prevEle.animate(this.getEleCss(oldPrevEle), delay, function () {
                that.rollFlag = true;
            });
            nowEle.animate(this.getEleCss(oldEle), delay, function () {
                that.rollFlag = true;
            });
            setTimeout(function () {
                    nowEle.addClass('active').siblings().removeClass('active');
                    console.log("hello");
                }, 100);
            nextEle.animate(this.getEleCss(oldNextEle), delay, function () {
                that.rollFlag = true;
            });

            oldEle.animate({
                "width": liWidth,
                "height": liHeight,
                "zIndex": 0,
                "left": "140px",
                // "opacity": 0,
                "top": "10px"
            }, delay, function () {
                that.rollFlag = true;
            });
            oldPrevEle.animate({
                "width": liWidth,
                "height": liHeight,
                "zIndex": 0,
                "left": "140px",
                // "opacity": 0,
                "top": "10px"
            }, delay, function () {
                that.rollFlag = true;
            });
            oldNextEle.animate({
                "width": liWidth,
                "height": liHeight,
                "zIndex": 0,
                "left": "140px",
                // "opacity": 0,
                "top": "10px"
            }, delay, function () {
                that.rollFlag = true;
            });
        },
        getEleCss: function (ele) {
            var width = ele.css("width"),
                height = ele.css("height"),
                zIndex = ele.css("zIndex"),
                opacity = ele.css("opacity"),
                left = ele.css("left"),
                top = ele.css("top");
            // console.log("width:"+width);
            return {
                "width": width,
                "height": height,
                "zIndex": zIndex,
                "left": left,
                "opacity": opacity,
                "top": top
            }
        },
        getEleZIndex: function (ele) {
            var zIndex = ele.css('zIndex');
            return {
                "zIndex": zIndex + 1
            }
        },
        getSetting: function () {
            var setting = this.rollAd.attr('data-setting');
            if (setting !== undefined) {
                // 解析 json ，返回 obj  ， javascript 的 json 数据 跟对象一样一样的
                // 是$.parseJSON()而不是parseJSON()
                console.log($.parseJSON(setting));
                return $.parseJSON(setting);
            } else {
                return {};
            }
        }
    };

    RollAd.init = function (rollAd) {
        rollAd.each(function (index, ele) {
            // console.log($(this));
            new RollAd($(this));
        });
    };

    window['RollAd'] = RollAd;

})(jQuery);
