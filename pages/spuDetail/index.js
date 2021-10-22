const FenceGroup = require("../../components/models/fence-group")
const Judger = require("../../components/models/judger")
const Spu = require("../../models/Spu")
const { getSpuDetail } = require("../../models/Spu")
const { getHeight } = require("../../utils/util")

// pages/spuDetail/index.js
Page({
    data: {
        spu:{},
        realmTitle: '加入购物车',
        showMask: false,
        judger: null,
        fenceGroup: null
    },

    async onLoad(options) {
        let id = options.id
        let spu = await getSpuDetail(id)
        let scrollHeight = getHeight(100)
        console.log('spu: ',spu)
        let explain = await Spu.getExplain()
        this.setData({
            spu,
            explain,
            scrollHeight
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