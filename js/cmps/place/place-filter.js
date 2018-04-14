import placeService from '../../services/place.service.js'

export default {
    template:`
    <section class="place-filter">
        <label> Filter:
            <input type="text" v-model="filter.byName" @input="emitFilter">
        </label>
    </section>
    `,
    data() {
        return {
            filter: {byName: ''}
        }
    },
    methods : {
        emitFilter() {
            this.$emit('filtered', this.filter)
        }
    }
}