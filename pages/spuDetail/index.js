const Spu = require("../../models/Spu")
const { getSpuDetail } = require("../../models/Spu")
const { getHeight } = require("../../utils/util")

// pages/spuDetail/index.js
Page({
    data: {
        spu:{}
    },

    async onLoad(options) {
        let id = options.id
        let spu = await getSpuDetail(id)
        let scrollHeight = getHeight(100)
        console.log('spu: ',spu)
        let explain = await Spu.getExplain()
        console.log('explain: ', explain)
        this.setData({
            spu,
            explain,
            scrollHeight
        })
    },

    onShareAppMessage: function () {

    }
})