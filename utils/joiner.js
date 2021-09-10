class Joiner{
    str = ''
    cutNum 
    symbol = '-'
    constructor(symbol = '#', cutNum = 1){
        this.symbol = symbol
        this.cutNum = cutNum
    }
    join(params){
        this.str += params + this.symbol
    }
    getStr(){
        return this.str.substring(0, this.str.length - this.cutNum)
    }
}

module.exports = {
    Joiner
}