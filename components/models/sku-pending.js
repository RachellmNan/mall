class SkuPending{
    pending = []
    size
    constructor(size){
        this.size = size
        this.pending = new Array(size)
    }
    insertItem(index, cell){
        this.pending[index] = cell
    }

    deleteItem(index){
        this.pending[index] = null
    }

    getPath(cell,index){
        let path = JSON.parse(JSON.stringify(this.pending))
        path[index] = cell
        let result = ''
        path.forEach(cell=>{
            if(cell != null){
                result += cell.cell_code + '#'
            }
        })
        return result.substr(0, result.length-1)
    }
    inPending(code){
        for(let i = 0 ; i < this.size ; i++){
            if(this.pending[i] && code == this.pending[i].cell_code){
                return true
            }
        }
        return false
    }
}

module.exports = SkuPending