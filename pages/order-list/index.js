// pages/order-list/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentId:0
    },

    onLoad: function (options) {

    },
    onTap(event){
        let id = event.currentTarget.dataset.id
        this.setData({
            currentId : id
        })
    }
})