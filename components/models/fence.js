const { Cell } = require("./cell");

class Fence{
    cells=[]
    specs
    title
    id
    constructor(specs){
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }
    init(){
        this.specs.forEach(spec => {
            let cell = new Cell(spec)
            if(!this._deduct(this.cells, cell.title)){
                this.cells.push(cell)
            }
        });
    }

    _deduct(cells, arg){
        return cells.find(item=> item.title == arg)
    } 
}

module.exports = {
    Fence
}