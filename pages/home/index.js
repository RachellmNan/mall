const { Activity } = require("../../models/Activity")
const { Banner} = require("../../models/Banner")
const { Category } = require("../../models/Category")
const { Theme } = require("../../models/Theme")

Page({

	data: {
		themeA: null,
		bannerB: null,
		gridC: null
	},
    
	async onLoad(options) {
		this.initData()
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
		this.setData({
			themeA,
			bannerB : bannerB.items,
			gridC,
			activityD,
			themeE,
			themeESpu
		})
	}
})