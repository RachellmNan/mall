// components/count/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        minCount: {
            type: Number,
            value: 1
        },
        maxCount: {
            type: Number,
            value: 10
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        count: 1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        minu(){
            console.log('minu')
            let count = this.data.count
            count--
            if(count < this.properties.minCount){
                console.log('count: ', this.data.count)
                wx.showToast({
                    title: '最少需要购买一件噢',
                    icon: 'none'
                })
                return 
            }

            
            this.setData({
                count
            })
        },
        add(){
            console.log('add')
            let count = this.data.count
            count++
            if(count > this.properties.maxCount){
                wx.showToast({
                    title: "超过最大数量",
                    icon: "none"
                })
                return
            }
            this.setData({
                count
            })
        }
    }
})
