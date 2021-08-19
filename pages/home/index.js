const { Activity } = require("../../models/Activity")
const { Banner} = require("../../models/Banner")
const { Category } = require("../../models/Category")
const { SpuPaging } = require("../../models/Spu-paging")
const { Theme } = require("../../models/Theme")

Page({

	data: {
		themeA: null,
        themeE: null,
        themeESpu: null,
        themeF: null,
        themeH: null,
		bannerB: null,
		gridC:  [],
        activityD: null,
        bannerG: null,
        spuPaging: null,
        waterFlow: null,
        moreData: true
	},
    
	async onLoad(options) {
		this.initData()
        this.initBottomSpuList()
	},

	async initData(){
		let themes = new Theme()
		await themes.getThemes()
		let themeA =  themes.getHomeLocationA()
		let bannerB = await Banner.getHomeLocationB()
		let gridC = await Category.getCategoryC()
		let activityD = await Activity.getHomeLocationD()
		let themeE =  themes.getHomeLocationE()
		let themeESpu = []
		if(themeE.online){
			let data = await await Theme.getHomeLocationESpu()
			if(data){
				themeESpu = data.spu_list.slice(0,8)
			}
		}
		let themeF = themes.getHomeLocationF()
		let bannerG = await Banner.getHomeLocationG()
		let themeH = themes.getHomeLocationH()
		this.setData({
			themeA,
			bannerB : bannerB.items,
			gridC,
			activityD,
			themeE,
			themeESpu,
			themeF,
			bannerG,
			themeH
		})
	},
    
    async initBottomSpuList(){
        this.data.spuPaging = await  SpuPaging.getLatestPaging()
        const data = await this.data.spuPaging.getMoreData()
        this.setData({
            waterFlow: data.items,
            moreData: data.moreData
        })
    },
    async onReachBottom(){
        let data = await this.data.spuPaging.getMoreData()
        if(!data){
            return 
        }
        this.setData({
            waterFlow: data.accumulator,
            moreData: data.moreData
        })
    }
})