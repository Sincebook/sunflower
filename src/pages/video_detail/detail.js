function getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(constraints, success, error);
    } else if (navigator.mozGetUserMedia) {
        navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
        navigator.getUserMedia(constraints, success, error)
    }
}

let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
//成功回调
function success(stream) {
    video.srcObject = stream;
    video.play();
}
//失败回调
function error(error) {
    console.log(error)
    alert("访问用户媒体失败");
}
//开启摄像头
if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
    // alert("???")
    getUserMedia({
        audio: false,
        video: {
            facingMode: "user"
        }
    }, success, error)
} else {
    alert("不支持");
}

loader.define(function (require, exports, module, global) {
    var pageview = {};
    var params = router.getPageParams();
    pageview.init = function () {
        getClasseLesson({
            id: params.lesson_id
        }).then(res => {
            console.log(res)
            const vedioList = res.data.les_content.vedio;
            let htmls = ''
            let videos = document.getElementById("videoLists");
            for (let i in vedioList) {
                if (vedioList[i].id == params.id) {
                    document.getElementById('videoDetail').innerHTML =
                        `<video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" playsinline="true" data-setup="{}" poster="${vedioList[i].image}">
                     <source src="${vedioList[i].url}" type="video/mp4"> 
                </video>`
                    document.getElementById('name').innerText = vedioList[i].name
                    document.getElementById('description').innerText = vedioList[i].description
                    var playTime = 0;
                 
                    var myPlayer = videojs('my-video', {
                        controls: true,
                        poster: '',
                        preload: 'auto',
                        autoplay: false,
                        fluid: true, // 默认播放音频
                        playbackRates: [0.5, 1, 1.5, 2],
                    }, function () {
                        this.on('ended', function () {
                            videoStorage.set('finishVideo', {videoId: vedioList[i].id, lesson_id:params.lesson_id})
                            
                        })
                        this.on("timeupdate",function(){
                            // playTime++;
                            // console.log(playTime)
                            // storage.set('ids',playTime)
                            // console.log(myPlayer.currentTime);
                        })
                        this.on("error", function(){
                            bui.alert('该视频播放异常')
                        });
                    });
                   
                    myPlayer.controlBar.progressControl.disable();
                    myPlayer.landscapeFullscreen();
                } else {
                    htmls += `<li class="bui-btn bui-box" onclick="bui.load({ url: 'pages/video_detail/detail?id=${vedioList[i].id}&lesson_id=${params.lesson_id}',callback:function(){window.location.reload()} });">
                    <div class="bui-thumbnail"><img src="${vedioList[i].image}" alt=""></div>
                    <div class="span1">
                        <h3 class="item-title" style="color:#333">${vedioList[i].name}</h3>
                        <div class="tags">
                            <span class="tag-item" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1; overflow: hidden;color:#666">${vedioList[i].description}</span>
                        </div>
                        <br>
                        <span class="item-text">${getTime(vedioList[i].uptime)}</span>
                    </div>
                    </li>`
                }
            }
            videos.innerHTML = htmls;
        })
    }
    pageview.init();
    // myPlayer.load();

    // //实现拍照的功能
    // document.getElementById('snap').addEventListener('click',function(){
    // 	context.drawImage(video,0,0,500,500);
    // });

    // myPlayer.controlBar.progressControl.disable();
    // var video = document.getElementById('video');


    // if (navigator.mediaDevices.getUserMedia) {
    //     //最新的标准API
    //     navigator.mediaDevices.getUserMedia({video : {width: 1000, height: 1000}}).then(success).catch(error);
    // } else if (navigator.webkitGetUserMedia) {
    //     //webkit核心浏览器
    //     navigator.webkitGetUserMedia({video : {width: 1000, height: 1000}},success, error)
    // } else if (navigator.mozGetUserMedia) {
    //     //firfox浏览器
    //     navigator.mozGetUserMedia({video : {width: 1000, height: 1000}}, success, error);
    // } else if (navigator.getUserMedia) {
    //     //旧版API
    //     navigator.getUserMedia({video : {width: 1000, height: 1000}}, success, error);
    // }

    // function success(stream) {
    //     //兼容webkit核心浏览器
    //     // let CompatibleURL = window.URL || window.webkitURL;

    //     //将视频流设置为video元素的源
    //     console.log(stream);

    //     //video.src = CompatibleURL.createObjectURL(stream);
    //     video.srcObject = stream;
    //     video.play();
    // }

    // function error(error) {
    //     console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
    // }

    return pageview;
})