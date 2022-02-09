loader.define(function() {
    var pageview = {
        init: function() {
            var uiTabHead = bui.tab({
                id: "#uiTabHead",
                position: "top",
                iconPosition: "left",
                data: [{
                    id: "uiTabHead0",
                    title: "未报名",
                    name: "pages/train_page1/train_page1",
                    param: { type: "news" }
                }, {
                    id: "uiTabHead1",
                    title: "已报名",
                    name: "pages/train_page2/train_page2",
                    param: { type: "photo" },
                }, ]
            })

            // uiTabHead.addBadge(1, 5)
            // uiTabHead.addBadge(1, 3)
            // uiTabHead.removeBadge()

        }
    }
    pageview.init();
    return pageview;
})