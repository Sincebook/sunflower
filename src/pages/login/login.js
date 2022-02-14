loader.import("../../js/api/login.js")
loader.define(function () {

    var pageview = {};

    pageview.bind = function () {
        // 手机号,帐号是同个样式名, 获取值的时候,取的是最后一个focus的值
        var userInput = bui.input({
            id: ".user-input",
            callback: function (e) {
                // 清空数据
                this.empty();
            }
        })

        // 密码显示或者隐藏
        var password = bui.input({
            id: ".password-input",
            iconClass: ".icon-eye",
            onBlur: function (e) {
                if (e.target.value == '') { return false; }
                // 注册的时候校验只能4-18位密码
                var rule = /^[a-zA-Z0-9_-]{4,18}$/;
                if (!rule.test(e.target.value)) {
                    bui.hint("密码只能由4-18位字母或者数字上下横杠组成");
                    return false;
                }

                return true;
            },
            callback: function (e) {
                //切换类型
                this.toggleType();
                //
                $(e.target).toggleClass("active")
            }
        })

    }
    pageview.init = () => {
        var btnr = document.getElementById('btnl')
        btnr.onclick = function () {
            // bui.load({ url: "pages/login/login.html", param: {} });

            var phone = document.getElementById('phone').value;
            var password = document.getElementById('password').value;

            if (phone.length > 10 && password.length > 4) {

                login({ phone, password }).then(res => {
                    console.log(res)
                    if (res.code === '0') {
                        bui.hint({ content: "<i class='icon-check'></i><br />登录成功", position: "center", effect: "fadeInDown" });
                        localStorage.setItem('token', res.data);
                        // window.location.href = '#pages/main/main.html';
                        bui.load({
                            url: "pages/main/main.html", replace: true,
                            callback: () => {
                                window.location.reload();
                            }
                        });
                    } else {
                        bui.alert(res.errMsg)
                    }
                })
            } else {
                bui.alert("数据有误！")
            }
        }
        var btnr = document.getElementById('btnr')
        btnr.onclick = function () {
            bui.load({ url: "pages/register/register.html", param: {} });
            //  alert('点秋香')
        }

        var btnr = document.getElementById('btnp')
        btnr.onclick = function () {
            bui.load({ url: "pages/reset/reset.html", param: {} });
            //  alert('点秋香')
        }
    }
    pageview.init();
    return pageview;
})

