const Coupon = require("../../models/Coupon")

// pages/coupons/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async onLoad(options) {
        let coupons = await Coupon.getAllCoupon()
        console.log('coupons: ',coupons)
        this.setData({
            coupons
        })
    },
})