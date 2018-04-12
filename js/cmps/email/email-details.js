import utilService from '../../services/util.service.js'
import emailService from '../../services/book.service.js'


export default {
    props: {email:{type: Object, required: true}},
   

    
    created (){
        this.email.read = true;
        console.log ('this.email.statusRead',this.email.statusRead);

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
            this.$emit('deleteEmail' , this.email.id);
        },
    },
    template: `
        <section class="email-details">
                    <h1> Subject: {{email.subject}} </h1>
                    <h1> From:  {{email.from}}</h1>
                    <div>  {{email.sentTime}}</div>
                    <p>{{email.content}}</p>
                    <button @click="close">x</button>
                    <button @click="close(); deleteEmail();" >delete</button>
        </section>
            `,
    components: {
        
    }
            
};