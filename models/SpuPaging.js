const {Paging} = require("./Paging")

class SpuPaging{
    static  getHomePaging(){
        return new Paging({
            url:'/v1/spu/latest'
        })
    }
}

module.exports = SpuPaging