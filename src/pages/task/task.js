loader.import("../../js/api/task.js")
loader.define(function() {
    var pageview = {
        init: function() {
            var uiTabHead = bui.tab({
                id: "#uiTabHeadTask",
                position: "top",
                iconPosition: "left",
                data: [{
                    id: "uiTabHeadTask0",
                    title: "当前任务",
                    name: "pages/task_page1/task_page1",
                    param: { type: "news" }
                }, {
                    id: "uiTabHeadTask1",
                    title: "历史任务",
                    name: "pages/task_page2/task_page2",
                    param: { type: "photo" },
                }, {
                    id: "uiTabHeadTask2",
                    title: "未来任务",
                    name: "pages/task_page3/task_page3",
                    param: { type: "photo" },
                }, ]
            })

        }
    }
    pageview.init();
    return pageview;
})