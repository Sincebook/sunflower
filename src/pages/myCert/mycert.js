loader.define(function () {
    findMyCert({lesson_id:1}).then(res => {
        if (res.code == '0') {
            let html = ''
            res.data.forEach((element, i) => {
                let td = ''
                element.finishMediaDtoList.forEach(e => {
                    td+=` <tr>
                    <td>${e.name}</td>
                    <td>${element.classesName}</td>
                    <td>${e.type == '1'? '普通课程':'优质课程'}</td>
                    </tr>`
                })
                let imgStudy = ''
                let timeStudy = ''
                element.studyImg.forEach(e => {
                    imgStudy+=`<td><img src="${e.image}"></td>`
                    timeStudy+=`<td>${getTime(e.uptime)}</td>`
                })
                html +=`<br>
                <div class="bui-box-space" id="htmlcert${i}">
			<div class="span1">
				<div class="bui-sub primary" data-sub="合格" style="width: 100%;background: #fff;padding:0 40px;color: #000;">
                    <div style="text-align:center;line-height: 60px;">
                        <h3 stlye="">道路运输从业人员安全教育证明</h3>
                    </div>
                    <div style="font-size: 8px;">
                    姓名：${element.usersName}<br>
                    身份证号：${element.usersIdcard}<br>
                    单位名称：${element.usersName}<br>
                    培训内容：${element.usersCompanyName}<br>
                    培训类型：${element.classesName}<br>
                    考试成绩：${element.score}<br><br>
                    学习内容:
                    <table border="1" style="text-align: center;">
                        <tr>
                        <th>课程</th>
                        <th>类别</th>
                        <th>课程类型</th>
                        </tr>
                       ${td}
                    </table>
                    <br>
                    <table border="1" style="text-align: center;">
                            <tr>${imgStudy}
                            </tr>
                            <tr>${timeStudy}
                            </tr>
                    </table>
                    <br>
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp该同志已完成道路运输从业人员安全教育培训学习内容，学习期满，成绩合格。
                    <br>
                    </div>
                    <br> 
                    <div style="float: right;font-size: 8px;">
                        <img src="../../images/2022030417510515.gif" alt="" style="float: right;width: 50%;"><br><br><br><br>
                        <span style="float: right;">${getTime(element.uptime)}</span><br><br>
                    </div>
				</div>
			</div>
		</div>
        <button id="cert${i}">导出</button>
        `
            });
            document.getElementById('res').innerHTML = html
           
        }
        console.log(res)
        
    })
    
    document.getElementById('res').addEventListener('click', function (e) {
        if (e.target.id) {
            let htmls = document.getElementById('html' + e.target.id)
            html2canvas(htmls, {
                useCORS: true,
              }).then(canvas => {
                canvas.toBlob((blob) => {
                  saveAs(blob, `${cert}.jpeg`);
                });
              });
          
        }
        
    })
    var pageview = {};
    pageview.init = function () { 

    }
})
