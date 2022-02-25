loader.import("../../js/api/train.js")
loader.define(function(require, exports, module, global) {

    var pageview = {
        init: function() {
            //将时间戳转化为时间
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
                const Min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
                const S = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
                return `${Y}.${Mon}.${Day}`
            }

            // document.getElementById('signUpForTrain').addEventListener('click', () => {
            //     let train_id = 1312;
            //     signUp({ train_id }).then(res => {
            //         console.log(res);
            //         if (res.code === '0') {
            //             bui.alert(res.data);
            //         } else {
            //             bui.alert(res.errMsg);
            //         }
            //     })
            // })

            let trainList1 = document.querySelector('#trainList1');
            findMyTraining().then(res => {
                console.log(res);
                if (res.code === '0') {
                    let html = '';
                    for (let i in res.data) {
                        html += `<li class="bui-btn bui-box-center coupon-item" id="${res.data[i].classesId}">
                        <div class="span1 item-content">
                            <h3 class="item-title bui-text-hide">${res.data[i].name}</h3>
                            <p class="item-text bui-box-text-hide">${res.data[i].address}</p>
                            <p class="time">${getTime(res.data[i].beginTime)}-${getTime(res.data[i].endTime)}</p>
                        </div>
                        <div class="divider"></div>
                        <div class="item-right bui-align-center">
                            <span class="details">${res.data[i].signUpNums}人已报名</span>
                            <div class="bui-btn primary mini ring" id="signUpForTrain">立即报名</div>
                        </div>
                    </li>`
                    }
                    trainList1.innerHTML = html;
                    if (res.data) {
                        var train_id = res.data[0].id;
                    }
                    let signUpForTrain = document.querySelectorAll('#signUpForTrain');
                    for (let i = 0; i < signUpForTrain.length; i++) {
                        signUpForTrain[i].onclick = function() {
                            signUp({ train_id }).then(res => {
                                console.log(res);
                                if (res.code === '0') {
                                    bui.alert(res.data);
                                } else {
                                    bui.alert(res.errMsg);
                                }
                            })
                        }
                    }
                    // let signUpList =
                } else {
                    bui.alert(res.errMsg);
                }
            })
        }
    };

    pageview.init();
    return pageview;
})