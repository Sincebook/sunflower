loader.import("../../js/api/task.js")
loader.define(function(require, exports, module, global) {

    var pageview = {
        init: function() {
            viewHistoricalTasks().then(res => {
                console.log(res);
            })
        }
    };
    pageview.init();
    return pageview;
})