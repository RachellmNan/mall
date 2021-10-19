class Cell{
    value
    value_id
    status = 'waiting'
    constructor(cell){
        this.value = cell.value
        this.value_id = cell.value_id

    }
}

module.exports = Cell