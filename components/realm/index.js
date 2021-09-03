const { FenceGroup } = require("../models/fence-group")

// components/realm/index.js
Component({

    properties: {
        Spus:Object
    },

    observers:{
        'Spus': function(Spus){
            const fenceGroup = new FenceGroup(Spus)
            fenceGroup.initFences()
            
        }
    },

    data: {

    },

    methods: {

    },

    lifetimes:{

    }
})
