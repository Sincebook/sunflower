// 默认已经定义了main模块
loader.define(function () {
    var pageview = {};

    // 主要业务初始化
    pageview.init = function () {
        // 这里写main模块的业务
        console.log("load.js was loaded");
        var video = document.getElementById('video');
        if (navigator.mediaDevices.getUserMedia) {
            //最新的标准API
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: 1000,
                    height: 1000,
                    facingMode: "user"
                }
            }).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
            //webkit核心浏览器
            navigator.webkitGetUserMedia({
                video: {
                    width: 1000,
                    height: 1000,
                    facingMode: "user"
                }
            }, success, error)
        } else if (navigator.mozGetUserMedia) {
            //firfox浏览器
            navigator.mozGetUserMedia({
                video: {
                    width: 1000,
                    height: 1000,
                    facingMode: "user"
                }
            }, success, error);
        } else if (navigator.getUserMedia) {
            //旧版API
            navigator.getUserMedia({
                video: {
                    width: 1000,
                    height: 1000,
                    facingMode: "user"
                }
            }, success, error);
        }

        function success(stream) {
            //兼容webkit核心浏览器
            // let CompatibleURL = window.URL || window.webkitURL;

            //将视频流设置为video元素的源
            console.log(stream);

            //video.src = CompatibleURL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        }

        function error(error) {
            console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
        }
        const base64ToBlob = function (base64Data) {
            let arr = base64Data.split(','),
              fileType = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
              l = bstr.length,
              u8Arr = new Uint8Array(l);
          
            while (l--) {
              u8Arr[l] = bstr.charCodeAt(l);
            }
            return new Blob([u8Arr], {
              type: fileType
            });
          };
          // blob转file
          const blobToFile = function (newBlob, fileName) {
            newBlob.lastModifiedDate = new Date();
            newBlob.name = fileName;
            return newBlob;
          };
        //调用
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
			var uploadUrl = "/api/users/face";
			
			// 手工构造一个 form 对象
			var formData = new FormData();
			formData.append('image', file); // 'file' 为HTTP Post里的字段名, file 对浏览器里的File对象
					
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
                if (res.code == '0') {
                    bui.alert('采集完成',function () {
                        bui.load({url:'pages/main/main', require:true})
                    })
                } else {
                    bui.alert(res.errMsg)
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

        document.getElementById('poss').addEventListener('click', function () {
                var canvas = document.createElement("canvas");
                canvas.width = 500;
                canvas.height = 500;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                // var img = document.createElement("img");
                // img.src = canvas.toDataURL("image/png");
                // var blob = base64ToBlob(canvas.toDataURL("image/png"));
                // var file = blobToFile(blob, '123');
                var file = dataURLtoFile(canvas.toDataURL("image/png"),'123.png')
                // uploadFace({image:file}).then(res=> {
                //     console.log(res)
                // })
                // bui.config.upload = {needNative:true}
                console.log(file)
                startUpload(file);
                // var uiUpload = bui.upload({
                //     showProgress: true,
                //     url: "/api/users/face",
                //     data:{file:canvas.toDataURL("image/png")},
                //     fileKey:'image',
                //     onSuccess: function(res) {
                //         console.log(res)
                //     },
                //     onFail: function(error) {
                //         console.log(error)
                //     }
                // });
                // console.log(123)
                // uiUpload.start({
                //     showProgress: true,
                //     url: "/api/users/face",
                //     data:{file},
                //     fileKey:'image',
                //     onSuccess: function(res) {
                //         console.log(res)
                //     },
                //     onFail: function(error) {
                //         console.log(error)
                //     }
                // });
                // uiUpload.add({
                //     onSuccess: function() {
                //         console.log('123')
                //     }
                // })
                // var data = uiUpload.data();
                // console.log(data)
                // uiUpload.start({
                //     url: "/api/users/face",
                //     data: {
                //         file:blob
                //     },
                //     fileKey:'image',
                //     onSuccess: function(_data) {
                //         console.log('123123')
                //     },
                //     onFail: function(e) {
                //         console.log('123123')
                //     }
                // })
                // console.log(img)
                // uploadFace({image:img}).then(res=> {
                //     console.log(res);
                // })
        });
    }

    // 事件绑定
    pageview.bind = function () {

    }

    // 初始化
    pageview.init();
    // 绑定事件
    pageview.bind();

    return pageview;
})