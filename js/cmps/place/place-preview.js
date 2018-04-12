import placeService from '../../services/place.service.js'


export default {
    props: {place:{type: Object, required: true}},
    computed: {
        // currencyIcon(){
        //     return utilService.getCurrency(this.book.listPrice.currencyCode);
        // }
    },
    methods:{
        emitDel(){
            console.log('book-preview',this.place.id)
            this.$emit('delEvent',this.place.id)
        }
    },
    template: `
        <section class="">
            <!-- <img :src="book.thumbnail" :alt="book.name" :title="book.name" /> -->
            <p>Id: {{place.id}}</p>
            <button @click="emitDel">Delete</button>
            <!-- <p>Name: {{place.name}}</p>
            <p>Tag: {{place.tag}}</p> -->
            
            <!-- <p> Price: {{book.listPrice.amount}} {{currencyIcon}}</p> -->
        </section>
    `,   
}