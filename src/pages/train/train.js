loader.import("../../js/api/train.js")
loader.define(function() {
    var pageview = {
        init: function() {
            var uiTabHead = bui.tab({
                id: "#uiTabHeadTrain",
                position: "top",
                iconPosition: "left",
                data: [{
                    id: "uiTabHeadTrain0",
                    title: "未报名",
                    name: "pages/train_page1/train_page1",
                    param: { type: "news" }
                }, {
                    id: "uiTabHeadTrain1",
                    title: "已报名",
                    name: "pages/train_page2/train_page2",
                    param: { type: "photo" },
                }, ]
            })
        }
    }
    pageview.init();
    return pageview;
})