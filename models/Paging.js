const Http = require("../utils/http")


class Paging{
    req
    url
    count
    start
    moreData = true
    accumulater = []
    locker = false
    constructor(req, count = 10, start = 0){
        this.req = req
        this.url = req.url
        this.count = count
        this.start = start
    }
    async getMoreData(){
        if(!this.moreData){
            return
        }
        if(!this._getLocker()){
            return
        }
        const data = await this._actualGetData()
        this._releaseLocker()
        return data
    }
    _getLocker(){
        if(this.locker){
            return false
        }
        this.locker = true
        return  true
    }
    async _actualGetData(){
        const req = this._getCurrentReq()
        let paging = await Http.request(req)
        console.log('paging: ',paging)
        if(!paging){
            return null
        }
        if(paging.total === 0){
            return {
                empty:true,
                items:[],
                moreData:false,
                accumulator:[]
            }
        }
        this.moreData = this._moreData(paging.total_page, paging.page)
        if(this.moreData){
            this.start += this.count
        }
        this._accumulate(paging.items)
        return {
            empty:false,
            items: paging.items,
            moreData:this.moreData,
            accumulator:this.accumulater
        }
    }

    _getCurrentReq(){
        let url = this.url
        let params = `start=${this.start}&count=${this.count}`
        if(url.includes('?')){
            url += '&' + params
        }else{
            url += '?' + params
        }
        this.req.url = url
        return this.req
    }

    _releaseLocker(){
        this.locker = false
    }
    _moreData(totalPage, currentPage){
        return currentPage < totalPage - 1
    }
    _accumulate(items){
        this.accumulater = this.accumulater.concat(items)
    }
}

module.exports = {
    Paging
}