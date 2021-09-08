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
            this.setData({
                fenceGroup
            })
        }
    },

    data: {
        fenceGroup: null
    },

    methods: {

    },

    lifetimes:{

    }
})
