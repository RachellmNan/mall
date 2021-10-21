class Cell{
    value
    value_id
    status = 'waiting'
    cell
    constructor(cell){
        this.cell = cell
        this.value = cell.value
        this.value_id = cell.value_id

    }
}

module.exports = Cell