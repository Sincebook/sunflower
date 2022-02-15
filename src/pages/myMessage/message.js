loader.import("../../js/api/myMessage.js");
loader.define(function () {
    var pageview = {};
    pageview.init = function () {   
        var bs = bui.store({
            scope: "page", // 用于区分公共数据及当前数据的唯一值
            data: {
                attrs: {
                    name: '',
                    idcard:'',
                    phone:'',
                    companyName:'',
                    companyAddress:'',
                    companyPhone:'',
                    type:'',
                    image:''
                },
            },
        }) 
        console.log("进去了");
        findMyMessage().then(res => {
            console.log(res);
            if(res.code === '0'){
                bs.attrs = res.data;
                var image = document.getElementById("image");
                router.$("#image").attr("src",res.data.image);
            }
        })
    }
    

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})
