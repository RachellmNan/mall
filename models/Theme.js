const Http = require('../utils/http')
class Theme{
    static themeList = []
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    static async getAllTheme(){
        let names = `${this.locationA},${this.locationE},${this.locationF},${this.locationH}`
        this.themeList = await Http.request({
            url:'/v1/theme/by/names',
            data:{
                names
            }
        })
    }

    static getHomeLocationA(){
        return this.themeList.find(item => item.name == this.locationA)
    }

    static getHomeLocationE(){
        return this.themeList.find(item => item.name == this.locationE)
    }

    static getHomeLocationF(){
        return this.themeList.find(item => item.name == this.locationF)
    }

    static getHomeLocationH(){
        return this.themeList.find(item => item.name == this.locationH)
    }

    static async getHomeLocationESpu(){
        return await Http.request({
            url: `/v1/theme/name/${this.locationE}/with_spu`
        })
    }
}

module.exports = Theme