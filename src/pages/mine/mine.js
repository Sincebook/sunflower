/**
 * 个人中心模板
 * 默认模块名: pages/personal/personal
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function () {

    var pageview = {};
    // 初始化定义
    pageview.init = function () {
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
        document.getElementById('btn-myMessage').addEventListener('click', () => {
            bui.load({ url: 'pages/myMessage/message.html' })
        })
        document.getElementById('btn-cdk').addEventListener('click', () => {
            bui.load({ url: 'pages/cdk/cdk.html' })
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