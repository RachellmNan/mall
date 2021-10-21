const { transpose } = require("../../utils/util");
const FenceGroup = require("../models/fence-group");

// components/realm/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        fenceGroup:{
            type:Object,
            value:{}
        },
        spu:{
            type:Object,
            value: {}
        },
        judger:{
            type: Object,
            value:null
        },
        title: String
    },

    data: {

    },

    methods: {
        onCell(event){
            let cell = event.detail.cell
            console.log('点击cell：', cell)
        }
    },
    lifetimes:{
        attached(){
            
        }
        
    }
})