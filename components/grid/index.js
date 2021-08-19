// components/grid.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        grid:{
            type:Array,
            value: []
        }
    },
    observers:{
        'grid':function(grid){
            this.setData({
                list: grid
            })
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        list:[]
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
