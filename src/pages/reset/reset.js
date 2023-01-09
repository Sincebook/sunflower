loader.define(function () {
    //初始化控件
    var $btnSend = $("#btnSend");
    var timer = bui.timer({
        onEnd: function () {
            $btnSend.removeClass("disabled").text("重新获取验证码");
        },
        onProcess: function (e) {
            var valWithZero = e.count < 10 ? "0" + e.count : e.count;
            $btnSend.text(valWithZero + "后重新获取");
        },
        times: 60
    });
    var uiStepbar = bui.stepbar({
        id: "#step",
        data: [{
            title: "验证身份",
        }, {
            title: "重置密码",
        }, {
            title: "完成",
        }],
        direction: "x",
        click: false,
        lineCenter: true,
        hasNumber: true
    });
    var bs = bui.store({
        scope: "page",
        data: {
            phone: "",
            password: '',
            code: '',
            tpassword: ''
        },
        methods: {
            sendQr: function (e) {
                const {
                    phone
                } = this
                if (phone.length > 10) {
                    sendCode({
                        phone,
                        type: '2'
                    }).then(res => {
                        console.log(res)
                        if (res.code === '0') {
                            var hasDisabled = $(this).hasClass("disabled");
                            if (!hasDisabled) {
                                $(this).addClass("disabled")
                                bui.hint("验证码发送成功")
                                timer.start();
                            } 
                        } else {
                            bui.hint(res.errMsg)
                        }
                    })
                }
            },
            nextTo: function(e) {
                const {phone, code} = this
                if (phone.length > 10 && code.length > 3) {
                    uiStepbar.next();
                } else {
                    bui.hint('数据有误')
                }
            },
            changePass: function(e) {
                const {phone, code, password, tpassword} = this
                if (password == tpassword && password.length > 4) {
                    changePassword({phone, code, password}).then(res => {
                        if (res.code == '0') {
                            uiStepbar.next();
                        } else {
                            bui.hint(res.errMsg)
                        }
                    })
                } else {
                    bui.hint("数据有误")
                }
            }
        }
    })

    uiStepbar.on("change", function (e) {
        $(".stepbar").hide().eq(e).show()
    })
    //激活第1步
    uiStepbar.value(0);

    // $(".step1").on("click", function (argument) {
    //     uiStepbar.next();
    // })
    // $(".step2").on("click", function (argument) {
    //     uiStepbar.next();
    // })
    // $(".btn-prev-step").on("click", function (argument) {
    //     uiStepbar.prev();
    // })
})