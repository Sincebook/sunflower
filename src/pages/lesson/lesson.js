loader.import("../../js/api/lesson.js")
loader.define(function() {
    // getBanner()
    banners().then(res => {
        if (res.code === '0') {
            // console.log(res.data);
            var uiSlide = bui.slide({
                id: "#slide",
                height: 360,
                autopage: true,
                data: res.data
            });
        } else {
            bui.alert(res.errMsg)
        }
    });
    var pageview = {};
    pageview.init = function() {
        
        // var uiSlide = bui.slide({
        //     id: "#slide",
        //     height: 360,
        //     autopage: true,
        //     data: [{
        //             image: "http://www.easybui.com/demo/images/banner01.png"
        //         }, {
        //             image: "http://www.easybui.com/demo/images/banner02.png"
        //         }, {
        //             image: "http://www.easybui.com/demo/images/banner03.png"
        //         }]
        //         // autoplay:true
        // });
    }
    let ul = document.getElementById('uiNewsTabNav');
    // ul.addEventListener('click', function() {
    //     console.log(123);
    // })
    getClasses().then(res => {
        console.log(res)
        if (res.code === '0') {
            let htm = '';
            for (let i in res.data) {
                htm = htm + `<li class="bui-btn">${res.data[i].name}</li>`
            }
            ul.innerHTML = htm
        } else {
            bui.alert(res.errMsg)
        }
    })
    let btns = ul.querySelectorAll('.bui-btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function() {
            // console.log(i);
            for (var i = 0; i < btns.length; i++) {
                btns[i].className = 'bui-btn';
                btns[i].style.color = '#666';
            }
            this.className = 'bui-btn active-btn';
            this.style.color = '#39a4ff';
        })
    }

    // 初始化
    pageview.init();
    return pageview;
})