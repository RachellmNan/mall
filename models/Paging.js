const Http = require("../utils/http")

class Paging{
    url
    req
    count 
    start 
    moreData = true
    lock = false
    accumulator = []

    constructor(req, count = 8, start = 0){
        this.req = req
        this.url = req.url
        this.count = count
        this.start = start
    }

    async getMoreData(){
        // 是否有更多数据
        if(!this.moreData){
            return
        }
        // 是否上锁
        if(!this._getLocker()){
            return
        }
        // 请求数据
        let data = await this._getData()
        // 释放锁
        this._releaseLocker()
        return data
    }
    _getLocker(){
        if(this.lock){
            return false
        }
        this.lock = true
        return true
    }
    _releaseLocker(){
        this.lock = false
    }
    async _getData(){
        this._handleReq()
        let result = await Http.request(this.req)

        // 空数据
        if(!result.total){
            result = {
                items:[],
                accumulator: [],
                hasMoreData: false
            }
        }else{
        // 有数据
            this.moreData = this._hasMoreData(result.page, result.total_page)
            if(this.moreData){
                this.start += this.count
            }
            this.accumulator = this.accumulator.concat(result.items)
            result = {
                items: result.items,
                hasMoreData: this.moreData,
                accumulator: this.accumulator
            }
        }
        return result
    }
    _handleReq(){
        let url = this.url
        let param = `start=${this.start}&count=${this.count}`
        console.log('param: ',param)
        if(url.includes('?')){
            url += '&' + param
        }else{
            url += '?' + param
        }
        this.req.url = url
    }
    _hasMoreData(current_pate, total_page){
        return total_page - current_pate == 1 ? false : true
    }
}

module.exports = {
    Paging
}