
loader.define(function () {

    var pageview = {};
    pageview.init = function () {
        
        var params = router.getPageParams();
        let ppts = pptStorage.get('finishPPT');
        let addStatus = true
        for (let i in ppts) {
            if (ppts[i].pptId == Number(params.id) && ppts[i].lesson_id == params.lesson_id) {
                addStatus = false
            }
        }
        if (addStatus) {
            pptStorage.set('finishPPT', {
                pptId: Number(params.id),
                lesson_id: params.lesson_id
            })
            console.log('没有数据')
        }
       
       
        getClasseLesson({
            id: params.lesson_id
        }).then(res => {
            console.log(res)
            const pptList = res.data.les_content.ppt;
            for (let i in pptList) {
                if (pptList[i].id == params.id) {
                    var pdfh5 = new Pdfh5('#demo', {
                        pdfurl: pptList[i].url
                      });
                }
            }
        })
       
       
    }
     // 初始化
     pageview.init();

     // 输出模块
     return pageview;
})

