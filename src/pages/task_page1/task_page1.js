loader.define(function() {

    var pageview = {
        init: function() {
            //折叠菜单示例
            var uiAccordion = bui.accordion({
                id: "#accordion"
            })

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

            let accordionList = document.querySelector('#accordion');
            viewCurrentTask().then(res => {
                console.log(res);
                if (res.code === '0') {
                    let html = '';
                    for (let i in res.data) {
                        let status = res.data[i].mission.status == 1 ? '进行中' : '';
                        html += `<dt class="bui-btn bui-box" id="${res.data[i].mission.id}">
                        <div class="span1">${res.data[i].mission.name}</div>
                        <div class="color_yellow">${status}</div>
                        <i class="icon-accordion"></i>
                    </dt>
                    <dd id="${res.data[i].lesson.id}">
                    <ul class="bui-list bui-list-thumbnail"></ul>
                    <li class="bui-btn bui-box">
                    <div class="bui-thumbnail bui-sub"><img src="${res.data[i].lesson.image}"></div>
                    <div class="span1">
                        <h3 class="item-title">${res.data[i].lesson.name}</h3>
                        <p class="item-text">${getTime(res.data[i].mission.beginTime)} - ${getTime(res.data[i].mission.endTime)}</p>
                        <p class="item-text">${res.data[i].lesson.status}</p>
                    </div>
                    </li>
            </dd>`
                    }
                    accordionList.innerHTML = html;
                    let childAccordionList = accordionList.querySelectorAll('dd');
                    for (let i = 0; i < childAccordionList.length; i++) {
                        childAccordionList[i].onclick = function() {
                            bui.load({ url: "pages/lesson_detail/detail.html", param: { id: this.id } });
                        }
                    }
                    uiAccordion.showFirst();
                } else {
                    bui.alert(res.errMsg);
                }
            })
        }
    }
    pageview.init();
    return pageview;

})