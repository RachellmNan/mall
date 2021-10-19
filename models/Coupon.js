const Http = require("../utils/http")

class Coupon{
    static async getAllCoupon(){
        return await Http.request({
            url : '/v1/coupon/whole_store'
        })
    }
}

module.exports = Coupon