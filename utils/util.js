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

const combination = function (arr, size) {
    var r = []; 
  
    function _(t, a, n) { 
        if (n === 0) {
            r[r.length] = t;
            return;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n - 1);
        }
    }
  
    _([], arr, size);
    return r;
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
  getHeight,
  combination
}
