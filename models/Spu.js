const { Http } = require("../utils/http")

class Spu{
    static getDetail(id){
        return Http.request({
            url: `/v1/spu/id/${id}/detail`
        })
    }
}

module.exports = {
    Spu
}