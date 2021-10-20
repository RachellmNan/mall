const { getHeight } = require("../../utils/util")

// pages/submit-order/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let scrollHeight =  getHeight(88)
        this.setData({
            scrollHeight
        })
    },
})