const { FenceGroup } = require("../../components/models/fence-group")
const { explain } = require("../../models/Explain")
const { Spu } = require("../../models/Spu")
const { getHeight } = require("../../utils/util")

// pages/detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showRealm: false,
        title:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let id = options.id
        const Spus = await Spu.getDetail(id)
        const explainList = await explain.getExplain()
        const ScrollHeight =  await getHeight(100)
        this.setData({
            Spus,
            SwiperImgList: Spus.spu_img_list,
            explainList,
            ScrollHeight
        })
    },
    onRealm(event){
        this.setData({
            showRealm: event.detail.showRealm,
            title: event.detail.title
        })
    },
    cancelRealm(){
        this.setData({
            showRealm: false
        })
    }
})