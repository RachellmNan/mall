const { _combination } = require("../../utils/util")
const SkuPending = require("./sku-pending")

class Judger{
    fenceGroup
    pathDict = []
    skuPending
    constructor(fenceGroup){
        this.fenceGroup = fenceGroup
        this._init()
    }
    _init(){
        this._initPathDict()
        this.skuPending = new SkuPending(this.fenceGroup.skuList[0].specs.length)
    }
    _initPathDict(){
        this.fenceGroup.skuList.forEach(sku => {
            let codes = sku.code.split('$')[1]
            let codeArray = codes.split('#')
            for(let i = 1; i <= codeArray.length; i++){
                let pathArray= _combination(codeArray,i)
                for(let j = 0 ; j < pathArray.length ; j++){
                    pathArray[j] = pathArray[j].join('#')
                } 
                this.pathDict = this.pathDict.concat(pathArray)
            }
        });
    }
    onJudge(cell){
        let selectedX = cell.x
        let selectedY = cell.y
        this._changeCurrent(cell)
        this._changeOthers(selectedX, selectedY)
        
    }
    _changeCurrent(cell){
        console.log('点击cell：', cell)
        if(cell.status == 'selected'){
            this.skuPending.deleteItem(cell.x)
            this.fenceGroup.fences[cell.x].cells[cell.y].status = 'waiting'
        }else{
            this.fenceGroup.fences[cell.x].cells[cell.y].status = 'selected'
            this.skuPending.insertItem(cell.x, this.fenceGroup.fences[cell.x].cells[cell.y])
        }
    }

    isIntactPending(){
        for(let cell of this.skuPending.pending){
            if(!cell) return false
        }
        return true
    }

    isEmpty(){
        for(let cell of this.skuPending.pending){
            if(cell) return false
        }
        return true
    }

    getDeterminateSku(){
        if(this.isIntactPending()){
            let finalCode = this.fenceGroup.spu.id + '$'
            let Determinate_sku 
            this.skuPending.pending.forEach(cell=>{
                finalCode += cell.cell_code + '#'
            })
            finalCode = finalCode.substr(0, finalCode.length - 1)
            this.fenceGroup.skuList.forEach(sku=>{
                if(sku.code == finalCode){
                    Determinate_sku = sku
                }
            })
            return Determinate_sku
        }
        return null
    }

    _changeOthers(selectedX, selectedY){
        for(let i = 0 ; i < this.fenceGroup.fences.length; i++){
            for(let j = 0 ; j < this.fenceGroup.fences[0].cells.length; j++){
                let cell = this.fenceGroup.fences[i].cells[j]
                // 如果是当前点击的cell，不改变状态
                if(i == selectedX && j == selectedY){
                    continue
                }
                // 如果是与当前点击的cell非同一规格，并且之前被选择了，也不改变状态
                if( this.skuPending.inPending(cell.cell_code)){
                    continue
                }
                // 其他cell的状态改变
                let path = this.skuPending.getPath(cell, i)
                if(this.pathDict.includes(path)){
                    this.fenceGroup.fences[i].cells[j].status = 'waiting'
                }else{
                    this.fenceGroup.fences[i].cells[j].status = 'forbidden'
                }
            }
        }
    }
}

module.exports = Judger