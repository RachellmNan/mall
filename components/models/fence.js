const Cell = require("./cell");

class Fence{
    cells = []
    key 
    key_id
    constructor(specs){
        this._init(specs)
        this.key = specs[0].key
        this.key_id = specs[0].key_id
    }
    _init(specs){
        specs.forEach( spec=> {
            let cell = new Cell(spec)
            this.cells.push(cell)
        });
    }
}

module.exports = Fence