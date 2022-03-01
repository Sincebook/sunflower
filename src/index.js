window.router = bui.router();
loader.import("../../js/api/index.js");
loader.import("../../js/api/lesson.js")
loader.import("../../js/api/mine.js")
loader.import("../../js/api/login.js");
loader.import("../../js/pdf.js");
loader.import("../../js/pdf.worker.js");
loader.import("../../js/jquery-2.1.1.min.js");
loader.import("../../js/pdfh5.js");
bui.ready(function() {
    // 初始化路由
    router.init({
        id: "#bui-router",
        progress: true,
        hash: true,
    })

    // 绑定事件
    bind();
    // window.onresize = () => {
    //     window.location.reload();
    // }
    // 事件类定义
    function bind() {
        // 绑定页面的所有按钮有href跳转
        bui.btn({ id: "#bui-router", handle: ".bui-btn" }).load();
        
        // 统一绑定页面所有的后退按钮
        $("#bui-router").on("click", ".btn-back", function(e) {
            // 支持后退多层,支持回调
            bui.back();
        })
    }
})
var videoStorage = bui.storage({size:99})
var pptStorage = bui.storage({size:99})
function getTime(data) {
    var _data = data;
    //如果是13位正常，如果是10位则需要转化为毫秒
    if (data.length == 13) {
        _data = data
    } else {
        _data = data * 1000
    }
    console.log(_data)
    const time = new Date(Number(_data));
    console.log(time)
    const Y = time.getFullYear();
    const Mon = time.getMonth() + 1;
    const Day = time.getDate();
    const H = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    const Min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();;
    const S = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();;
    return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
}
