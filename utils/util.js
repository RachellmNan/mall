// 处理和服务器的网络请求
function _promisic(fn) {
    return function (params) {
        return new Promise((resolve, reject)=>{
            Object.assign(params, {
                success: res =>{
                    resolve(res)
                },
                fail: err=>{
                    reject(err)
                }
            })
            fn(params)
        })
    }
}

function getHeight(height = 0) {
    return _pr2rpx() - height

}

function _pr2rpx() {
    let res = wx.getSystemInfoSync()
    let wWidth = res.windowWidth
    let wHeight = res.windowHeight
    return 750 * wHeight / wWidth
}


module.exports = {
    _promisic,
    getHeight
}