// components/cell/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell:{
            type: Object,
            value: {}
        },
        x:{
            type: Number,
            value: 0
        },
        y:{
            type: Number,
            value: 0
        }
    },
    observers:{
        // 'cell.status':function(status) {
        //     if(status == 'waiting'){
        //         this.set
        //     }
        //     console.log('cell_status: ', status)
        // }
    },
    /**
     * 组件的初始数据
     */
    data: {
        selected: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSelect(){
            let cell = this.data.cell
            if(cell.status == 'forbidden'){
                return
            }else if(cell.status == 'waiting'){
                cell.status = 'selected'
            }else{
                cell.status = 'waiting'
            }
            cell.x = this.properties.x
            cell.y = this.properties.y

            this.setData({
                cell
            })
            this.triggerEvent('onCell',{
                cell
            },{
                bubbles: true,
                composed: true
            })
        }
    }
})
