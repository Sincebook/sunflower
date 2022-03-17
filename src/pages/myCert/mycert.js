loader.define(function () {
    function getUrlBase64(url, ext, callback) {
        var canvas = document.createElement("canvas");   //创建canvas DOM元素
        var ctx = canvas.getContext("2d");
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = function () {
            canvas.height = 60; //指定画板的高度,自定义
            canvas.width = 85; //指定画板的宽度，自定义
            ctx.drawImage(img, 0, 0, 60, 85); //参数可自定义
            var dataURL = canvas.toDataURL("image/" + ext);
            callback.call(this, dataURL); //回掉函数获取Base64编码
            canvas = null;
        };
    }
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
                    imgStudy+=`<td><img src="${e.image}" ></td>`
                    timeStudy+=`<td>${getTime(e.uptime)}</td>`
                })
                html +=`<br>
                <div class="bui-box-space" id="htmlcert${i}">
			<div class="span1">
				<div class="bui-sub primary" data-sub="合格" style="width: 100%;background: #fff;padding:0 30px;color: #000;">
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
        <div style="height:60px">
        <button style="float:right;margin:20px" id="cert${i}">导出</button>
        </div>
        
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
                  saveAs(blob, `${e.target.id}.jpeg`);
                });
              });
          
        }
        
    })
    var pageview = {};
    pageview.init = function () { 

    }
})
