// 页面加入这段代码可使Android机器页面不再受到用户字体缩放强制改变大小
//  * 但是会有一个1秒左右的延迟，期间可以考虑通过loading展示
(function(){
    if (typeof(WeixinJSBridge) == "undefined") {
        document.addEventListener("WeixinJSBridgeReady", function (e) {
            setTimeout(function(){
                WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) {
                    // alert(JSON.stringify(res));
                });
            },0);
        });
    } else {
        setTimeout(function(){
            WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) {
                // alert(JSON.stringify(res));
            });
        },0);
    }
})();

//rem 适配
/*
* @params designWidth: 设计稿宽度，默认iphone6/7宽度750px,可修改为你的实际设计稿宽度
* @params maxWidth: 允许屏幕最大宽度，超出按照maxwidth适配
* */
;(function(designWidth) {
    var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement("style"),
        tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        console.log('width: ', width);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
        /*iphone手机禁止字体放大，插入css代码*/
        remStyle.innerHTML += 'body{-webkit-text-size-adjust: 100% !important;text-size-adjust: 100% !important;-moz-text-size-adjust: 100% !important;}';

    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 viewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function(e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(3993);