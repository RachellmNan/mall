const Category = require("../../models/Category")
const { getHeight } = require("../../utils/util")

// pages/category/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async onLoad(options) {
        await this._init()
    },
    async _init(){
        let categorys = await Category.getCategoryAll()
        categorys.roots = categorys.roots.slice(1)
        console.log('category: ', categorys)
        let categoryList = {}
        categorys.roots.forEach(root => {
            let arr = []
            categorys.subs.forEach(subroot => {
                if(subroot.parent_id == root.id){
                    arr.push(subroot)
                }
            });
            categoryList[root.id] = arr
        });
        let categoryHight = getHeight(84)
        let BannerImg = categorys.roots[3].img
        let selectedRootId = categorys.roots[3].id
        this.setData({
            roots:categorys.roots,
            categoryList,
            categoryHight,
            subCategory: categoryList[3],
            BannerImg,
            selectedRootId
        })
        console.log('categoryList', categoryList)
    },
    onRoot(event){
        let id = event.currentTarget.dataset.id
        let subCategory = this.data.categoryList[id]
        let selectedRoot = this.data.roots.find(item=>item.id == id)
        let BannerImg = selectedRoot.img
        this.setData({
            subCategory,
            BannerImg,
            selectedRootId:id
        })
        console.log(BannerImg)
    },
    goDetail(event){
        let id = event.currentTarget.dataset.id
        wx.navigateTo({
            url:`/pages/spuDetail/index?id=${id}`
        })
    },
    goSearch(){
        wx.navigateTo({
            url: '/pages/search/index'
        })
    }
})