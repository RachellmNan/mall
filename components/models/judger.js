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
}

module.exports = {
    Judger
} 