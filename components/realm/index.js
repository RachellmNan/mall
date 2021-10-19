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
        title: String
    },

    data: {

    },

    methods: {

    },
    lifetimes:{
        attached(){
            
        }
        
    }
})