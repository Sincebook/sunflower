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
                const Min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();;
                const S = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();;
                return `${Y}.${Mon}.${Day} ${H}:${Min}:${S}`
            }

            let trainList1 = document.querySelector('#trainList1');
            findMyTraining().then(res => {
                console.log(res);
                if (res.code === '0') {
                    let html = '';
                    for (let i in res.data) {
                        if (res.data[i].trainRecordsStatus == 0)
                            html += `<li class="bui-btn bui-box-center coupon-item">
                        <div class="span1 item-content">
                            <h3 class="item-title bui-text-hide">${res.data[i].name}</h3>
                            <p class="item-text bui-box-text-hide">${res.data[i].address}</p>
                            <p class="time">${getTime(res.data[i].beginTime)}-${getTime(res.data[i].endTime)}</p>
                        </div>
                        <div class="divider"></div>
                        <div class="item-right bui-align-center">
                            <span class="details">${res.data[i].signUpNums}人已报名</span>
                            <div class="bui-btn primary mini ring" id="signUpForTrain" data-trainId="${res.data[i].id}">立即报名</div>
                        </div>
                    </li>`
                    }
                    trainList1.innerHTML = html;
                    let signUpForTrain = document.querySelectorAll('#signUpForTrain');
                    let loadtoTrain = document.querySelector('#loadtoTrain');
                    console.log(loadtoTrain);
                    for (let i = 0; i < signUpForTrain.length; i++) {
                        signUpForTrain[i].onclick = function() {
                            let train_id = this.dataset["trainid"];
                            signUp({ train_id }).then(res => {
                                console.log(res);
                                if (res.code === '0') {
                                    bui.alert(res.data, () => {
                                        location.reload();
                                    });
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