loader.import("../../js/api/cdk.js")
loader.define(function (require, exports, module) {

    var pageview = {};

    // 模块初始化定义
    pageview.init = function () {
        var userInput = bui.input({
            id: ".user-input",
            callback: function (e) {
                // 清空数据
                this.empty();
            }
        })
        
        let exchange = document.getElementById('exchange');
        exchange.onclick = function () {
            let cdk = document.getElementById('cdk');
            var code = cdk.value;
            cdkGetLesson({ code }).then(res => {
                if (res.code === '0') {
                    bui.hint({ content: "<i class='icon-success'></i><br />兑换成功", position: "center", effect: "fadeInDown" });
                    bui.back();
                }else{
                    bui.hint({ content: "<i class='icon-error'></i><br />兑换码不存在", position: "center", effect: "fadeInDown" });
                }
            })
        }

    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})
