import emailService from '../../services/email.service.js'
import emailPreview from './email-preview.js'

export default {
    props:{emails:{type: Array, required: true}},
    
    created (){
         console.log('emails in list', this.emails);
    },
    methods: {
        
        emitSelected(emailId) {
           
            this.$emit('selected',emailId);
        }
    },
    template: `
        <section class="container email-list">
            <ul>
                <li  v-for="email in emails">
                    <email-preview :email="email" @click.native="emitSelected(email.id)"></email-preview>
                </li>
            </ul>
        </section>
        `,
    components: {
        emailPreview
    }
};