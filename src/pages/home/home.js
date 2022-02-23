loader.import("../../js/api/home.js")
loader.define(function() {

    var pageview = {};

    pageview.init = function() {

        var uiSlide = bui.slide({
                id: "#slide1",
                height: 300,
                autopage: true,
                loop: true,
                cross: true
            })
            // let silde1 = document.getElementById('slide1');
        let silde1_ul = document.querySelector('#silde1_ul');
        banners().then(res => {
            console.log(res);
            if (res.code === '0') {
                let htm = '';
                for (let i in res.data) {
                    htm = htm + `<li><div class="bui-slide-img"><img src="${res.data[i].image}"></div></li>`
                }
                silde1_ul.innerHTML = htm;
            } else {
                bui.alert(res.errMsg);
            }
        })
    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})