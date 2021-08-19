const { Paging } = require("./Paging")

class SpuPaging{
    static async getLatestPaging(){
        return new Paging({
            url: '/v1/spu/latest'
        }, 10)
    }
}

module.exports = {
    SpuPaging
}