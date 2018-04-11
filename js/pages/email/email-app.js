import emailService from '../../services/email.service.js'
import emailFilter from '../../cmps/email/email-filter.js'
import emailList from '../../cmps/email/email-list.js'
import emailCompose from '../../cmps/email/email-compose.js'
import emailStatus from '../../cmps/email/email-status.js'
// import emailDetails from '../pages/email-details.js'
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
             selectedEmail: false
        }
    },
    computed: {
        emailsToShow() {
            return  this.filteredemails? this.filteredEmails: this.emails;
        },
        selectEmail(){
            return 'stam select email';
        }
        // selectedBook(){

        // }
      
    },
    methods: {
    },
    template: `<section class="email-app">
                    <h1>email</h1>
                    <!-- <email-compose  v-if="!selectedBook"></email-compose> 
                    <email-details v-if="selectedBook" :email="selectedBook" @close="closeBook"></email-details>
                    <email-filter v-if="!selectedBook" @filtered="setFilter"></email-filter> -->
                    <email-list v-if="!selectedEmail" :emails="emailsToShow"  @selected="selectEmail"></email-list>
                    
                </section>`,
    components: {
        emailFilter,
        emailList,
        emailService,
        emailCompose,
        emailStatus 
    }
}