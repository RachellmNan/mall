const config = require('../config/config')
const exceptionMsg = require('../models/ExceptionMsg')
const { _promisic } = require("./util")

class Http{
    static async request({url, data = {}, method ='GET'}){
        let res 
        try {
            res = await _promisic(wx.request)({
                url: config.apiBaseUrl + url,
                method,
                data,
                header:{
                    appkey: config.appkey
                }
            })
        } catch (error) {
            _showError()
            throw new Error(err.errMsg)
        }
        let statusCode = res.statusCode.toString()
        if(statusCode.startsWith(2)){
            return res.data
        }else{
            _showError(res.data.code)
        }
    }
}

function _showError(code) {
    let title = exceptionMsg[code] ? exceptionMsg[code] : exceptionMsg[10000]
    wx.showToast({
        title,
        icon: 'none'
    })
}


module.exports = Http
