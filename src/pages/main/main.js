/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

    var pageview = {
        init: function() {
            this.tab();
        },
        tab: function() {

            var uiTab = bui.tab({
                id: "#uiTab",
                position: "bottom",
                iconPosition: "top",
                data: [{
                        id: "tab0",
                        icon: "icon-menu",
                        title: "课程",
                        name: "pages/lesson/lesson",
                        param: { type: "news" }
                    }, {
                        id: "tab1",
                        icon: "icon-menu",
                        title: "任务",
                        name: "pages/task/task",
                        param: { type: "news" }
                    }, {
                        id: "tab2",
                        icon: "icon-home",
                        title: "主页",
                        name: "pages/home/home",
                        param: { type: "photo" },
                        everytime: true
                    },
                    {
                        id: "tab3",
                        icon: "icon-pic",
                        title: "培训",
                        name: "pages/train/train",
                        param: { type: "video" }
                    }, {
                        id: "tab4",
                        icon: "icon-user",
                        title: "我的",
                        name: "pages/mine/mine",
                        param: { type: "class" }
                    }
                ]
            })
        }
    };


    // 初始化
    pageview.init();

    // 输出模块
    return pageview;

})