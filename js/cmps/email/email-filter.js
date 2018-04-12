export default {
    // created(){
    //     this.emitFilter();
    // },
    data() {
        return {
            filter: { byContent: '', }
        }
    },
    methods: {
        emitFilter() {
            console.log('Emitting Filter!');
            console.log ('this.filter' , this.filter );
            this.$emit('filtered', this.filter);
        }
    },
    template: `
        
        <section class="container email-filter">
            <h1>Filtering</h1>
            <button class="clear-btn filter-btn">Filter </button>
            <label>
                By content
                <input type="text" v-model="filter.byContent" @input="emitFilter" />
            </label>
        </section>
            `
}
