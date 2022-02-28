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
            let finishVideo = videoStorage.get('finishVideo');
            let videoIds = []
            for (let i in finishVideo) {
                if (finishVideo[i].lesson_id == params.id) {
                    videoIds.push(finishVideo[i].videoId)
                }
            }
            console.log(videoIds)
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
                    <h4 class="item-title" style="color:#000">${videos[index].name}</h4>
                    <div class="tags">
                        <span class="tag-item" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1; overflow: hidden;color:#666">${videos[index].description}</span>
                    </div>
                    <small style="border-radius:5px;background:#eee;padding:3px;color:${videoIds.includes(Number(videos[index].id))?'green':'red'};">${videoIds.includes(Number(videos[index].id))?'已完成':'未完成'}</small><br>
                    <span class="item-text">${getTime(videos[index].uptime)}</span>
                </div>
                </li>`;

            }
            for (let index = 0; index < ppts.length; index++) {
                htl += `<li class="bui-btn bui-box"  href="/pages/ppt/ppt?id=${ppts[index].id}&lesson_id=${params.id}">
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
      
    };

    // 初始化
    pageview.init();
    return pageview;
})
