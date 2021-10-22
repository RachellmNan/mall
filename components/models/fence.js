const Cell = require("./cell");

class Fence{
    cells = []
    key 
    key_id
    x
    constructor(specs, x){
        this.x = x
        this.key = specs[0].key
        this.key_id = specs[0].key_id
        this._init(specs, x)
    }
    _init(specs, x){
        specs.forEach( (spec,index)=> {
            let cell = new Cell(spec)
            cell.y = index
            cell.x = x
            this.cells.push(cell)
        });
    }
}

module.exports = Fence