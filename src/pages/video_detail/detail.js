function getUserMedia(constraints,success,error){
    if(navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    }else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(constraints,success,error);
    }else if (navigator.mozGetUserMedia) {
        navigator.mozGetUserMedia(constraints,success,error);
    }else if (navigator.getUserMedia) {
        navigator.getUserMedia(constraints,success,error)
    }
}

let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
//成功回调
function success(stream){
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
    getUserMedia({audio: true, video:{facingMode: "user"}},success,error)
}else {
    alert("不支持");
}

loader.define(function(require,exports,module,global){
    var pageview = {
	};
    var params = router.getPageParams();
    getClasseLesson({id: params.lesson_id}).then(res => {
        console.log(res)
        const vedioList = res.data.les_content.vedio;
        for (let i in vedioList) {
            if (vedioList[i].id == params.id) {
                console.log(vedioList[i])
                // document.getElementById('my-video').setAttribute('poster',vedioList[i].image)
                // document.getElementById('my-video').setAttribute('src',vedioList[i].url)
              
            }
        }
    })
    var myPlayer = videojs('my-video',{
        controls:false,
        poster:'',
        preload:'auto',
        autoplay:false,
        fluid:true, // 默认播放音频
        playbackRates: [0.5, 1, 1.5, 2],
        // poster:"http://outin-49d28f1f8d3d11ec897300163e10ce6c.oss-cn-beijing.aliyuncs.com/ee73cb7a73d94380a78b819ddae85a00/snapshots/b3b9e717ecd946938b4ffc775efaaff9-00003.jpg?Expires=1645706023&OSSAccessKeyId=LTAI4FocoL6tuCdYhuvug6Ee&Signature=ekm5UIGtgj%2B016Egrx%2FWbnGGLgo%3D",
        src: 'https://outin-49d28f1f8d3d11ec897300163e10ce6c.oss-cn-beijing.aliyuncs.com/ee73cb7a73d94380a78b819ddae85a00/4036c069400b46f38eff0e5a81cede7a-a31912eafa51444fd6d2d7ab57dc0a7b-ld.mp4?Expires=1645714174&OSSAccessKeyId=LTAI4FocoL6tuCdYhuvug6Ee&Signature=IrGy7%2F9tDh4S39lO3HTm0v90Noc%3D',
        sources: [{src: 'https://outin-49d28f1f8d3d11ec897300163e10ce6c.oss-cn-beijing.aliyuncs.com/ee73cb7a73d94380a78b819ddae85a00/4036c069400b46f38eff0e5a81cede7a-a31912eafa51444fd6d2d7ab57dc0a7b-ld.mp4?Expires=1645714174&OSSAccessKeyId=LTAI4FocoL6tuCdYhuvug6Ee&Signature=IrGy7%2F9tDh4S39lO3HTm0v90Noc%3D', type: 'video/mp4'}]
        },function() {
            console.log()
        });
    // myPlayer.load();
      
		// //实现拍照的功能
		// document.getElementById('snap').addEventListener('click',function(){
		// 	context.drawImage(video,0,0,500,500);
		// });

	myPlayer.controlBar.progressControl.disable();
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