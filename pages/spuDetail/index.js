const FenceGroup = require("../../components/models/fence-group")
const Spu = require("../../models/Spu")
const { getSpuDetail } = require("../../models/Spu")
const { getHeight } = require("../../utils/util")

// pages/spuDetail/index.js
Page({
    data: {
        spu:{},
        realmTitle: '加入购物车',
        showMask: false
    },

    async onLoad(options) {
        let id = options.id
        let spu = await getSpuDetail(id)
        let scrollHeight = getHeight(100)
        console.log('spu: ',spu)
        let explain = await Spu.getExplain()
        let fenceGroup = new FenceGroup(spu.sku_list)
        this.setData({
            spu,
            explain,
            scrollHeight,
            fenceGroup
        })
    },

    onRealm(event){
        let realmTitle = event.currentTarget.dataset.title
        let showMask = true
        this.setData({
            realmTitle,
            showMask
        })
    },

    closeRealm(){
        this.setData({
            showMask: false
        })
    },

    onShareAppMessage: function () {

    }
})