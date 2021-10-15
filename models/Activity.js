const Http = require("../utils/http")

class Activity{
    static locationD = 'a-2'
    static async getHomeLocationD(){
        return await Http.request({
            url: `/v1/activity/name/${this.locationD}`
        })
    }
}

module.exports = Activity