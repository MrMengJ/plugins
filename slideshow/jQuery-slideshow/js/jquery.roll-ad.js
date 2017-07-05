
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
            "width": 800,  //轮播框宽度
            "height": 250,  //轮播框高度
            "liWidth": 520,  //单个轮播图宽度
            "liHeight": 220,  //单个轮播图高度
            "top": 10,  //默认轮播图top值
            "plusWidth": 40,  //默认最外层（亮色的）轮播图比默认宽度增加的宽度
            "delay": 200,  //轮播过渡动画时长
            "autoDelay": 4000  //自动轮播间隔
        };
        //自定义参数与默认参数合并，jquery 的 extend 方法
        $.extend(this.setting, this.getSetting());

        this.initPosition();
        this.prevBtn.on('click', function () {
                self.rotateAnimate('prev');
                self.switchoverItem.eq(self.nowflag).addClass('active').siblings().removeClass('active');
        });
        this.nextBtn.on('click', function () {
                self.rotateAnimate('next');
                self.switchoverItem.eq(self.nowflag).addClass('active').siblings().removeClass('active');
        });

        this.switchoverItem.hover(
            function () {
                self.staTime = (new Date()).getTime();
                self.persistTime = Math.abs(self.endTime - self.staTime);
                if (self.persistTime > 30) {
                    self.oldIndex = self.nowIndex;
                    self.nowIndex = $(this).index();
                    $(this).addClass('active').siblings().removeClass('active');
                    if ((self.nowIndex - self.oldIndex) === 1 || (self.nowIndex === 0 && self.oldIndex === self.rollItemLen - 1)) {
                            self.rotateAnimate('next');
                    } else if ((self.oldIndex - self.nowIndex) === 1 || (self.nowIndex === self.rollItemLen - 1 && self.oldIndex === 0)) {
                            self.rotateAnimate('prev');
                    }
                    else if (self.nowIndex === self.oldIndex) {
                        return;
                    }
                    else {
                        self.switchoverAnimate(self.nowIndex);
                    }
                }
            }, function () {
                self.endTime = (new Date()).getTime();
                self.persistTime = Math.abs(self.endTime - self.staTime);
            }
        )

        /*自动轮播*/
        this.autoRoll();
        /*鼠标进入轮播图范围，停止自动轮播，两侧按钮淡入*/
        /*鼠标离开轮播图范围，开始自动轮播，两侧按钮淡出*/
        this.rollAd.hover(function () {
            clearInterval(self.timer);
            self.rollBtn.fadeIn(600);
        }, function () {
            self.autoRoll();
            self.rollBtn.fadeOut(600);
        });
    };
    /*构造函数Rollad的prototype属性*/
    RollAd.prototype = {
        "staTime": 0,  //  鼠标进入切换按钮（switchover）时的时间
        "endTime": 0,  //  鼠标离开切换按钮（switchover）时的时间
        "persistTime": 0,  //  鼠标停留在切换按钮（switchover）上的时间
        "nowflag": 0,  //  当前正中间的那张轮播图片索引值
        "nowIndex": 0,  //  当前激活状态的切换按钮（switchover）索引值
        "oldIndex": 0,  //  上次激活状态的切换按钮（switchover）索引值
        autoRoll: function () {
            var roll_this = this;
            this.timer = window.setInterval(function () {
                    roll_this.nextBtn.click();
                console.log("年后");
            }, roll_this.setting.autoDelay);
        },
        initPosition: function () {
            var rollWidth = this.setting.width;
            var rollHeight = this.setting.height;
            var liWidth = this.setting.liWidth;
            var liHeight = this.setting.liHeight;
            var top = this.setting.top;
            var plusWidth = this.setting.plusWidth;
            var defauPos = (rollWidth - liWidth) / 2;
            var firPos = (rollWidth - liWidth - plusWidth) / 2;

            this.rollAd.css({ "width": rollWidth, "height": rollHeight });

            this.prevBtn.css({
                "width": (rollWidth - liWidth - plusWidth) / 2
            });
            this.nextBtn.css({
                "width": (rollWidth - liWidth - plusWidth) / 2
            });

            this.rollItems.each(function (index, item) {
                $(this).css({ "width": liWidth, "height": liHeight, "left": defauPos, "top": top });
            });


            this.firstRollItem.css({
                "left": firPos,
                "width": liWidth + plusWidth,
                "height": liHeight + top,
                "zIndex": 33,
                "top": 0
            }).attr('nowflag', '0');

            this.secondRollItem.css({
                "left": rollWidth - liWidth,
                "zIndex": 22,
                "top": top
            });

            this.lastRollItem.css({
                "left": 0,
                "zIndex": 22,
                "top": top
            });
        },


        rotateAnimate: function (type) {
            var self = this;
            var rollWidth = this.setting.width;
            var rollHeight = this.setting.height;
            var liWidth = this.setting.liWidth;
            var liHeight = this.setting.liHeight;
            var top = this.setting.top;
            var delay = this.setting.delay;

            if (parseInt(this.nowflag) >= this.rollItemLen) {

                this.nowflag = 0;

            } else if (parseInt(this.nowflag) < 0) {

                this.nowflag = this.rollItemLen - 1;
            }

            var nowEle = this.rollItems.eq(this.nowflag).removeAttr('nowflag');
            var nextEle = nowEle.next().get(0) ? nowEle.next() : this.firstRollItem;
            var prevEle = nowEle.prev().get(0) ? nowEle.prev() : this.lastRollItem;
            if (type == 'next') {
                var nextEleTwo = nextEle.next().get(0) ? nextEle.next() : this.firstRollItem;
                nextEleTwo.stop(true,false).animate(this.getEleCss(nextEle), delay, function () {
                    
                });
                nextEle.stop(true,false).animate(this.getEleZIndex(nowEle), 0);
                nextEle.stop(true,false).animate(this.getEleCss(nowEle), delay, function () {
                
                }).attr('nowflag', ++this.nowflag);
                setTimeout(function () {
                    nextEle.addClass('active').siblings().removeClass('active');
                }, 100);
                nowEle.stop(true,false).animate(this.getEleCss(prevEle), delay, function () {
                   
                });

                prevEle.stop(true,false).animate({
                    "width": liWidth,
                    "height": liHeight,
                    "zIndex": 0,
                    "left": (rollWidth - liWidth) / 2,
                    "top": top
                }, delay, function () {
                   
                });
            }

            if (type == 'prev') {
                var prevEleTwo = prevEle.prev().get(0) ? prevEle.prev() : this.lastRollItem;
                prevEleTwo.stop(true,false).animate(this.getEleCss(prevEle), delay, function () {
                    
                });
                prevEle.stop(true,false).animate(this.getEleZIndex(nowEle), 0);
                prevEle.stop(true,false).animate(this.getEleCss(nowEle), delay, function () {
                    
                }).attr('nowflag', --this.nowflag);
                setTimeout(function () {
                    prevEle.addClass('active').siblings().removeClass('active');
                }, 100);
                nowEle.stop(true,false).animate(this.getEleCss(nextEle), delay, function () {
                    
                });

                nextEle.stop(true,false).animate({
                    "width": liWidth,
                    "height": liHeight,
                    "zIndex": 0,
                    "left": (rollWidth - liWidth) / 2,
                    "top": top
                }, delay, function () {
                    
                });

            }
        },
        switchoverAnimate: function (nowIndex) {
            var self = this;
            var rollWidth = this.setting.width;
            var rollHeight = this.setting.height;
            var liWidth = this.setting.liWidth;
            var liHeight = this.setting.liHeight;
            var top = this.setting.top;
            var plusWidth = this.setting.plusWidth;
            var delay = this.setting.delay;
            var oldSecondEle = this.rollItems.eq(this.oldIndex);
            var oldFirstEle = oldSecondEle.prev().get(0) ?  oldSecondEle.prev() : this.lastRollItem;
            var oldLastEle = oldSecondEle.next().get(0) ? oldSecondEle.next() : this.firstRollItem;
            var nowEle = this.rollItems.eq(this.nowIndex);
            var prevEle = nowEle.prev().get(0) ? nowEle.prev() : this.lastRollItem;
            var nextEle = nowEle.next().get(0) ? nowEle.next() : this.firstRollItem;
            // console.log("oldFirstEle:"+oldFirstEle.index());
            // console.log("oldSecondEle:"+oldSecondEle.index());
            // console.log("oldLastEle:"+oldLastEle.index());
            oldFirstEle.stop(true,false).animate({
                "width": liWidth,
                "height": liHeight,
                "zIndex": 0,
                "left": (rollWidth - liWidth) / 2,
                "top": top
            }, 0);
            oldSecondEle.stop(true,false).animate({
                "width": liWidth,
                "height": liHeight,
                "zIndex": 0,
                "left": (rollWidth - liWidth) / 2,
                "top": top
            }, 0);
            oldLastEle.stop(true,false).animate({
                "width": liWidth,
                "height": liHeight,
                "zIndex": 0,
                "left": (rollWidth - liWidth) / 2,
                "top": top
            }, 0);
            // this.rollItems.animate({
            //     "width": liWidth,
            //     "height": liHeight,
            //     "zIndex": 0,
            //     "left": (rollWidth - liWidth) / 2,
            //     "top": top
            // }, 0);
            nowEle.stop(true,true).animate({
                "zIndex": 34
            }, 0);
            nowEle.stop(true,true).animate({
                "width": liWidth + plusWidth,
                "height": liHeight + top,
                "zIndex": 33,
                "left": (rollWidth - liWidth - plusWidth) / 2,
                "top": 0
            }, delay, function () {
                
            }).attr("nowflag", nowIndex).siblings().removeAttr("nowflag");
            setTimeout(function () {
                nowEle.addClass('active').siblings().removeClass('active');
            },100);
            prevEle.stop(true,true).animate({
                "width": liWidth,
                "height": liHeight,
                "zIndex": 22,
                "left": 0,
                "top": top
            }, delay, function () {
                
            });

            nextEle.stop(true,true).animate({
                "width": liWidth,
                "height": liHeight,
                "zIndex": 22,
                "left": rollWidth - liWidth,
                "top": top
            }, delay, function () {
               
            });
            this.nowflag = this.nowIndex;
        },
        getEleCss: function (ele) {
            var width = ele.css("width"),
                height = ele.css("height"),
                zIndex = ele.css("zIndex"),
                left = ele.css("left"),
                top = ele.css("top");
            return {
                "width": width,
                "height": height,
                "zIndex": zIndex,
                "left": left,
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
            new RollAd($(this));
        });
    };

    window['RollAd'] = RollAd;

})(jQuery);
