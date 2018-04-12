import placeService from '../../services/place.service.js'
import placeFilter from '../../cmps/place/place-filter.js'
import placeList from '../../cmps/place/place-list.js'
import placeAdd from '../../cmps/place/place-add.js'

import mapService from '../../services/map.service.js'

// import placeDetails from '../pages/place-details.js'
// import userMsg from '../cmps/user-msg.js'
// import toggleBtn from '../cmps/toggle-btn.js'

import eventBus, {USR_MSG_DISPLAY} from '../../services/event-bus.service.js'

export default {
    created() {
        eventBus.$emit(USR_MSG_DISPLAY, {txt:'places',type:'success'});
        placeService.renderMap()
        .then(res => {
            placeService.query()
            .then(places => {this.places = places})
        })
        // placeService.getplaces()
        // .then(places => {
        //   this.places = places;
        //   this.setFilter(this.filter);
        // });
    },

    data(){
        return {
            places: null, 
            // filter: null,
        }
    },
    computed: {
        // placesToShow() {
        //     return this.filteredplaces;
        // }
      
    },
    methods: {
        setFilter(filter){
            placeService.query(filter)
            .then(places => this.places = places)
        }
    },
    template: `<section class="place-app">
                    <h1>place</h1>
                    <place-filter @filtered="setFilter"></place-filter>
                    <place-list v-if="places" :places="places"></place-list>
                    <place-add></place-add>
                    <div id="map" style="width: 100%; height: 50vh"></div>
                </section>`,
    components: {
        placeFilter,
        placeList,
        placeService,
        placeAdd,
    }
}