; $.fn.navFixed = function () {
    var $_this = $(this);
    var $offsetTop = $_this.offset().top; //距离顶部偏移距离
    var $scrollTop = $(document).scrollTop(); //滚动条垂直偏移距离
    var $marginTop = parseFloat($_this.next().css('margin-top'));  //导航栏下一兄弟元素的原有上外边距
    stateChange();
    // 滚动条滚动事件
    $(document).scroll(function () {
        $scrollTop = $(document).scrollTop();
        stateChange();
    });
    //窗口大小改变
    $(window).resize(function () {
        $offsetTop = $_this.offset().top;
        stateChange();
    });
    //导航栏状态改变函数
    function stateChange() {
        if ($scrollTop >= $offsetTop) {
            $_this.css('position', 'fixed');
            $_this.next().css('margin-top', $marginTop + $_this.outerHeight(true) + 'px');
        } else {
            $_this.css('position', 'relative');
            $_this.next().css('margin-top', $marginTop);
        }
    }
};