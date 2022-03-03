loader.define(function () {

    var bs = bui.store({
        scope: "page", // 用于区分公共数据及当前数据的唯一值
        data: {
            allTile: {},
            choices: {
                title: 1,
                answer: '',
                image: '',
                knowledge: '',
            },
            choice: [{ content: '', display: '' }, { content: '', display: '' }, { content: '', display: '' }, { content: '', display: '' }],
            nums: 0,
            type: '',
            typeName: '',
            display: 'none',
            answer: []
        },
        mounted: function () {
            var params = router.getPageParams();
            getExam({
                lesson_id: params.id
            }).then(res => {
                let datas = res.data
                this.allTile = datas
                this.$methods.showTitle()
                // showTitle(datas[this.nums])
                console.log(datas)
                this.answer = []
                datas.forEach(() => {
                    this.answer.push('')
                })
            })
        },
        methods: {
            showTitle() {

                let single = document.getElementById('singleChoice')
                let multi = document.getElementById('multiChoice')
                let titlePic = document.getElementById('pic')
                let current = this.allTile[this.nums];
                this.type = current.type
                if (current.type == 1) {
                    single.style.display = ''
                    multi.style.display = 'none'
                    this.typeName = '【单选题】' + (this.nums + 1) + '.'
                    let content = eval(current.choice)
                    for (let i = 0; i < 4; i++) {
                        if (content[i]) {
                            single.children[i].style.display = ''
                            this.set('choice.' + i + '.content', content[i])
                        } else {
                            single.children[i].style.display = 'none'
                        }
                    }
                    this.set('choices', current)
                } else if (current.type == 2) {
                    single.style.display = 'none'
                    multi.style.display = ''
                    this.typeName = '【多选题】' + (this.nums + 1) + '.'
                    let content = eval(current.choice)
                    for (let i = 0; i < 4; i++) {
                        if (content[i]) {
                            multi.children[i].style.display = ''
                            this.set('choice.' + i + '.content', content[i])
                        } else {
                            multi.children[i].style.display = 'none'
                        }
                    }
                } else if (current.type == 3) {
                    single.style.display = ''
                    multi.style.display = 'none'
                    this.typeName = '【判断题】' + (this.nums + 1) + '.'
                    single.children[0].style.display = ''
                    single.children[1].style.display = ''
                    this.set('choice.' + 0 + '.content', '正确')
                    this.set('choice.' + 1 + '.content', '错误')
                    single.children[2].style.display = 'none'
                    single.children[3].style.display = 'none'
                }
                if (current.image) {
                    titlePic.style.display = ''
                    titlePic.setAttribute('src', current.image)
                } else {
                    titlePic.style.display = 'none'
                }
                this.set('choices', current)
            },
            nextTitle() {
                console.log($('input[name="interest"]'))
                if (this.nums < this.allTile.length - 1) {
                    this.nums++;
                    this.showTitle()
                    this.showAnswer()
                } else {
                    bui.hint('已经是最后一题了')
                }
            },
            lastTitle() {
                if (this.nums > 0) {
                    this.nums--;
                    this.showTitle()
                    this.showAnswer()
                } else {
                    bui.hint('已经是第一题了')
                }
            },
            subTitle() {
                if (this.type == 1) {
                    var val = $('input[name="interest"]:checked').val();
                    if (!val) {
                        bui.hint('没有选择');
                        return
                    }
                    bui.hint({ content: "<i class='icon-check'></i><br/>回答完成<br/>进入下一题", position: "center", effect: "fadeInDown" });

                } else if (this.type == 2) {
                    var val = ''
                    $('input[name="interester"]:checked').each((item, content) => {
                        val = val + content.value
                    });

                } else if (this.type == 3) {
                    $('input[name="interest"]:checked')
                }
                console.log(val)
            },
            showAnswer() {
                if (this.answer[this.nums]) {

                } else {
                    $('input[name="interest"]').removeAttr('checked')
                    $('input[name="interester"]').removeAttr('checked')
                }
               
            },
            strToint(_data) {
                if (_data == 'A') {
                    return 0
                } else if (_data == 'B') {
                    return 1
                } else if (_data == 'C') {
                    return 2
                } else if (_data == 'D') {
                    return 3
                }
            }
        },
        watch: {

        },
        computed: {},
        templates: {},

    })
    // bs.$methods.showTitle()

    var pageview = {};
    pageview.init = function () {


    }
    pageview.init()
    return pageview
});