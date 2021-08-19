Component({
    data: {
        left:'',
        rightTop:'',
        rightBottom:''
    },
    properties: {
        list:{
            type: Array,
            value:[]
        }
    },
    observers:{
        'list': function(list){
            let left = list.find(val=>val.name==='left')
            let rightTop = list.find(val=>val.name==='right-top')
            let rightBottom = list.find(val=>val.name==='right-bottom')
            this.setData({
                left,
                rightTop,
                rightBottom
            })
        }
    },
    methods: {}
})