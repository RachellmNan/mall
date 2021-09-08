const { combination } = require("../../utils/util")

class SkuCode{
    code
    spuId
    totalSegements = []
    constructor(code){
        this.code = code
        this._splitToSegments()
    }
    _splitToSegments(){
        const spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]
        const specCodeArray = spuAndSpec[1].split('#')
        for(let i = 1; i <= specCodeArray.length; i++){
            const segments =  combination(specCodeArray, i)
            const newSegments = segments.map(s => s.join('#'))
            this.totalSegements = this.totalSegements.concat(newSegments)
        }
    }
}

module.exports = {
    SkuCode
}