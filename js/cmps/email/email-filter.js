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
        <section class="email-filter">
        <div class="flex ">
            
            <div class="custom-select">
            <select @change="changedValue" >
                <option value="all">all</option>
                <option value="read">read</option>
                <option value="unread">unread</option>
            </select>
            </div>
            <label>
                <input type="text" v-model="filter.byContent" @input="emitFilter" placeholder="search"/>
            </label>
            </div>
        </section>
            `
}
