loader.import("../../js/api/train.js")
loader.define(function(require, exports, module, global) {

    var pageview = {
        init: function() {
            function getTime(data) {
                var _data = data;
                //如果是13位正常，如果是10位则需要转化为毫秒
                if (String(data).length == 13) {
                    _data = data
                } else {
                    _data = data * 1000
                }
                const time = new Date(Number(_data));
                const Y = time.getFullYear();
                const Mon = time.getMonth() + 1;
                const Day = time.getDate();
                const H = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
                const Min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();;
                const S = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();;
                return `${Y}.${Mon}.${Day} ${H}:${Min}:${S}`
            }

            function getPosition() {
                return new Promise((resolve, reject) => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            let latitude = position.coords.latitude
                            let longitude = position.coords.longitude
                            let data = {
                                latitude: latitude,
                                longitude: longitude
                            }
                            resolve(data)
                        }, function() {
                            reject(arguments)
                        })
                    } else {
                        reject('你的浏览器不支持当前地理位置信息获取')
                    }
                })
            }

            let trainList2 = document.querySelector('#trainList2');
            findMyTraining().then(res => {
                console.log(res);
                if (res.code === '0') {
                    let html = '';
                    for (let i in res.data) {
                        if (res.data[i].trainRecordsStatus == 1)
                            html += `<li class="bui-btn bui-box-center coupon-item" id="${res.data[i].classesId}">
                        <div class="span1 item-content">
                            <h3 class="item-title bui-text-hide">${res.data[i].name}</h3>
                            <p class="item-text bui-box-text-hide">${res.data[i].address}</p>
                            <p class="time">${getTime(res.data[i].beginTime)}-${getTime(res.data[i].endTime)}</p>
                        </div>
                        <div class="divider"></div>
                        <div class="item-right bui-align-center">
                            <span class="details">${res.data[i].signUpNums}人已报名</span>
                            <div class="bui-btn primary mini ring" id="signInForTrain" data-train-id="${res.data[i].id}">签到</div>
                        </div>
                    </li>`
                    }
                    trainList2.innerHTML = html;
                    getPosition().then(result => {
                        let queryData = {
                            longtitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
                            latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0],
                        }
                        console.log(queryData);
                        var longitude = 113.672980569386;
                        var latitude = 34.78800816393977;
                        let signInForTrain = document.querySelectorAll('#signInForTrain');
                        let signInTrain = true;
                        for (let i = 0; i < signInForTrain.length; i++) {
                            signInForTrain[i].addEventListener('click', function() {
                                let train_id = this.dataset["trainId"];
                                if (!signInTrain) {
                                    signInApi({ train_id, longitude, latitude }).then(res => {
                                        console.log(res);
                                        if (res.code === '0') {
                                            bui.alert('签到成功');
                                            signInForTrain[i].innerHTML = '签退';
                                            signInTrain = false;
                                        } else {
                                            bui.alert(res.errMsg);
                                        }
                                    })
                                } else {
                                    signOutApi({ train_id, longitude, latitude }).then(res => {
                                        console.log(res);
                                        if (res.code === '0') {
                                            bui.alert('签退成功');
                                        } else {
                                            bui.alert(res.errMsg);
                                        }
                                    })
                                }

                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    bui.alert(res.errMsg);
                }
            })

            // document.querySelector('#signOutForTrain').addEventListener('click', () => {
            //     let train_id = 2;
            //     let address = '深圳';
            //     signOutApi({ train_id, address }).then(res => {
            //         console.log(res);
            //         if (res.code === '0') {

            //         } else {
            //             bui.alert(res.errMsg);
            //         }
            //     })
            // })
        }
    };
    pageview.init();
    return pageview;
})