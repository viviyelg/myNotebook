(function() {
    function rem (){
        var defaults = {
            maxS: 750, //设计稿宽度
            minS: 320, //最小屏幕宽度
            maxFs: 100, //最大宽度字体大小
        }
        defaults.minFs = defaults.maxFs * defaults.minS / defaults.maxS; //最小宽度时的字体大小
        // 按屏幕宽度设置字体大小
        var fs = window.screen.width / defaults.maxS * defaults.maxFs;

        // 处理边界问题
        fs = fs > defaults.maxFs ? defaults.maxFs : (fs < defaults.minFs ? defaults.minFs : fs);
        if(document.getElementsByTagName){
        	document.getElementsByTagName("html")[0].style.fontSize=fs+"px";
        }
    }
    rem();
})(window, undefined);
