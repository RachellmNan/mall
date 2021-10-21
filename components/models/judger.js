const { _combination } = require("../../utils/util")
const SkuPending = require("./sku-pending")

class Judger{
    fenceGroup
    pathDict = []
    skuPending
    constructor(fenceGroup){
        this.fenceGroup = fenceGroup
        this._init()
    }
    _init(){
        this._initPathDict()
        this.skuPending = new SkuPending(this.fenceGroup.skuList[0].specs.length)
    }
    _initPathDict(){
        this.fenceGroup.skuList.forEach(sku => {
            let codes = sku.code.split('$')[1]
            let codeArray = codes.split('#')
            for(let i = 1; i <= codeArray.length; i++){
                let pathArray= _combination(codeArray,i)
                for(let j = 0 ; j < pathArray.length ; j++){
                    pathArray[j] = pathArray[j].join('#')
                } 
                this.pathDict = this.pathDict.concat(pathArray)
            }
        });
    }
}

module.exports = Judger