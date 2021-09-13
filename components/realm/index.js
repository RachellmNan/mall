const { Spu } = require("../../models/Spu")
const { Cell } = require("../models/cell")
const { FenceGroup } = require("../models/fence-group")
const { Judger } = require("../models/judger")

// components/realm/index.js
Component({

    properties: {
        spu:Object,
        title: String
    },

    observers:{
        'spu': function(spu){
            if(Spu.isNoSpec(spu)){
                this.processNoSpec(spu)
            }else{
                this.processHasSpec(spu)
            }
        }
    },

    data: {
        fenceGroup: null,
        judger: null,
        noSpec: false,
        skuIntact: false,
        missingKeys:'',
        selectedValue:''
    },

    methods: {
        processNoSpec(sku){
            this.bindSkuData(sku.sku_list[0])
            this.setData({
                noSpec: true
            })
        },
        processHasSpec(spu){
            const fenceGroup = new FenceGroup(spu)
            fenceGroup.initFences()
            const defaultSku = fenceGroup.getDefaultSku()
            if(defaultSku){
                this.bindSkuData(defaultSku)
            }else{
                this.bindSpuData()
            }
            const judger = new Judger(fenceGroup)
            this.data.judger = judger
            const skuIntact = judger.isIntact()
            if(skuIntact){
                this.setData({
                    selectedValue: this.data.judger.getCurrentValue()
                })
            }
            this.setData({
                fenceGroup,
                skuIntact
            })
        },
        bindSpuData(){
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discount_price: spu.discount_price
            })
        },
        bindSkuData(sku){
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discount_price: sku.discount_price,
                stock: sku.stock
            })
        },
        onCell(event){
            const cell = new Cell(event.detail.cell.spec)
            cell.status = event.detail.cell.status
            const x = event.detail.x
            const y = event.detail.y
            this.data.judger.judge(cell,x,y)
            const skuIntact = this.data.judger.isIntact()
            this.setData({
                fenceGroup: this.data.judger.fenceGroup,
                skuIntact
            })
            const missIndex = this.data.judger.getMissingKeys()
            const missingKeys = []
            missIndex.forEach(i => {
                missingKeys.push(this.data.fenceGroup.fences[i].title)
            });
            this.setData({
                missingKeys: missingKeys.join()
            })
            if(skuIntact){
                const code = this.data.fenceGroup.spu.id + '$' + this.data.judger.skuPending.getSpecCode()
                const selectedSku =  this.data.fenceGroup.getSku(code)
                this.bindSkuData(selectedSku)
                this.setData({
                    selectedValue: this.data.judger.getCurrentValue()
                })
            }
        },
    },

    lifetimes:{

    }
})
