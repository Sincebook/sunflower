loader.define(function(require, exports, module, global) {

    var pageview = {};
    pageview.init = function() {

        var uiSlide = bui.slide({
            id: "#slide",
            height: 360,
            autopage: true,
            data: [{
                    image: "http://www.easybui.com/demo/images/banner01.png"
                }, {
                    image: "http://www.easybui.com/demo/images/banner02.png"
                }, {
                    image: "http://www.easybui.com/demo/images/banner03.png"
                }]
                // autoplay:true
        });


    }
    let ul = document.getElementById('uiNewsTabNav');
    // ul.addEventListener('click', function() {
    //     console.log(123);
    // })
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