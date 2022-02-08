
bui.ready(function(){

    var pageview = {};
    
    pageview.bind = function () {
        
        // 手机号,帐号是同个样式名, 获取值的时候,取的是最后一个focus的值
    var userInput = bui.input({
        id: ".user-input",
        callback: function(e) {
            // 清空数据
            this.empty();
        }
    })

    // 密码显示或者隐藏
    var password = bui.input({
            id: ".password-input",
            iconClass: ".icon-eye",
            onBlur: function(e) {
                if (e.target.value == '') { return false; }
                // 注册的时候校验只能4-18位密码
                var rule = /^[a-zA-Z0-9_-]{4,18}$/;
                if (!rule.test(e.target.value)) {
                    bui.hint("密码只能由4-18位字母或者数字上下横杠组成");
                    return false;
                }

                return true;
            },
            callback: function(e) {
                //切换类型
                this.toggleType();
                //
                $(e.target).toggleClass("active")
            }
        })

    }

    pageview.init = function () {

        // 绑定事件
        this.bind();
    }


    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})