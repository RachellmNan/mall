const { Cell } = require("../models/cell")
const { FenceGroup } = require("../models/fence-group")
const { Judger } = require("../models/judger")

// components/realm/index.js
Component({

    properties: {
        Spus:Object,
        title: String
    },

    observers:{
        'Spus': function(Spus){
            const fenceGroup = new FenceGroup(Spus)
            fenceGroup.initFences()
            console.log('fenceGroup: ', fenceGroup)
            const judger = new Judger(fenceGroup)
            this.data.judger = judger
            this.setData({
                fenceGroup
            })
        }
    },

    data: {
        fenceGroup: null,
        judger: null
    },

    methods: {
        onCell(event){
            const cell = new Cell(event.detail.cell.spec)
            cell.status = event.detail.cell.status
            const x = event.detail.x
            const y = event.detail.y
            this.data.judger.judge(cell,x,y)
            this.setData({
                fenceGroup: this.data.judger.fenceGroup
            })
        }
    },

    lifetimes:{

    }
})
