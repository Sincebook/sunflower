loader.import("../../js/api/train.js")
loader.define(function(require, exports, module, global) {

    var pageview = {
        init: function() {
            document.querySelector('#signInForTrain').addEventListener('click', () => {
                let train_id = 2;
                let address = '深圳';
                signInApi({ train_id, address }).then(res => {
                    console.log(res);
                    if (res.code === '0') {

                    } else {
                        bui.alert(res.errMsg);
                    }
                })
            })
            document.querySelector('#signOutForTrain').addEventListener('click', () => {
                let train_id = 2;
                let address = '深圳';
                signOutApi({ train_id, address }).then(res => {
                    console.log(res);
                    if (res.code === '0') {

                    } else {
                        bui.alert(res.errMsg);
                    }
                })
            })
        }
    };
    pageview.init();
    return pageview;
})