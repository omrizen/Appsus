import placeService from '../../services/place.service.js'
import mapService from '../../services/map.service.js'

export default {
    template:`
    <section class="">
        <div class="search-bar-wrapper">
        <div class="search-bar">
        <form class="form-place-add" @submit.prevent="searchMarker">
            <label>
            <!-- <input id="add-address" v-gmaps-searchbox="place" type="text" v-model="place.name" > -->
            <input id="add-address" type="text"  @click="searchMarker">
            </label>
            <button class="btn-clear sub" type="submit" @click="searchMarker"><i class="fas fa-search"></i></button>
        </form>
        </div>
        </div>
    </section>
    `,
    data() {
        return {
            place: {name: '', id: null}
        }
    },
    created() {
        // const carId  = +this.$route.params.carId;
        // if (carId) {
        //     carService.getById(carId)
        //     .then(car=>{
        //         this.car = car
        //     })
        // }
    },
    methods: {
        saveCar() {
            console.log(this.car);
            carService.saveCar(this.car)
            .then(()=>{
                console.log('Saved!');
                this.$router.push('/car');
            })
        },
        searchMarker(){
            // console.log('place-add: ',this.place.name)
        //    console.log('place-add autocomplete',mapService.autoCompletePlace);
        }
    },
    // watch: {
    //     place:  {
    //         deep: true,
    //         handler() {
    //             console.log('change somthing')
    //             this.place.name = 'asas'
    //         }
    //     }
    //   }
}