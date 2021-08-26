const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function promiseic(fn){
  return function(params){
    return new Promise((resolve, reject)=>{
      let obj = Object.assign(params, {
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
      fn(obj)
    })
  }
}

function getHeight(tabHeight = 0){
    return new Promise((resolve)=>{
        wx.getSystemInfo({
            success(res){
                let heightRpx = px2rpx(res.windowWidth, res.windowHeight)
                resolve(heightRpx - tabHeight)
            }
        })
    })
}

function px2rpx(widthPx, heightPx){
    return (750 / widthPx) * heightPx
}

module.exports = {
  formatTime,
  promiseic,
  getHeight
}
