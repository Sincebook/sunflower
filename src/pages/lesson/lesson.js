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
                        htm = htm + `<li class="bui-btn" id="${res.data[i].id}">${res.data[i].name}</li>`
                    }
                    ul.innerHTML = htm;
                    let ulChildren = ul.children;
                    ul.firstElementChild.click();
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
                                        `<div class="bui-box activity-box" type="${res.data[i].type}" id="${res.data[i].id}">
                                        <div class="pic-box tip-box">
                                            <img src="${res.data[i].image}">
                                        </div>
                                        <div class="span1">
                                            <h3 class="activity-title">${res.data[i].name} </h3>
                                            <div class="tags">
                                                <span class="tag-item">载货汽车</span>
                                                <span class="tag-item">2021</span>
                                            </div>
                                            <div class="activity-time"><i class="icon icon-time"></i>${res.data[i].uptime}</div>
                                        </div>
                                        </div>`
                                }
                                getAllClassById.innerHTML = htm;
                                let allClassesById = getAllClassById.querySelectorAll('.bui-box');
                                console.log(allClassesById);
                                for (let i = 0; i < allClassesById.length; i++) {
                                    // console.log(allClassesById[i]);
                                    allClassesById[i].onclick = function() {
                                        bui.load({ url: "pages/lesson_detail/detail.html", param: { id: this.id } });
                                    }
                                }
                                // getAllClassById.addEventListener('click', function(e) {
                                //     console.log(e.currentTarget);
                                // })
                            } else {
                                bui.alert(res.errMsg);
                            }
                        })
                    }
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