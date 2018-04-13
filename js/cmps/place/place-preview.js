import placeService from '../../services/place.service.js'
import eventBus, {DEL_PLACE} from '../../services/event-bus.service.js'

export default {
    props: {place:{type: Object, required: true}},
    computed: {
        // currencyIcon(){
        //     return utilService.getCurrency(this.book.listPrice.currencyCode);
        // }
    },
    methods:{
        emitDel(){
            // console.log('place-preview',this.place.id)
            // this.$emit('delEvent',this.place.id)
            eventBus.$emit(DEL_PLACE, this.place.id);
        }
    },
    template: `
        <section class="">
            <!-- <img :src="book.thumbnail" :alt="book.name" :title="book.name" /> -->
            <p>Id: {{place.id}}</p>
            <button @click.stop="emitDel">Delete</button>
            <!-- <p>Name: {{place.name}}</p>
            <p>Tag: {{place.tag}}</p> -->
            
            <!-- <p> Price: {{book.listPrice.amount}} {{currencyIcon}}</p> -->
        </section>
    `,   
}