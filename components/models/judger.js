const { CellStatus } = require("../../core/enum");
const { Joiner } = require("../../utils/joiner");
const { SkuCode } = require("./sku-code");
const { SkuPending } = require("./sku-pending");

class Judger{
    pathdict = []
    fenceGroup
    skuPending 
    constructor(fenceGroup){
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }
    _initPathDict(){
        this.fenceGroup.skuList.forEach(spec => {
            const skuCode = new SkuCode(spec.code)
            this.pathdict = this.pathdict.concat(skuCode.totalSegements)
        });
    }

    isIntact(){
        return this.skuPending.isIntact()
    }

    _initSkuPending(){
        this.skuPending = new SkuPending(this.fenceGroup.fences.length)
        const defaultSku =  this.fenceGroup.getDefaultSku()
        if(!defaultSku){
            return 
        }
        this.skuPending.init(defaultSku)
        this._initChangeDefaultSkuStatus()
        this.judge(null,null,null,true)
    }
    _initChangeDefaultSkuStatus(){
        for(let i = 0 ; i < this.skuPending.pending.length; i++){
            const cell = this.skuPending.pending[i]
            this.fenceGroup.fences[i].cells.forEach((c, index)=>{
                if(c.id == cell.id){
                    this.fenceGroup.fences[i].cells[index].status = CellStatus.SELECTED
                }
            })
        }
    }

    judge(cell, x , y, isInit = false){
        if(!isInit){
            this._changeCurrentCellStatus(cell, x, y)
        }
        this._changeOtherCellStatus()
    }
    _changeCurrentCellStatus(cell, x, y){
        if(cell.status == CellStatus.SELECTED){
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            cell.status = CellStatus.WAITING
            this.skuPending.removeCell(x)
        }else if(cell.status == CellStatus.WAITING){
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
            cell.status = CellStatus.SELECTED
            this.skuPending.insertCell(cell, x)
        }
    }
    _changeOtherCellStatus(){
        for(let x = 0; x < this.fenceGroup.fences.length; x++){
            let fence = this.fenceGroup.fences[x]
            for(let y = 0; y < fence.cells.length; y++){
                let cell = fence.cells[y]
                const path = this._findPotentialPath(cell, x)
                if(!path){
                    continue
                }
                const isIn = this._isInDict(path)
                if(isIn){
                    this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
                }else{
                    this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
                }
            }
        }
    }
    _isInDict(path){
        return this.pathdict.includes(path)
    }
    _findPotentialPath(cell, x){
        const joiner = new Joiner()
        for(let i = 0 ; i < this.fenceGroup.fences.length; i++){
            if( i == x){
                if(this.skuPending.isSelectedSelf(cell, x)){
                    return 
                }
                joiner.join(cell.code)
            }else{
                if(this.skuPending.pending[i]){
                    joiner.join(this.skuPending.pending[i].code)
                }
            }
        }
        return joiner.getStr()
    }
    getCurrentValue(){
       return this.skuPending.getCurrentValue()
    }
    getMissingKeys(){
        return this.skuPending.getMissingKeys()
    }
}

module.exports = {
    Judger
} 