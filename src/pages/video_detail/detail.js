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
    bui.alert(error);
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
function dataURLtoFile(url, filename) {

    var arr = url.split(','), mime = arr[0].match(/:(.*?);/)[1],

        bstr = atob(arr[1]), i = bstr.length, u8arr = new Uint8Array(i);

    while(i--){

        u8arr[i] = bstr.charCodeAt(i);

    }

    return new File([u8arr], filename, {type:mime});

}

function startUpload( file )
{
    var uploadUrl = "/api/face/identify";
    
    // 手工构造一个 form 对象
    var formData = new FormData();
    formData.append('img', file); // 'file' 为HTTP Post里的字段名, file 对浏览器里的File对象
            
    // 手工构造一个请求对象，用这个对象来发送表单数据
    // 设置 progress, load, error, abort 4个事件处理器
    var request = new XMLHttpRequest();
    request.upload.addEventListener("progress", window.evt_upload_progress, false);
    request.addEventListener("load", window.evt_upload_complete, false);
    request.addEventListener("error", window.evt_upload_failed, false);
    request.addEventListener("abort", window.evt_upload_cancel, false);			
    request.open("POST", uploadUrl ); // 设置服务URL
    request.setRequestHeader('token', localStorage.getItem('token'))
    request.send(formData);  // 发送表单数据
}

window.evt_upload_progress = function (evt) 
{
    if (evt.lengthComputable)
    {
        var progress = Math.round(evt.loaded * 100 / evt.total);		    	
        console.log ("上传进度: " + progress);		
    }	        
};
var watchStatus = true;
window.evt_upload_complete = function (evt)
{
    if(evt.loaded == 0)
    {
        console.log ("上传失败!");
    }
    else
    {
        console.log ("上传完成!");
        var res = JSON.parse(evt.target.responseText);
        console.log(res)
        if (res.code == '0') {
          if (res.data == true) {
            watchStatus = true
          } else {
            watchStatus = false
          }
        } else {
            watchStatus = false
        }
    }			
};		 
window.evt_upload_failed = function (evt) 
{			
    console.log  ("上传出错"); 
};
window.evt_upload_cancel = function (evt) 
{
    console.log( "上传中止!");	
};

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
            let hasvideo = true
            for (let i in vedioList) {
                if (vedioList[i].id == params.id && hasvideo) {
                    hasvideo = false
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
                            let videos = videoStorage.get('finishVideo');
                            let addStatus = true
                            for (let i in videos) {
                                if (videos[i].videoId == Number(params.id) && videos[i].lesson_id == params.lesson_id) {
                                    addStatus = false
                                }
                            }
                            if (addStatus) {
                                videoStorage.set('finishVideo', {
                                    videoId: vedioList[i].id,
                                    lesson_id: params.lesson_id
                                })
                                console.log('没有数据')
                            } 

                        })
                        this.on("timeupdate", function () {

                            playTime++;
                            if (playTime % 20 == 0) {
                                // console.log(playTime)
                                // console.log('人脸识别')
                                // console.log(canvas, video)
                                canvas.width = 500;
                                canvas.height = 500;
                                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                                var file = dataURLtoFile(canvas.toDataURL("image/png"), '123.png')
                                startUpload(file)
                                if (!watchStatus) {
                                    this.pause();
                                    bui.alert('请本人观看', function () {
                                        watchStatus = true
                                    })
                                    
                                }
                                
                            }
                            // console.log(playTime)
                            // storage.set('ids',playTime)
                            // console.log(myPlayer.currentTime);
                        })
                        this.on("error", function () {
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