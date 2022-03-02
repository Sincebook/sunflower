loader.define(function () {
    var bs = bui.store({
        scope: "page", // 用于区分公共数据及当前数据的唯一值
        data: {
            choices: [],
            nums:1
        },
        // log: true,
        methods: {
           
        },
        watch: {
            
        },
        computed: {},
        templates: {},
        mounted: function () {
            var params = router.getPageParams();
            getExam({
                lesson_id: params.id
            }).then(res => {
                this.choices = res.data
            })
        }
    })
    var pageview = {};
    pageview.init = function () {
        
        
    }
    pageview.init()
    return pageview
});