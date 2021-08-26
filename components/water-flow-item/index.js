Component({
    properties: {
        img: String,
        price: String,
        title: String,
        desc: String,
        tags: String,
        spu_id: Number
    },

    data: {

    },
    methods: {
        onJump(e){
            const id =  e.currentTarget.dataset.id
            wx.navigateTo({
                url:`/pages/detail/index?id=${id}`
            })
        }
    }
})