// 可能未导入时显示方法不存在，可在index中先导入
loader.define(function () {
    function getVideoDuration(url) {
        // IOS的微信小程序中无法触发onloadedmetadata
        // if (this.getENVIR() === 'wxapp' && this.checkIfIOS()) {
        //   return new Promise((reslove) => {
        //     let audio = new Audio(url);
        //     audio.muted = true;
        //     audio.play().then(() => audio.pause());
        //     audio.addEventListener('loadedmetadata', function() {
        //       reslove(parseInt((audio.duration * 1000).toString(), 10));
        //     });
        //     audio.muted = false;
        //   });
        // }
        return new Promise((reslove) => {
            let video = document.createElement('video');
            video.preload = 'metadata';
            video.src = url;
            video.onloadedmetadata = () => {
                reslove(parseInt((video.duration).toString(), 0));
                video = null;
            };
        });
    }
    var pageview = {};
    var tab = null;
    pageview.init = function () {
        var params = router.getPageParams();
        const { mis_status } = params
        console.log(params)
        tab = bui.tab({
            id: "#tabLesson",
        });
        getClasseLesson({
            id: params.id
        }).then(res => {
            let finishVideo = videoStorage.get('finishVideo');
            let finishPPT = pptStorage.get('finishPPT');
            // console.log(finishVideo, finishPPT)
            let videoIds = []
            let pptIds = []
            for (let i in finishVideo) {
                if (finishVideo[i].lesson_id == params.id) {
                    videoIds.push(finishVideo[i].videoId)
                }
            }
            for (let i in finishPPT) {
                if (finishPPT[i].lesson_id == params.id) {
                    pptIds.push(finishPPT[i].pptId)
                }
            }
            console.log(pptIds)
            var videos = [];
            var ppts = [];
            videos = res.data.les_content.vedio;
            ppts = res.data.les_content.ppt;
            var html = "";
            var htl = "";
            var upStudy = 0;
            let Alltime = 0;
            let studyTime2 = 0;
            var uiLoading = bui.loading({
                
                width: 40,
                height: 40,
                callback: function (argument) {
                    console.log("clickloading")
                }
            });
            uiLoading.show();
            function setVideo(index) {
                // console.log(index)

                if (index < videos.length) {
                    
                        if (!videoIds.includes(Number(videos[index].id))) {
                            upStudy++
                        }
                        // console.log(videos[index].url, index);
                        let process = 0
                        let temples = videoPosStorage.get('ProVideo')
                        for (let i in temples) {
                            if (temples[i].videoId.split(',')[0] == videos[index].id && temples[i].videoId.split(',')[1] == params.id) {
                                console.log('成功计时')
                                process = temples[i].process
                            }
                        }
                        html += `<li class="bui-btn bui-box" href="/pages/video_detail/detail?id=${videos[index].id}&lesson_id=${params.id}">
                    <div class="bui-thumbnail"><img src="${videos[index].image}" alt=""></div>
                    <div class="span1">
                        <h4 class="item-title" style="color:#000;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">${videos[index].name}</h4>
                        <div class="tags">
                            <span class="tag-item" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1; overflow: hidden;color:#666">${videos[index].description}</span>
                        </div>
                        <small style="border-radius:5px;background:#eee;padding:3px;color:${mis_status > 1 ? 'green' : videoIds.includes(Number(videos[index].id)) ? 'green' : 'red'};">${mis_status > 1 ? '已完成' : videoIds.includes(Number(videos[index].id)) ? '已完成' : '未完成'}</small><br>
                        <span class="item-text">视频时长:${timeLong(videos[index].time)} - 已观看:${timeLong(mis_status > 1 ? videos[index].time : process)}</span>
                    </div>
                    </li>`;

                        Alltime += videos[index].time
                        studyTime2 += process
                        index++;
                        if (index == videos.length) {
                            html += `<div style="background:rgba(100,100,0,0.1);text-align:center;font-size:12px;padding:10px">课程总时长：${timeLong(Alltime)}，已学习：${timeLong(mis_status > 1 ? Alltime : studyTime2)}，当前进度：${parseInt(mis_status > 1 ? 100 : studyTime2 / Alltime * 100)}%</div>`
                            // let temp = true
                            // for (let i in videoMis.get('mis')) {
                            //     if (videoMis.get('mis')[i].mis_id == params.mis_id) {
                            //         temp = false
                            //     }
                            // }
                            videoMis.set('mis', {
                                'mis_id': params.mis_id,
                                'Alltime': Alltime,
                                'studyTime': studyTime2
                            }, 'mis_id')
                            console.log(videoMis.get('mis'))
                            if (upStudy == 0) {
                                finishStudy({
                                    mission_id: params.mis_id
                                }).then(res => {
                                    console.log(res)
                                })
                            }
                        }
                        document.getElementById("videoList").innerHTML = html
                        setVideo(index);

                }

            }
            setVideo(0);
            uiLoading.stop();
            // function setVideo() {
            //     for (let index = 0; index < videos.length; index++) {
            //         if (!videoIds.includes(Number(videos[index].id))) {
            //             upStudy++
            //         }
            //         getVideoDuration(videos[index].url).then(res => function () {
            //             console.log(res)
            //             // console.log(document.getElementsByClassName('item-text'))
            //         })
            //         let reslut = 0
            //         html += `<li class="bui-btn bui-box" href="/pages/video_detail/detail?id=${videos[index].id}&lesson_id=${params.id}">
            //         <div class="bui-thumbnail"><img src="${videos[index].image}" alt=""></div>
            //         <div class="span1">
            //             <h4 class="item-title" style="color:#000;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">${videos[index].name}</h4>
            //             <div class="tags">
            //                 <span class="tag-item" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1; overflow: hidden;color:#666">${videos[index].description}</span>
            //             </div>
            //             <small style="border-radius:5px;background:#eee;padding:3px;color:${videoIds.includes(Number(videos[index].id)) ? 'green' : 'red'};">${videoIds.includes(Number(videos[index].id)) ? '已完成' : '未完成'}</small><br>
            //             <span class="item-text">${reslut}</span>
            //         </div>
            //         </li>`;

            //     }
            // }
            // setVideo()
            for (let index = 0; index < ppts.length; index++) {
                if (!pptIds.includes(Number(ppts[index].id))) {
                    upStudy++
                }
                htl += `<li class="bui-btn bui-box"  href="/pages/ppt/ppt?id=${ppts[index].id}&lesson_id=${params.id}">
                <div class="bui-thumbnail"><img src="${ppts[index].image}" alt=""></div>
                <div class="span1">
                    <h3 class="item-title">${ppts[index].name}</h3>
                    <div class="tags">
                        <span class="tag-item" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1; overflow: hidden;color:#666">${ppts[index].description}</span>
                    </div>
                    <small style="border-radius:5px;background:#eee;padding:3px;color:${pptIds.includes(Number(ppts[index].id)) ? 'green' : 'red'};">${pptIds.includes(Number(ppts[index].id)) ? '已完成' : '未完成'}</small><br>
                    <span class="item-text">${getTime(ppts[index].uptime)}</span>
                </div>
                </li>`;
            }

            // var videoList = document.getElementById("videoList");
            var coursewareList = document.getElementById("coursewareList");
            // videoList.innerHTML = html;
            coursewareList.innerHTML = htl;

        })

    };

    // 初始化
    pageview.init();
    return pageview;
})