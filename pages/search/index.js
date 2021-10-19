const Search = require("../../models/Search")
const Tag = require("../../models/Tag")

// pages/search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tags:[],
        searchValue:'',
        searchResult: {}
    },
    async onLoad(options) {
        await this._init()
    },
    async _init(){
        let tags = await Tag.getTag()
        this.setData({
            tags
        })
    },
    async onConfirm(event){
        let searchValue = event.detail.value
        let searchResult = await Search.getContent(searchValue)
        console.log('searchResult: ', searchResult)
        this.setData({
            searchValue,
            searchResult
        })
    },
    delete(){
        this.setData({
            searchValue: ''
        })
    },
    cancel(){
        this.setData({
            searchValue: ''
        })
        wx.navigateBack()
    },
    async searchFromTag(event){
        let searchValue = event.currentTarget.dataset.title
        let searchResult = await Search.getContent(searchValue)
        this.setData({
            searchValue,
            searchResult
        })
    }
})