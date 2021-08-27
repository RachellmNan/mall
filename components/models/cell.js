class Cell{
    constructor(spec){
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }
}

module.exports = {
    Cell
}