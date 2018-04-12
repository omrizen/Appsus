import placeService from '../../services/place.service.js'

export default {
    template:`
    <section class="car-filter">
        <label> Filter:
            <input type="text" v-model="filter.byVendor" @input="emitFilter">
        </label>
    </section>
    `,
    data() {
        return {
            filter: {byVendor: ''}
        }
    },
    methods : {
        emitFilter() {
            this.$emit('filtered', this.filter)
        }
    }
}