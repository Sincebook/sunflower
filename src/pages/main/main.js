if (!localStorage.getItem('token')) {
    bui.load({ url: "pages/login/login.html", replace: true });
}
loader.import("../../js/api/task.js")
loader.import("../../js/api/home.js")
loader.import("../../js/api/train.js")

loader.define(function(require, exports, module) {
    displayOwnInfo().then(res => {
        console.log(res)
        if (res.code === '0') {
            bui.alert('你还未完成人脸采集,请先人脸采集完成!', function() {
                bui.load({url:'pages/face/face'})
            })
        }
    })
    var pageview = {},
        uiDialogNav;

    // 模块初始化定义
    pageview.init = function() {
        navTab();

        // 栏目弹出菜单, 因为要遮住底部的导航, 所以弹出层需要跟底部导航在一块初始化
        uiDialogNav = bui.dialog({
            id: "#uiDialog",
            position: "right",
            fullscreen: true,
            effect: "fadeInRight",
            mask: false
        });
    }

    // 底部导航
    function navTab() {

        //menu在tab外层,menu需要传id
        var tab = bui.tab({
                id: "#tabDynamic",
                menu: "#tabDynamicNav",
                swipe: false,
                animate: false,
                // 1: 声明是动态加载的tab
                autoload: true,
            })
            // 2: 监听加载后的事件, load 只加载一次
        tab.on("to", function(index) {
            var current = index || 0;
            switch (current) {
                case 0:
                    loader.require(["pages/lesson/lesson"])
                    break;
                case 1:
                    loader.require(["pages/task/task"])
                    break;
                case 2:
                    loader.require(["pages/home/home"])
                    break;
                case 3:
                    loader.require(["pages/train/train"])
                    break;
                case 4:
                    loader.require(["pages/mine/mine"])
                    break;
            }
        }).to(0)
    }

    // 初始化
    pageview.init();

    // 把弹出层模块抛出去
    pageview.columnDialog = uiDialogNav;

    // 输出模块
    module.exports = pageview;

})