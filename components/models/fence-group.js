const { transpose } = require("../../utils/util");
const Fence = require("./fence");

class FenceGroup{
    skuList
    fences = []

    constructor(skuList){
        this.skuList = skuList
        this._init(skuList)
    }

    _init(skuList){
        let matrix = []
        skuList.forEach(sku => {
            matrix.push(sku.specs)
        });
        matrix = transpose(matrix)
        matrix.forEach(sub_matrix=>{
            let fence = new Fence(sub_matrix)
            this.fences.push(fence)
        })
        console.log('FenceGroup: ', this)
    }
}

module.exports = FenceGroup