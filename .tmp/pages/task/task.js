"use strict";

loader.define(function () {
  var pageview = {
    init: function init() {
      var uiTabHead = bui.tab({
        id: "#uiTabHead",
        position: "top",
        iconPosition: "left",
        data: [{
          id: "uiTabHead0",
          title: "当前任务",
          name: "pages/task_page1/task_page1",
          param: {
            type: "news"
          }
        }, {
          id: "uiTabHead1",
          title: "历史任务",
          name: "pages/task_page2/task_page2",
          param: {
            type: "photo"
          }
        }, {
          id: "uiTabHead2",
          title: "未来任务",
          name: "pages/task_page3/task_page3",
          param: {
            type: "photo"
          }
        }]
      }); // uiTabHead.addBadge(1, 5)
      // uiTabHead.addBadge(1, 3)
      // uiTabHead.removeBadge()
    }
  };
  pageview.init();
  return pageview;
});