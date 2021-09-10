const { CellStatus } = require("../../core/enum")

class Cell{
    title
    id
    spec
    status = CellStatus.WAITING
    code
    constructor(spec){
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
        this.code = this._getCode()
    }
    _getCode(){
        return this.spec.key_id + '-' + this.spec.value_id
    }
}

module.exports = {
    Cell
}