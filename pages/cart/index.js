const SpuPaging = require("../../models/SpuPaging")
const { getHeight } = require("../../utils/util")

// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async onLoad(options) {
        let paging = SpuPaging.getHomePaging()
        let result = await paging.getMoreData()
        let spus = result.accumulator
        console.log('result: ',result)
        let scrollHeight = getHeight(88)
        console.log('spus: ',spus)
        this.setData({
            paging,
            spus,
            hasMoreData: result.hasMoreData,
            scrollHeight
        })
    },
    async onReachBottom(){
        if(!this.data.hasMoreData){
            return
        }
        let result = await this.data.paging.getMoreData()
        let spus = result.accumulator
        console.log('result: ',result)
        console.log('spus: ',spus)
        this.setData({
            spus,
            hasMoreData:result.hasMoreData
        })
    }
})