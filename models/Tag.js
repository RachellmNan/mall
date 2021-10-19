const Http = require("../utils/http")
class Tag{
    static async getTag(){
        return await Http.request({
            url: '/v1/tag/type/1'
        })
    }
}

module.exports = Tag