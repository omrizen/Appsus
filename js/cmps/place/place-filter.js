import placeService from '../../services/place.service.js'

export default {
    template:`
    <section class="place-filter flex wrap align-center">
        
            <input type="text" v-model="filter.str" @input="emitFilter" placeholder="Search Saved Places">
        
        <div class="place-filter-btns">
        <button class="btn-clear filter-btn" :class="{activeFilter: filter.byName}" @click="filterByName(true)">Name</button>
        <button class="btn-clear filter-btn" :class="{activeFilter: !filter.byName}" @click="filterByName(false)">Tags</button>
        </div>
    </section>
    `,
    data() {
        return {
            filter: {str: '',byName:true}
        }
    },
    methods : {
        emitFilter() {
            this.$emit('filtered', this.filter)
        },
        filterByName(yesorno) {
            this.filter.byName = yesorno;
            console.log('filer by name',this.filter.byName)
        },
    }
}