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
                    height: 1000
                }
            }).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
            //webkit核心浏览器
            navigator.webkitGetUserMedia({
                video: {
                    width: 1000,
                    height: 1000
                }
            }, success, error)
        } else if (navigator.mozGetUserMedia) {
            //firfox浏览器
            navigator.mozGetUserMedia({
                video: {
                    width: 1000,
                    height: 1000
                }
            }, success, error);
        } else if (navigator.getUserMedia) {
            //旧版API
            navigator.getUserMedia({
                video: {
                    width: 1000,
                    height: 1000
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
        
        
        document.getElementById('poss').addEventListener('click', function () {
                var canvas = document.createElement("canvas");
                canvas.width = 500;
                canvas.height = 500;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                // var img = document.createElement("img");
                // img.src = canvas.toDataURL("image/png");
                var blob = base64ToBlob(canvas.toDataURL("image/png"));
                var file = blobToFile(blob, '1.png');
                // uploadFace({image:file}).then(res=> {
                //     console.log(res)
                // })
                var uiUpload = bui.upload({
                    showProgress: true,
                    url: "http://sunflower.since88.cn/api/users/face"
                });
                // console.log(123)
                uiUpload.add({
                    onSuccess: function() {
                        console.log('123')
                    }
                })
                var data = uiUpload.data();
                console.log(data)
                uiUpload.start({
                    url: "http://sunflower.since88.cn/api/users/face",
                    data: {
                        file
                    },
                    fileKey:'image',
                    onSuccess: function(_data) {
                        console.log(_data)
                    },
                    onFail: function(e) {
                        console.log(e)
                    }
                })
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