import emailService from '../../services/email.service.js'
import emailFilter from '../../cmps/email/email-filter.js'
import emailList from '../../cmps/email/email-list.js'
import emailAdd from '../../cmps/email/email-add.js'
import emailStatus from '../../cmps/email/email-status.js'
// import emailDetails from '../pages/email-details.js'
// import userMsg from '../cmps/user-msg.js'
// import toggleBtn from '../cmps/toggle-btn.js'

import eventBus, {USR_MSG_DISPLAY} from '../../services/event-bus.service.js'

export default {
    created() {
        eventBus.$emit(USR_MSG_DISPLAY, {txt:'Going Home...',type:'success'});
        // emailService.getEmails()
        // .then(emails => {
        //   this.emails = emails;
        //   this.setFilter(this.filter);
        // });
    },

    data(){
        return {
            // emails: [], 
            // filter: null,
        }
    },
    computed: {
        // emailsToShow() {
        //     return this.filteredemails;
        // }
      
    },
    methods: {
    },
    template: `<section class="email-app">
                    <h1>email</h1>
                </section>`,
    components: {
        emailFilter,
        emailList,
        emailService,
        emailAdd,
        emailStatus 
    }
}