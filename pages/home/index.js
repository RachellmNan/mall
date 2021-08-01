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
    let themeA = await themes.getHomeLocationA()
    let bannerB = await Banner.getHomeLocationB()
    let gridC = await Category.getCategoryC()
    this.setData({
      themeA,
      bannerB : bannerB.items,
      gridC
    })
  }
})