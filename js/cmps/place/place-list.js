import placeService from '../../services/place.service.js'
import placePreview from './place-preview.js'

export default {
    props: ['places'],
    template: `
        <section class="section places-list">
            <ul>
                <h2>places list</h2>
                <li class="place-preview" v-for="(place,idx) in places">
                <place-preview :place="place" v-for="" @click.native="emitSelected(idx)"></place-preview>
                </li>
    
            </ul>
            
        </section>
    `,
    data() {
        return {
        }
    },
    created() {
        console.log('place-list places',this.places)
        placeService.renderMarkers(this.places);
    },
    components: {
        placePreview
    }
   
}