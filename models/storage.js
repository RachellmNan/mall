class WxStorage{
    static getItem(key = 'wind-token'){
        return wx.getStorageSync(key)
    }
    static setItem(key = 'wind-token', value){
        wx.setStorageSync(key, value)
    }
}

module.exports = WxStorage