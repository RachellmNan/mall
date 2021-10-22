const { transpose } = require("../../utils/util");
const Cell = require("../models/cell");
const FenceGroup = require("../models/fence-group");
const Judger = require("../models/judger");

// components/realm/index.js
Component({
    properties: {
        spu:{
            type:Object,
            value: {}
        },
        mark: String
    },

    observers:{
        'spu':function(spu) {
            let fenceGroup = new FenceGroup(spu)
            let judger = new Judger(fenceGroup)
            this.setData({
                judger
            })
            console.log('judeger: ', judger)
            if(spu.default_sku_id){
                let selectedSku
                for(let item of spu.sku_list){
                    if(item.id == spu.default_sku_id){
                        selectedSku = item
                    }
                }
                console.log('selected_sku: ', selectedSku)
                this.bindSku(selectedSku)
                this.initSkuPending(selectedSku)
                this.changeTip()
                this.initChangeStatus()
            }else{
                this.bindSpu(spu)
                this.changeTip()
            }
        }
    },
    // 无规格
    // 有规格--无默认规格
    // 有规格--有默认规格

    data: {
        tip:'',
        isIntact: false,
        selectedSku: null
    },

    methods: {
        bindSpu(spu){
            this.setData({
                img: spu.img,
                price: spu.price,
                disprice: spu.discount_price,
                stock: null,
                title: spu.title
            })
        },
        bindSku(sku){
            this.setData({
                img: sku.img,
                price: sku.price,
                disprice: sku.discount_price,
                stock: sku.stock,
                title: sku.title
            })
        },
        onCell(event){
            let cell = event.detail.cell
            this.data.judger.onJudge(cell)
            let selectedSku = this.data.judger.getDeterminateSku()
            if(selectedSku){
                this.bindSku(selectedSku)
            }
            this.changeTip()
            console.log('judger: ', this.data.judger)
            console.log('selectedSku: ', selectedSku)
            this.setData({
                judger: this.data.judger
            })
        },
        changeTip(){
            let tipbox = []
            let isIntact = this.data.isIntact
            if(this.data.judger.isIntactPending()){
                this.data.judger.skuPending.pending.forEach(cell => {
                    tipbox.push(cell.value)
                });
                isIntact = true
            }else{
                isIntact = false
                for(let i = 0 ; i < this.data.judger.skuPending.pending.length; i++){
                    if(!this.data.judger.skuPending.pending[i]){
                        tipbox.push(this.data.judger.fenceGroup.fences[i].key)
                    }
                }
            }
            console.log('tipBox: ', tipbox)
            this.setData({
                tip: tipbox.join(),
                isIntact
            })
        },
        initSkuPending(selectedSku){
            selectedSku.specs.forEach((spec, x)=>{
                // cell
                // cell_code
                // y
                let cell = new Cell(spec)
                cell.status = 'selected'
                cell.x = x
                for(let i = 0 ; i < this.data.judger.fenceGroup.fences[x].cells.length; i++){
                    if(spec.value == this.data.judger.fenceGroup.fences[x].cells[i].value){
                        cell.y = i
                    }
                }
                this.data.judger.skuPending.insertItem(x, cell)
            })
            console.log('默认sku的pending',this.data.judger)
        },
        initChangeStatus(){
            this.data.judger.fenceGroup.fences.forEach((fence,x)=>{
                fence.cells.forEach(cell=>{
                    if(cell.value == this.data.judger.skuPending.pending[x].value){
                        cell.status = 'selected'
                    }
                })
            })
            this.setData({
                judger: this.data.judger
            })
        }
    },
    lifetimes:{
        attached(){
            
        }
        
    }
})