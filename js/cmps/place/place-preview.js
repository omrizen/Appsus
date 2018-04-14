import placeService from '../../services/place.service.js'
import eventBus, {DEL_PLACE,ADD_TEMP_PLACE} from '../../services/event-bus.service.js'

export default {
    props: {place:{type: Object, required: true}},
    computed: {
        // currencyIcon(){
        //     return utilService.getCurrency(this.book.listPrice.currencyCode);
        // }
    },
    data() {
        return {
            active: false

            // filter: null,
        }
    },
    methods:{
        emitDel(){
            // console.log('place-preview',this.place.id)
            // this.$emit('delEvent',this.place.id)
            eventBus.$emit(DEL_PLACE, this.place.id);
        },
        emitAddPlace(){
            console.log('trying to emit add temp place');
            eventBus.$emit(ADD_TEMP_PLACE, this.place.id);
            
        },
        mouseOver() {
            this.active = true;   
          
        },
        mouseOut(){
          this.active=false;
        }
    },
    template: `
        <section class="" @mouseover="mouseOver" @mouseleave="mouseOut">
            <!-- <img :src="book.thumbnail" :alt="book.name" :title="book.name" /> -->
            
            <span><i class="fas fa-map-marker-alt"></i><span class="place-name">{{place.name}}</span></span>
        <div class="place-controllers">
            <span v-show="active" >
                <button class="btn-clear trash map-controller-buttons"  @click.stop="emitDel"><i class="far fa-trash-alt"></i></button>
            </span>
            <button class="btn-clear map-controller-buttons" v-if="place.temp" @click.stop="emitAddPlace"><i class="fas fa-plus"></i></button>
            </div>
        </section>
    `,   
}