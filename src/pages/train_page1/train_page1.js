loader.import("../../js/api/train.js")
loader.define(function(require, exports, module, global) {

    var pageview = {
        init: function() {
            document.getElementById('signUpForTrain').addEventListener('click', () => {
                let train_id = 1312;
                signUp({ train_id }).then(res => {
                    console.log(res);
                    if (res.code === '0') {
                        bui.alert(res.data);
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