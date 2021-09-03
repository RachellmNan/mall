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
        console.log('fences: ',this.fences)
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