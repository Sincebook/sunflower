loader.define(function(){

    var pageview = {};
    var tab = null;
    pageview = {
        init: function(){
            tab = bui.tab({
                id:"#tabLesson",
            });
            this.list();
        },
        list: function(){
            // 列表加载
            var coursewareList = bui.list({
                id: "#coursewareList",
                url: "./detail.json",
                field: {
                    page:"page",
                    size:"pageSize",
                    data:""
                },
                data: {},
                page:1,
                pageSize:5,
                onRefresh: function(scroll, data) {
                    var firstObj = data[0];
                    // 刷新的时候,通过第一条id去获取最新10条数据
                    uiList.option(data, { "lastid": firstObj.Id })
                },
                onLoad: function(scroll, data) {
                    // 加载一页以后做什么事情
                },
                template: function (data) {
                    var html = "";
                    data.map(function(el, index) {

                        html +=`<li class="bui-btn bui-box">
                            <div class="bui-thumbnail"><img src="${el.image}" alt=""></div>
                            <div class="span1">
                                <h3 class="item-title">${el.name}</h3>
                                <span class="item-text">${el.date}</span>
                                <span class="item-text">${el.time}</span>
                            </div>
                        </li>`
                    });

                    return html;
                    }
                    
            });
            var videoList = bui.list({
                id: "#videoList",
                url: "./detail.json",
                field: {
                    page:"page",
                    size:"pageSize",
                    data:""
                },
                data: {},
                page:1,
                pageSize:5,
                onRefresh: function(scroll, data) {
                    var firstObj = data[0];
                    // 刷新的时候,通过第一条id去获取最新10条数据
                    uiList.option(data, { "lastid": firstObj.Id })
                },
                onLoad: function(scroll, data) {
                    // 加载一页以后做什么事情
                },
                template: function (data) {
                    var html = "";
                    data.map(function(el, index) {

                        html +=`<li class="bui-btn bui-box">
                            <div class="bui-thumbnail"><img src="${el.image}" alt=""></div>
                            <div class="span1">
                                <h3 class="item-title">${el.name}</h3>
                                <span class="item-text">${el.date}</span>
                                <span class="item-text">${el.time}</span>
                            </div>
                        </li>`
                    });

                    return html;
                }
            });
        }
    };
   
    // 初始化
    pageview.init();
    return pageview;
})
