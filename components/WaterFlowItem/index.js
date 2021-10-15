// components/WaterFlowItem/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu:{
            type:Object,
            value:{}
        }
    },
    observers:{
        'spu': function (spu) {
            if(spu.tags){
                this.setData({
                    tags:spu.tags.split('$')
                })
            } 
        }
    },
    data: {
        tags:[]
    },
    methods: {
        goDetail(){
            this.triggerEvent('goDetail',{
                id: this.properties.spu.id
            },{
                bubbles: true,
                composed: true
            })
        }
    }
})
