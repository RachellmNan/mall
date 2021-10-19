const Http = require("../utils/http")

class Search{
    static async getContent(keyword){
        return await Http.request({
            url: `/v1/search?q=${keyword}`
        })
    }
}

module.exports = Search