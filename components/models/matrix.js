class Matrix{
    constructor(matrix){
        this.m = matrix
    }
    get rowsNum(){
        return this.m.length
    }
    get colsNum(){
        return this.m[0].length
    }

    transpose(){
        const desArr = []
        for(let i = 0 ; i < this.colsNum; i++){
            desArr[i] = []
            for(let j = 0 ; j < this.rowsNum; j++){
                desArr[i][j] = this.m[j][i]
            }
        }
        return desArr
    }
}

module.exports = {
    Matrix
}