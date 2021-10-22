class Cell{
    value
    value_id
    status = 'waiting'
    cell
    cell_code
    y
    constructor(cell){
        this.cell = cell
        this.cell_code = cell.key_id + '-' + cell.value_id
        this.value = cell.value
        this.value_id = cell.value_id
    }
}

module.exports = Cell