const { CellStatus } = require("../../core/enum")

class Cell{
    title
    id
    spec
    status = CellStatus.WAITING
    constructor(spec){
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }
}

module.exports = {
    Cell
}