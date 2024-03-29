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
            var uiLoading = bui.loading({
                
                width: 40,
                height: 40,
                callback: function (argument) {
                    console.log("clickloading")
                }
            });
            uiLoading.show();
            viewCurrentTask().then(res => {
                console.log(res);
                if (res.code === '0') {
                    let html = '';
                    for (let i in res.data) {
                        let temp = res.data[i].misUsersStatus.status
                        let status =  temp == 1 ? '进行中' : temp == 2 ? '待考试' : res.data[i].userScore > res.data[i].mission.score ? '考核通过':'考核未通过'
                        let testStatus = res.data[i].userScore == null ? '未参加考试' : '分数：' + res.data[i].userScore;
                        let studyTime = 0;
                        let Alltime = 0;
                        for (let j in videoMis.get('mis')) {
                            if (res.data[i].mission.id == videoMis.get('mis')[j].mis_id) {
                                studyTime = videoMis.get('mis')[j].studyTime
                                Alltime = videoMis.get('mis')[j].Alltime
                            }
                        }
                        html += `<dt class="bui-btn bui-box" id="${res.data[i].mission.id}">
                        <div class="span1">${res.data[i].mission.name}</div>
                        <div class="color_yellow">${status}</div>
                        <i class="icon-accordion"></i>
                    </dt>
                    <dd id="${res.data[i].lesson.id}" data-misid="${res.data[i].mission.id}" data-status="${res.data[i].misUsersStatus.status}">
                    <ul class="bui-list bui-list-thumbnail"></ul>
                    <li class="bui-btn bui-box">
                    <div class="bui-thumbnail bui-sub"><img src="${res.data[i].lesson.image}"></div>
                    <div class="span1">
                        <h4 class="item-title">${res.data[i].lesson.name}</h4>
                        <p class="item-text">完成期限：${getTime(res.data[i].mission.beginTime)} - ${getTime(res.data[i].mission.endTime)}</p>
                        <p class="item-text">考核分数：大于${res.data[i].mission.score}分</p>
                        <p class="item-text">${Alltime == 0 ?'尚未开始任务':'课程总时长：'+timeLong(Alltime)} ${Alltime == 0 ?'':'- 已学习：'+timeLong(studyTime)}</p>
                        <small style="border-radius:5px;background:#eee;padding:3px;color:${temp > 1?'green':'red'};">${temp > 1 ?'课程已完成':'未完成'}</small><br>
                    </div>
                    </li>
                    <li class="bui-btn bui-box toExam" style="background-color: rgb(250, 250, 250); padding:0.05rem 0" data-score="${res.data[i].mission.score}" id="${res.data[i].lesson.id}" data-misId="${res.data[i].mission.id}" data-status="${res.data[i].misUsersStatus.status}">
                    <div class="icon"><i class="icon icon-thinblue">&#xe62d;</i></div>
                    <div class="span1" style="font-size:0.3rem">课程考试</div>
                    <div class="color_yellow">${testStatus}</div>
                    <i class="icon-listright"></i>
                </li>
            </dd>`
                    }
                    uiLoading.stop();
                    accordionList.innerHTML = html;
                    let childAccordionList = accordionList.querySelectorAll('dd');
                    let toExam = accordionList.querySelectorAll('.toExam');
                    for (let i = 0; i < childAccordionList.length; i++) {
                        childAccordionList[i].onclick = function() {
                            bui.load({ url: "pages/lesson_detail/detail.html", param: { id: this.id, mis_id: this.dataset.misid, mis_status: this.dataset.status } });
                        }
                        toExam[i].onclick = function(e) {
                            e.stopPropagation();
                            if (this.dataset.status == 2 || this.dataset.status == 3) {
                                bui.load({ url: "pages/exam/exam.html", param: { les_id: this.id, mis_id: this.dataset.misid, score: this.dataset.score } });
                            } else {
                                bui.alert('请先完成课程学习');
                            }
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