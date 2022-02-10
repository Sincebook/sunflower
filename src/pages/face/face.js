// 默认已经定义了main模块
loader.define(function(){
    var pageview = {};

    // 主要业务初始化
    pageview.init = function() {
        // 这里写main模块的业务
        console.log("load.js was loaded");
        var video = document.getElementById('video');


        if (navigator.mediaDevices.getUserMedia) {
            //最新的标准API
            navigator.mediaDevices.getUserMedia({video : {width: 1000, height: 1000}}).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
            //webkit核心浏览器
            navigator.webkitGetUserMedia({video : {width: 1000, height: 1000}},success, error)
        } else if (navigator.mozGetUserMedia) {
            //firfox浏览器
            navigator.mozGetUserMedia({video : {width: 1000, height: 1000}}, success, error);
        } else if (navigator.getUserMedia) {
            //旧版API
            navigator.getUserMedia({video : {width: 1000, height: 1000}}, success, error);
        }

        function success(stream) {
            //兼容webkit核心浏览器
            // let CompatibleURL = window.URL || window.webkitURL;

            //将视频流设置为video元素的源
            console.log(stream);

            //video.src = CompatibleURL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        }

        function error(error) {
            console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
        }
    }

    // 事件绑定
    pageview.bind = function() {
       
    }
    
    // 初始化
    pageview.init();
    // 绑定事件
    pageview.bind();
    
    return pageview;
})