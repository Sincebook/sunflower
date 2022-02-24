loader.import("../../js/api/lesson.js")
// 可能未导入时显示方法不存在，可在index中先导入
loader.define(function () {

    var pageview = {};
    var tab = null;
    pageview.init = function () {

        tab = bui.tab({
            id: "#tabLesson",
        });
        var id = 1;
        getClasseLesson({ id }).then(res => {
            console.log(res.data);
            var videos = [];
            var ppts = [];
            videos = res.data.les_content.vedio;
            ppts = res.data.les_content.ppt;
            var html = "";
            var htl = "";
            for (let index = 0; index < videos.length; index++) {
                html += `<li class="bui-btn bui-box">
                <div class="bui-thumbnail"><img src="${videos[index].image}" alt=""></div>
                <div class="span1">
                    <h3 class="item-title">${videos[index].name}</h3>
                    <span class="item-text">${videos[index].uptime}</span>
                </div>
                </li>`;

            }
            for (let index = 0; index < ppts.length; index++) {
                htl += `<li class="bui-btn bui-box">
                <div class="bui-thumbnail"><img src="${ppts[index].image}" alt=""></div>
                <div class="span1">
                    <h3 class="item-title">${ppts[index].name}</h3>
                    <span class="item-text">${ppts[index].uptime}</span>
                </div>
                </li>`;

            }
            var videoList = document.getElementById("videoList");
            var coursewareList = document.getElementById("coursewareList");
            videoList.innerHTML = html;
            coursewareList.innerHTML = htl;

        })


    };

    // 初始化
    pageview.init();
    return pageview;
})
