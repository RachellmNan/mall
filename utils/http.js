const { config } = require("../config/config")
const { promiseic } = require("./util")

class Http{
    static async request({url, data = {}, method = 'GET'}){
        let res = await promiseic(wx.request)({
            url: config.apiBaseUrl + url,
            data,
            method,
            header: {
                appkey: config.appkey
            }
        })
        return res.data
    }
}

module.exports = {
    Http
}