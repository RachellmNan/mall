const {Paging} = require("./Paging")

class SpuPaging{
    static  getHomePaging(){
        return new Paging({
            url:'/v1/spu/latest'
        }, 8)
    }
}

module.exports = SpuPaging