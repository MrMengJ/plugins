# slideshow/jQuery-slideshow
## 广告轮番图


### 轮播插件的效果图（点击查看效果）：

<a href="https://mrmengj.github.io/plugins/slideshow/jQuery-slideshow/index.html"><img src="https://ooo.0o0.ooo/2017/06/24/594d4958e92f1.png" title="点击查看"></a>

项目的 html 模板插入到你的html页面中：

```
  <article class="jq-roll">
    <!--......-->
  </article>
```

在html头部加入样式

```
 <link type="text/css" rel="stylesheet" href="css/roll-ad.css">
```
body底部加入 script 脚本即可

```
    <script src="js/jquery.roll-ad.js"></script>

    <script>
        RollAd.init($('.rollad'));
    </script>
```

其中 `<div class="rollad" ` 的 `data-setting` 属性 应许你自定义，设置你所需的参数

```
 <div class="rollad" data-setting ='{
          "width": 800,  //轮播框宽度
            "height": 250,  //轮播框高度
            "liWidth": 520,  //单个轮播图宽度
            "liHeight": 220,  //单个轮播图高度
            "top": 10,  //默认轮播图top值
            "plusWidth": 40,  //默认最外层（亮色的）轮播图比默认宽度增加的宽度
            "delay": 200,  //轮播过渡动画时长
            "autoDelay": 4000  //自动轮播间隔
        }'>
```
