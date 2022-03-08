loader.import("../../js/api/myLesson.js");
loader.define(function() {
    var pageview = {};
    pageview.init = function() {
        let myLesson = document.querySelector('#myLesson');
        let none = document.querySelector('#none');
        findMyLesson().then(res => {
            console.log(res);
            if (res.code === '0') {
                let htm = '';
                if (res.data == null) {
                    none.className = 'bui-btn active'
                }
                for (let i in res.data) {
                    htm = htm +
                        `<div class="bui-box activity-box bgcWhite" type="${res.data[i].type}" id="${res.data[i].id}">
                            <div class="pic-box tip-box">
                                <img src="${res.data[i].image}">
                            </div>
                            <div class="span1">
                                <h3 class="activity-title">${res.data[i].name} </h3>
                                <div class="tags">
            <span class="tag-item" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1; overflow: hidden;">${res.data[i].description}</span></div>
                                <div class="activity-time"><i class="icon icon-time"></i>${getTime(res.data[i].uptime)}</div>
                            </div>
                            </div>`
                }
                myLesson.innerHTML = htm;
                let allClassesById = myLesson.querySelectorAll('.bui-box');
                for (let i = 0; i < allClassesById.length; i++) {
                    allClassesById[i].onclick = function() {
                        bui.load({ url: "pages/lesson_detail/detail.html", param: { id: this.id } });
                    }
                }

            } else {
                bui.alert(res.errMsg);
            }
        })
    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})