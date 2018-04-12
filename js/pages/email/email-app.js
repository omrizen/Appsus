import emailService from '../../services/email.service.js'
import emailFilter from '../../cmps/email/email-filter.js'
import emailList from '../../cmps/email/email-list.js'
import emailCompose from '../../cmps/email/email-compose.js'
import emailStatus from '../../cmps/email/email-status.js'
import emailDetails from '../../cmps/email/email-details.js'
// import userMsg from '../cmps/user-msg.js'
// import toggleBtn from '../cmps/toggle-btn.js'

import eventBus, {USR_MSG_DISPLAY} from '../../services/event-bus.service.js'

export default {
    created() {
        console.log ('created');
        // eventBus.$emit(USR_MSG_DISPLAY, {txt:'Going Home...',type:'success'});
        emailService.query()
            .then(emails =>{ 
                this.emails = emails
                console.log ('app' , emails);
            })
    },
        //   this.setFilter(this.filter);
        
    data(){
        return {
            emails: [], 
             filter: null,
             filteredEmails: null,
             selectedEmail: null,
            
             
        }
    },
    computed: {
        emailsToShow() {
            return  this.emails
        },
        composedEmail (){
            return true;
        }
    },
    methods: {
        selectEmail (id){
             emailService.getById(id).
             then(email => {
                 this.selectedEmail=email;
                 if (this.selectEmail.read ==false){
                    this.selectedEmail.read = 'true';
                    
                    console.log ('book transforms to read');



                 }
                 
                 
             }) 
        },
        closeEmail (){
            this.selectedEmail = null;
        },
        deleteEmail(id){
            emailService.deleteEmail()
            .then(res => {
                console.log(`email was deleted`);

            })
        },
        setFilter(filter) {
            this.filter=filter;
            emailService.query(this.filter)
            .then(emails => this.emails = emails)    
        },
        
        
    },
    template: `<section class="email-app">
                    <h1>email</h1>
                    <!-- <button @click="composeEmail"> compose </button> -->
                    <!-- <email-compose  v-if="composedEmail"></email-compose>  -->
                    <email-details v-if="selectedEmail" @deleteEmail="deleteEmail" :email="selectedEmail" @close="closeEmail"></email-details>
                    <email-filter v-if="!selectedEmail" @filtered="setFilter"></email-filter>
                    <email-list v-if="!selectedEmail" :emails="emailsToShow"  @selected="selectEmail"></email-list>
                    
                </section>`,
    components: {
        emailFilter,
        emailList,
        emailService,
        emailCompose,
        emailStatus, 
        emailDetails
    }
}