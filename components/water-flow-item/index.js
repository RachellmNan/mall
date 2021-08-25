Component({
    properties: {
        img: String,
        price: String,
        title: String,
        desc: String,
        tags: String
    },
    observers:{
        'tags':function(tags){
            console.log('list length: ', this.data.list.length)
            console.log('tags: ',tags)
            this.setData({
                list: tags.split('$')
            })
        }
    },
    data: {
        list:[]
    },
    methods: {}
})