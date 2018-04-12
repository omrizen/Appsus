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
        
        // selectEmail(){
        //     return 'stam select email';
        // }
        // selectedBook(){

        // }
      
    },
    methods: {
        selectEmail (id){
             emailService.getById(id).
             then(email => {
                 this.selectedEmail=email;
                 this.selectedEmail.statusRead = 'read';
                 
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
            emailService.query(filter)
            .then(emails => this.emails = emails)    
        }
    },
    template: `<section class="email-app">
                    <h1>email</h1>
                    <!-- <email-compose  v-if="!selectedBook"></email-compose>  -->
                    <email-details v-if="selectedEmail" @deleteEmail="deletekEmail" :email="selectedEmail" @close="closeEmail"></email-details>
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