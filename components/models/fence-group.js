const { Fence } = require("./fence");
const { Matrix } = require("./matrix");

class FenceGroup{
    fences=[]
    constructor(spu){
        this.spu = spu
        this.skuList = spu.sku_list
    }

    initFences(){
        const matrix = this._createMatrix(this.skuList)
        let fences = []
        const AT = matrix.transpose()
        AT.forEach(spec=>{
            const fence = new Fence(spec)
            fence.init()
            fences.push(fence)
        })
        this.fences = fences
    }

    getDefaultSku(){
        const defaultSkuId = this.spu.default_sku_id
        if(!defaultSkuId){
            return false
        }
        return this.skuList.find(s=> s.id == defaultSkuId)
    }

    _createMatrix(skuList){
        let m = []
        skuList.forEach(item => {
            m.push(item.specs)
        });
        return new Matrix(m)
    }
}
 
module.exports = {
    FenceGroup
}