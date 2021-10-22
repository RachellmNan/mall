const { transpose } = require("../../utils/util");
const Fence = require("./fence");

class FenceGroup{
    spu
    fences = []
    skuList
    constructor(spu){
        this.spu = spu
        this.skuList = spu.sku_list
        this._init(this.skuList)
    }

    _init(skuList){
        let matrix = []
        skuList.forEach(sku => {
            matrix.push(sku.specs)
        });
        matrix = transpose(matrix)
        matrix.forEach((sub_matrix,index)=>{
            let fence = new Fence(sub_matrix, index)
            this.fences.push(fence)
        })
    }
}

module.exports = FenceGroup