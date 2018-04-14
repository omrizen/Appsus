import utilService from '../../services/util.service.js'
import emailService from '../../services/book.service.js'


export default {
    props: { email: { type: Object, required: true } },



    created() {
        this.email.read = true;
        console.log('this.email.statusRead', this.email.statusRead);

        // emailService.getById(this.email.id).
        //      then(email => {
        //          this.selectedEmail=email;
        //      }) 

    },


    methods: {
        close() {
            this.$emit('close');
        },
        deleteEmail() {
            this.$emit('deleteEmail', this.email.id);
        },
    },
    template: `
        <section class="email-details container">
                <div class="wrapper">
                    
                <h3 class="from"> <span>From:</span> {{email.from}}</h3>
                    <h2 class="subject" title=2;>  <span>subject:</span> {{email.subject}} </h2>
                    <p>{{email.content}}</p>
                    <br>
                    <button class="button is-text " @click="close(); deleteEmail();">Delete</button> <button class="button is-text" @click="close">Back</button>
                </div>
                    <!-- <button @click="close(); deleteEmail();" >delete</button> -->
        </section>
            `,
    components: {

    }

};