
loader.define(function () {

    var pageview = {};
    pageview.init = function () {
        var pdfh5 = new Pdfh5('#demo', {
            pdfurl: "https://since-util.oss-cn-beijing.aliyuncs.com/sunflower/79C3C43CA2422263FF48D503D07F54D0%281%29.pdf"
          });
    }
     // 初始化
     pageview.init();

     // 输出模块
     return pageview;
})

