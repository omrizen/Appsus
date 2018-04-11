import placeService from '../../services/place.service.js'
import placeFilter from '../../cmps/place/place-filter.js'
import placeList from '../../cmps/place/place-list.js'
import placeAdd from '../../cmps/place/place-add.js'

// import placeDetails from '../pages/place-details.js'
// import userMsg from '../cmps/user-msg.js'
// import toggleBtn from '../cmps/toggle-btn.js'

import eventBus, {USR_MSG_DISPLAY} from '../../services/event-bus.service.js'

export default {
    created() {
        eventBus.$emit(USR_MSG_DISPLAY, {txt:'places',type:'success'});
        // placeService.getplaces()
        // .then(places => {
        //   this.places = places;
        //   this.setFilter(this.filter);
        // });
    },

    data(){
        return {
            // places: [], 
            // filter: null,
        }
    },
    computed: {
        // placesToShow() {
        //     return this.filteredplaces;
        // }
      
    },
    methods: {
    },
    template: `<section class="place-app">
                    <h1>place</h1>
                </section>`,
    components: {
        placeFilter,
        placeList,
        placeService,
        placeAdd,
    }
}