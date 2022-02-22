loader.import("../../js/api/lesson.js")
loader.define(function() {
    var pageview = {};
    pageview.init = function() {
            banners().then(res => {
                if (res.code === '0') {
                    // console.log(res);
                    var uiSlide = bui.slide({
                        id: "#slide",
                        height: 360,
                        autopage: true,
                        data: res.data
                    });
                } else {
                    console.log(res.errMsg)
                }
            });
            let ul = document.getElementById('uiNewsTabNav');

            getClasses().then(res => {
                console.log(res)
                if (res.code === '0') {
                    let htm = '';
                    for (let i in res.data) {
                        htm = htm + `<li class="bui-btn">${res.data[i].name}</li>`
                    }
                    ul.innerHTML = htm
                    var ulChildren = ul.children;
                    ul.onclick = function(e) {
                        e = e || window.event;
                        // console.log(e.target);
                        for (let i = 0; i < ulChildren.length; i++) {
                            ulChildren[i].className = 'bui-btn';
                            ulChildren[i].style.color = '#666';
                        }
                        e.target.className = 'bui-btn active-btn';
                        e.target.style.color = '#39a4ff';

                    }
                } else {
                    console.log(res.errMsg)
                }
            })

            let classes_id = 1;
            findByClassesId({ classes_id }).then(res => {
                console.log(res);
                if (res.code === '0') {
                    let htm = '';
                    for (let i in res.data) {
                        htm = htm + `<div class="bui-box activity-box">
                        <div class="pic-box tip-box">
                            <img src="${res.data[i].image}">
                            <span class="tip">专题</span>
                        </div>
                        <div class="span1">
                            <h3 class="activity-title">${res.data[i].name} </h3>
                            <div class="tags">
                                <span class="tag-item">载货汽车</span>
                                <span class="tag-item">2021</span>
                            </div>
                            <div class="activity-time"><i class="icon icon-time"></i>02-01 15:51</div>
                        </div>
                    </div>`
                    }
                    //需完善
                    // .innerHTML = htm;
                } else {
                    bui.alert(res.errMsg);
                }
            })

        }
        // 初始化
    pageview.init();
    return pageview;
})