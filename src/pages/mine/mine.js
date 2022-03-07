loader.import("../../js/api/mine.js")
loader.define(function() {

    var pageview = {};
    // 初始化定义
    pageview.init = function() {
        document.getElementById('lgout').addEventListener('click', () => {
            localStorage.removeItem('token');
            bui.load({
                url: 'pages/login/login.html',
                replace: true,
                callback: () => {
                    window.location.reload();
                }
            })
        })
        document.getElementById('btn-face').addEventListener('click', () => {
            bui.load({ url: 'pages/face/face.html' })
        })
        document.getElementById('btn-myLesson').addEventListener('click', () => {
            bui.load({ url: 'pages/myLesson/mylesson.html' })
        })
        document.getElementById('btn-myCert').addEventListener('click', () => {
            bui.load({ url: 'pages/myCert/mycert.html' })
        })
        document.getElementById('btn-custom').addEventListener('click', () => {
            bui.alert('客服微信：sdjkfhjiksdhfkjsdf')
        })
        document.getElementById('btn-myMessage').addEventListener('click', () => {
            bui.load({ url: 'pages/myMessage/message.html' })
        })
        document.getElementById('btn-cdk').addEventListener('click', () => {
            bui.load({ url: 'pages/cdk/cdk.html' }) 
        })
        document.getElementById('btn-infor').addEventListener('click', () => {
            bui.load({ url: 'pages/software/software.html' })
        })

        displayOwnInfo().then(res => {
            console.log(res);
            if (res.code === '0') {
                let bs = bui.store({
                    el: '.bui-page',
                    scope: "page",
                    data: {
                        name: res.data.name,
                        image: res.data.image
                    },
                })
                document.querySelector('.personal-img').addEventListener('click', function() {
                    bui.load({ url: 'pages/myMessage/message.html' })
                })
            } else {
                bui.alert(res.errMsg);
            }
            })

        document.getElementById('jump').addEventListener('click', () => {
            bui.load({ url: 'pages/video_detail/detail.html' })
        })
    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})