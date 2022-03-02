loader.define(function () {
    var bs = bui.store({
        scope: "page", // 用于区分公共数据及当前数据的唯一值
        data: {
            choices: {
                title: 1,
                answer: '',
                image: '',
                knowledge: '',
            },
            choice: [],
            nums: 0
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
                let datas = res.data
                
                this.choice = eval(datas[this.nums].choice)
                this.choices = datas[this.nums]
                this.choices.da
                console.log(this.choices, this.choice)

            })
        }
    })
    var pageview = {};
    pageview.init = function () {


    }
    pageview.init()
    return pageview
});