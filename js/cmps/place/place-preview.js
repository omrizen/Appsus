export default {
    props: {place:{type: Object, required: true}},
    computed: {
        // currencyIcon(){
        //     return utilService.getCurrency(this.book.listPrice.currencyCode);
        // }
    },
    template: `
        <section class="section">
            <!-- <img :src="book.thumbnail" :alt="book.name" :title="book.name" /> -->
            <p>Id: {{place.id}}</p>
            <p>Name: {{place.name}}</p>
            <p>Tag: {{place.tag}}</p>
            
            <!-- <p> Price: {{book.listPrice.amount}} {{currencyIcon}}</p> -->
        </section>
    `,   
}