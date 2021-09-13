const { Joiner } = require("../../utils/joiner");
const { Cell } = require("./cell");

class SkuPending{
    pending = []
    size
    constructor(size){
        this.size = size
    }
    init(sku){
        sku.specs.forEach((s, index) => {
            this.insertCell(new Cell(s), index)
        });
    }

    getSpecCode(){
        const joiner =  new Joiner()
        this.pending.forEach(cell=>{
            if(cell){
                joiner.join(cell._getCode())
            }
        })
        return joiner.getStr()
    }
    
    isIntact(){
        if(this.size === this.pending.length){
            for(let i = 0; i < this.size; i++){
                let cell = this.pending[i]
                if(!cell){
                    return false
                }
            }
            return true
        }
        return false
    }

    getMissingKeys(){
        const keys = []
        this.pending.forEach((cell, index)=>{
            if(!cell){
                keys.push(index)
            }
        })
        return keys
    }

    getCurrentValue(){
        const values = []
        this.pending.forEach(cell=>{
            if(cell){
                values.push(cell.title)
            }
        })
        return values.join()
    }

    insertCell(cell, x){
        this.pending[x] = cell
    }
    removeCell(x){
        this.pending[x] = null
    }
    isSelectedSelf(cell, x){
        const pendingCell = this.pending[x]
        if(!pendingCell){
            return false
        }
        return cell.title == pendingCell.title
    }
}

module.exports = {
    SkuPending
}