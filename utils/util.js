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

function transpose(matrix) {
    let result = []
    for(let i = 0 ; i < matrix[0].length; i++){
        result[i] = []
    }
    for(let i = 0 ; i < matrix[0].length; i++){
        let s = new Set()
        for(let j = 0 ; j < matrix.length; j++){
            let waitInsert = matrix[j][i]
            if(!s.has(waitInsert.value)){
                s.add(waitInsert.value)
                result[i].push(waitInsert)
            }
        }
    }
    return result
}

// 金属灰 七龙珠 小号s
// 青芒色 灌篮高手 中号m
// 青芒色 圣斗士 大号L
// 橘黄色 七龙珠 小号s

function _combination(arr, size){
    var r =[]
    function _(t, a, n){
        if(n===0){
            r[r.length] = t
            return 
        }
        for(var i = 0,l=a.length - n;i<=l; i++){
            var b = t.slice()
            b.push(a[i])
            _(b, a.slice(i+1),n-1)
        }
    }
    _([], arr, size)
    return r
}

module.exports = {
    _promisic,
    getHeight,
    transpose,
    _combination
}