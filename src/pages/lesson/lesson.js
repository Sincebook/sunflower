loader.import("../../js/api/lesson.js")
loader.define(function() {
    var pageview = {};
    pageview.init = function() {
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
                return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
            }

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
                        htm = htm + `<li class="bui-btn" id="${res.data[i].id}">${res.data[i].name}</li>`
                    }
                    ul.innerHTML = htm;
                    ul.onclick = function(e) {
                        e = e || window.event;
                        // console.log(e.target);
                        for (let i = 0; i < ulChildren.length; i++) {
                            ulChildren[i].className = 'bui-btn';
                            ulChildren[i].style.color = '#666';
                        }
                        e.target.className = 'bui-btn active-btn';
                        e.target.style.color = '#39a4ff';
                        // console.log(e.target.id);
                        let classes_id = e.target.id;
                        const getAllClassById = document.querySelector('#getAllClassById');

                        //将当前的classes_id传入到下个api
                        findByClassesId({ classes_id }).then(res => {
                            console.log(res);
                            if (res.code === '0') {
                                let htm = '';
                                for (let i in res.data) {
                                    htm = htm +
                                        `<div class="bui-box activity-box bgcWhite" type="${res.data[i].type}" id="${res.data[i].id}">
                                        <div class="pic-box tip-box">
                                            <img src="${res.data[i].image}">
                                        </div>
                                        <div class="span1">
                                            <h3 class="activity-title">${res.data[i].name} </h3>
                                            <div class="activity-time"><i class="icon icon-time"></i>${getTime(res.data[i].uptime)}</div>
                                        </div>
                                        </div>`
                                }
                                getAllClassById.innerHTML = htm;
                                let allClassesById = getAllClassById.querySelectorAll('.bui-box');
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
                    let ulChildren = ul.children;
                    ul.firstElementChild.click();
                } else {
                    console.log(res.errMsg)
                }
            })

            // function getClassesId(id) {
            //     classes_id = id;
            //     console.log(classes_id);
            // }




        }
        // 初始化
    pageview.init();
    return pageview;
})