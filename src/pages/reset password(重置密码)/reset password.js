bui.ready(function(){
    //初始化控件
        var uiStepbar = bui.stepbar({
            id: "#step",
            data: [{
                title: "验证身份",
            },{
                title: "重置密码",
            },{
                title: "完成",
            }],
            direction: "x",
            click: false,
            lineCenter: true,
            hasNumber: true
        });
    
        uiStepbar.on("change",function (e) {
            $(".stepbar").hide().eq(e).show()
        })
        //激活第1步
        uiStepbar.value(0);
    
        $(".step1").on("click",function (argument) {
            uiStepbar.next();
        })
        $(".step2").on("click",function (argument) {
            uiStepbar.next();
        })
        $(".btn-prev-step").on("click",function (argument) {
            uiStepbar.prev();
        })
    })