const Http = require("../utils/http")

class Spu{
    static async getLatest(){
        return await Http.request({
            url: '/v1/spu/latest'
        })
    }
    static async getSpuDetail(id){
        return await Http.request({
            url: `/v1/spu/id/${id}/detail`
        })
    }
    static async getExplain(){
        return await Http.request({
            url: '/v1/sale_explain/fixed'
        })
    }
}

module.exports = Spu