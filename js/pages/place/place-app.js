import placeService from '../../services/place.service.js'
import placeFilter from '../../cmps/place/place-filter.js'
import placeList from '../../cmps/place/place-list.js'
import placeAdd from '../../cmps/place/place-add.js'

import mapService from '../../services/map.service.js'


import eventBus, { USR_MSG_DISPLAY, DEL_PLACE, ADD_PLACE, ADD_TEMP_PLACE,UPDATE_PLACE } from '../../services/event-bus.service.js'


export default {
    created() {
        
        eventBus.$on(DEL_PLACE, placeId => {
            // console.log('placeId',placeId);
            placeService.deletePlace(placeId)
                .then(res => {
                    console.log('Deleted Place');
                    console.log('res is', res)
                    this.places = res;
                    eventBus.$emit(USR_MSG_DISPLAY, { txt: 'Deleted Place', type: 'success' });
                })
                .catch(err => {

                    eventBus.$emit(USR_MSG_DISPLAY, { txt: 'Place Was Not Deleted', type: 'fail' });
                })
        })

        eventBus.$on(ADD_PLACE, place => {
            // console.log('placeId',placeId);
            placeService.addPlace(place)
                .then(res => {
                    console.log('Added Place');
                    console.log('res is', res)
                    this.places = res;
                    eventBus.$emit(USR_MSG_DISPLAY, { txt: 'Added Place', type: 'success' });
                })
                .catch(err => {

                    eventBus.$emit(USR_MSG_DISPLAY, { txt: 'Place Was Not Added', type: 'fail' });
                })
        })
        eventBus.$on(ADD_TEMP_PLACE, place => {
            console.log(' place-app entered add temp place')
            placeService.addTempPlace()
                .then(res => {
                    console.log('Added Temp Place');
                    console.log('res is', res)
                    this.places = res;
                    // eventBus.$emit(USR_MSG_DISPLAY, { txt: 'Added Temp Place', type: 'success' });
                })
                .catch(err => {

                    // eventBus.$emit(USR_MSG_DISPLAY, { txt: 'Temp Place Was Not Added', type: 'fail' });
                })
        })
        eventBus.$on(UPDATE_PLACE, place => {
            console.log('place-app entered Update place',place)
            placeService.UpdatePlace(place)
                .then(res => {
                    console.log('Updated Place');
                    console.log('res is', res)
                    this.places = res;
                    eventBus.$emit(USR_MSG_DISPLAY, { txt: 'Updated Place', type: 'success' });
                })
                .catch(err => {

                    eventBus.$emit(USR_MSG_DISPLAY, { txt: 'Place Was Not Updated', type: 'fail' });
                })
        })

        placeService.renderMap()
            .then(res => {
                placeService.query()
                    .then(places => { this.places = places })
            })

        // placeService.getplaces()
        // .then(places => {
        //   this.places = places;
        //   this.setFilter(this.filter);
        // });
    },

    data() {
        return {
            places: [],

            // filter: null,
        }
    },
    computed: {
        // placesToShow() {
        //     return this.filteredplaces;
        // }

    },
    methods: {
        setFilter(filter) {
            placeService.query(filter)
                .then(places => {
                    console.log('place-app got query',places)
                    this.places = places}
                )
        }
    },
    template: `<section class="place-app">
    
            <div class="map-features">
                    <div class=" map-controller">
                        <place-filter @filtered="setFilter"></place-filter>
                        <transition name="slide-fade " :duration="2000">
        
                            <place-list v-if="places.length" :places="places"></place-list>
                        </transition>

                    </div>
            </div>
                     <div class=" map-features place-add-wrapper">
                            <place-add class="place-add"></place-add>
                     </div>
                    <div id="map" style="width: 100%; height: 100vh"></div>
                </section>`,
    components: {
        placeFilter,
        placeList,
        placeService,
        placeAdd,
    }
}