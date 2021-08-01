const { Http } = require("../utils/http")

class Category{
    static getCategoryC(){
        return Http.request({
            url:'/v1/category/grid/all'
        })
    }
    static getCategoryAll(){
        return Http.request({
            url:'/v1/category/all'
        })
    }
}

module.exports = {
    Category
}