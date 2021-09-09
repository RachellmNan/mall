const { CellStatus } = require("../../core/enum");
const { SkuCode } = require("./sku-code");

class Judger{
    pathdict = []
    fenceGroup
    constructor(fenceGroup){
        this.fenceGroup = fenceGroup
        this._initPathDict()

    }
    _initPathDict(){
        this.fenceGroup.skuList.forEach(spec => {
            const skuCode = new SkuCode(spec.code)
            this.pathdict = this.pathdict.concat(skuCode.totalSegements)
        });
    }
    judge(cell, x , y){
        if(cell.status == CellStatus.SELECTED){
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
        }else if(cell.status == CellStatus.WAITING){
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
        }
    }
}

module.exports = {
    Judger
} 