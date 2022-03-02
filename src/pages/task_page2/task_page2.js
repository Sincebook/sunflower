loader.import("../../js/api/task.js")
loader.define(function(require, exports, module, global) {

    var pageview = {
        init: function() {
            var uiAccordion = bui.accordion({
                id: "#accordion2"
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

            let accordionList = document.querySelector('#accordion2');
            viewHistoricalTasks().then(res => {
                console.log(res);
                if (res.code === '0') {
                    let html = '';
                    for (let i in res.data) {
                        let testStatus = res.data[i].userScore == null ? '未参加考试' : res.data[i].userScore;
                        html += `<dt class="bui-btn bui-box" id="${res.data[i].mission.id}">
                        <div class="span1">${res.data[i].mission.name}</div>
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
                    <li class="bui-btn bui-box toExam" style="background-color: rgb(243, 242, 242); padding:0.05rem 0" id="${res.data[i].lesson.id}" >
                    <div class="icon"><i class="icon icon-thinblue">&#xe62d;</i></div>
                    <div class="span1" style="font-size:0.3rem">课程考试</div>
                    <div class="color_yellow">${testStatus}</div>
                    <i class="icon-listright"></i>
                </li>
            </dd>`
                    }
                    accordionList.innerHTML = html;
                    let childAccordionList = accordionList.querySelectorAll('dd');
                    let toExam = accordionList.querySelectorAll('.toExam');
                    console.log(toExam);
                    for (let i = 0; i < childAccordionList.length; i++) {
                        childAccordionList[i].onclick = function() {
                            bui.load({ url: "pages/lesson_detail/detail.html", param: { id: this.id } });
                        }
                        toExam[i].onclick = function(e) {
                            e.stopPropagation();
                            bui.load({ url: "pages/exam/exam.html", param: { id: this.id } });
                        }
                    }
                    uiAccordion.showFirst();
                } else {
                    bui.alert(res.errMsg);
                }
            })

        }
    };

    pageview.init();
    return pageview;
})