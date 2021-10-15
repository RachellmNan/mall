const Activity = require("../../models/Activity")
const Banner = require("../../models/Banner")
const Category = require("../../models/Category")
const Spu = require("../../models/Spu")
const SpuPaging = require("../../models/SpuPaging")
const Theme = require("../../models/Theme")
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    async onLoad(options) {
        await this.init()
        await this.initBottom()
    },

    async init(){
        await Theme.getAllTheme()
        let ThemeA = Theme.getHomeLocationA()
        let BannerB = await Banner.getHomeLocationB()
        let GridC = await Category.getHomeLocationC()
        let ActivityD = await Activity.getHomeLocationD()
        let ThemeE = Theme.getHomeLocationE()
        let ThemeESpu = await Theme.getHomeLocationESpu()
        let ThemeF = Theme.getHomeLocationF()
        let BannerG = await Banner.getHomeLocationG()
        let ThemeH = Theme.getHomeLocationH()
        this.setData({
            ThemeA,
            BannerB,
            GridC,
            ActivityD,
            ThemeE,
            ThemeESpu,
            ThemeF,
            BannerG,
            ThemeH,
        })
    },

    async initBottom(){
        let paging =  SpuPaging.getHomePaging()
        console.log('paging: ',paging)
        let spus = (await paging.getMoreData()).items
        console.log('spus: ', spus)
        this.setData({
            paging,
            spus
        })
    },

    goDetail(event){
        let id = event.detail.id
        wx.navigateTo({
            url:`/pages/spuDetail/index?id=${id}`
        })
    },
    async onReachBottom(){
        let res = await this.data.paging.getMoreData()
        console.log('res',res.accumulator)
        
        this.setData({
            spus: res.accumulator
        })
    }
})