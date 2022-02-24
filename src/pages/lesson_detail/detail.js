// 可能未导入时显示方法不存在，可在index中先导入
loader.define(function () {

    var pageview = {};
    var tab = null;
    pageview.init = function () {
        var params = router.getPageParams();
        // getClasseLesson({id: params.id}).then(res => {
        //     console.log(res)
        // })
        console.log(params)
        tab = bui.tab({
            id: "#tabLesson",
        });
        getClasseLesson({ id: params.id }).then(res => {
            console.log(res.data);
            var videos = [];
            var ppts = [];
            videos = res.data.les_content.vedio;
            ppts = res.data.les_content.ppt;
            var html = "";
            var htl = "";
            for (let index = 0; index < videos.length; index++) {
                html += `<li class="bui-btn bui-box" href="/pages/video_detail/detail?id=${videos[index].id}&lesson_id=${params.id}">
                <div class="bui-thumbnail"><img src="${videos[index].image}" alt=""></div>
                <div class="span1">
                    <h3 class="item-title" style="color:#333">${videos[index].name}</h3>
                    <div class="tags">
                        <span class="tag-item" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1; overflow: hidden;color:#666">${videos[index].description}</span>
                    </div>
                    <br>
                    <span class="item-text">${getTime(videos[index].uptime)}</span>
                </div>
                </li>`;

            }
            for (let index = 0; index < ppts.length; index++) {
                htl += `<li class="bui-btn bui-box">
                <div class="bui-thumbnail"><img src="${ppts[index].image}" alt=""></div>
                <div class="span1">
                    <h3 class="item-title">${ppts[index].name}</h3>
                    <div class="tags">
                        <span class="tag-item" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1; overflow: hidden;color:#666">${ppts[index].description}</span>
                    </div>
                    <br>
                    <span class="item-text">${getTime(ppts[index].uptime)}</span>
                </div>
                </li>`;

            }
            var videoList = document.getElementById("videoList");
            var coursewareList = document.getElementById("coursewareList");
            videoList.innerHTML = html;
            coursewareList.innerHTML = htl;

        })
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

    };

    // 初始化
    pageview.init();
    return pageview;
})
