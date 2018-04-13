import placeService from '../../services/place.service.js'
import placePreview from './place-preview.js'
import eventBus, {USR_MSG_DISPLAY} from '../../services/event-bus.service.js'

export default {
    props: ['places'],
    template: `
        <section class="section places-list">
            <ul>
                <h2>places list</h2>
                <li class="place-preview" :class="{active: activeClass === idx}" v-bind:class="idx" @click="activeClass = idx;selected(place.id)" v-for="(place,idx) in places">
                <place-preview :place="place" @delEvent="deletePlace"></place-preview>
                <!-- <p>asas</p> -->
                </li>
    
            </ul>
            
        </section>
    `,
    data() {
        return {
            activeClass: '',
            // places:
        }
    },
    created() {
        console.log('place-list places',this.places)
        placeService.renderMarkers(this.places);
    },
    methods :{
        selected(placeId){
            console.log('clicked place',placeId);
            placeService.chosePlace(placeId)
            .then(res => {
                console.log('Marked Place');
               
                eventBus.$emit(USR_MSG_DISPLAY, {txt:'Marked Place',type:'success'});
            })
            .catch(err => {
                
                eventBus.$emit(USR_MSG_DISPLAY, {txt:'Place Was Not Marked',type:'fail'});
            })
        },
        deletePlace(placeId) {
            console.log('place-list got placeId:',placeId)
            placeService.deletePlace(placeId)
            .then(res => {
                console.log('Deleted Place');
                console.log('res is',res)
                this.places = res;
                eventBus.$emit(USR_MSG_DISPLAY, {txt:'Deleted Place',type:'success'});
            })
            .catch(err => {
                
                eventBus.$emit(USR_MSG_DISPLAY, {txt:'Place Was Not Deleted',type:'fail'});
            })
        }
    },
    components: {
        placePreview
    }
   
}