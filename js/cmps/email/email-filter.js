export default {
    // created(){
    //     this.emitFilter();
    // },
    data() {
        return {
            filter: { byContent: '',byRead: '' }
        }
    },
    created(){
        this.filter.byRead='all';
    },
    methods: {
        emitFilter() {
            console.log('Emitting Filter!');
            console.log ('this.filter' , this.filter );
            this.$emit('filtered', this.filter);
        },
        changedValue(event){
            this.filter.byRead = event.target.value;
            this.$emit('filtered', this.filter);
            // console.log ('event' , event.target.value);
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
            <div class="custom-select" style="width:200px;">
            <select @change="changedValue" >
                <option value="all">all:</option>
                <option value="read">read</option>
                <option value="unread">unread</option>
            </select>
            </div>
        </section>
            `
}
