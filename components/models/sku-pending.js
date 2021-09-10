class SkuPending{
    pending = []
    constructor(){

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