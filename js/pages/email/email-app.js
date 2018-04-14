import emailService from '../../services/email.service.js'
import emailFilter from '../../cmps/email/email-filter.js'
import emailList from '../../cmps/email/email-list.js'
import emailCompose from '../../cmps/email/email-compose.js'
import emailStatus from '../../cmps/email/email-status.js'
import emailDetails from '../../cmps/email/email-details.js'
// import userMsg from '../cmps/user-msg.js'
// import toggleBtn from '../cmps/toggle-btn.js'

import eventBus, { USR_MSG_DISPLAY } from '../../services/event-bus.service.js'

export default {
    created() {
        emailService.query(this.filter)
            .then(emails => {
                this.emails = emails
                console.log('app', emails);
            })

        console.log('created');
        // eventBus.$emit(USR_MSG_DISPLAY, {txt:'Going Home...',type:'success'});

    },
    //   this.setFilter(this.filter);

    data() {
        return {
            emails: [],
            filter: null,
            selectedEmail: null,
            composedEmail: false,
            isSortByDate: true //if it is false it will be by subject
        }
    },
    
    methods: {
        selectEmail(id) {
            console.log('id', id);
            emailService.getById(id)
                .then(email => {
                    this.selectedEmail = email;
                    console.log('this.selectedEmail.read', this.selectedEmail.read);
                    if (!this.selectedEmail.read) {
                        this.selectedEmail.read = true;
                        console.log('book transforms to read');
                        emailService.saveEmail(this.selectedEmail)
                            .then(() => this.getQuery());
                    }
                })
        },
        // selectEmail (id){
        //     console.log ('id', id);
        //      emailService.makeEmailRead(id).
        //      then(()=>this.getQuery());

        // },

        closeEmail() {
            this.selectedEmail = null;
        },
        
        deleteEmail(id) {
            emailService.deleteEmail()
                .then(res => {
                    console.log(`email was deleted`);
                })
        },
        saveEmail(email){
            emailService.saveEmail(email)
            .then(() => this.getQuery());
            
        },
        getQuery() {
            emailService.query(this.filter, this.isSortByDate)
                .then(emails => {
                    this.emails = emails
                    console.log('app', emails);
                })
        },
        setFilter(filter) {
            this.filter = filter;
            console.log('filternow', this.filter);
            this.getQuery();
        },

        sort(isSortByDate) {
            this.isSortByDate = isSortByDate;
            console.log('isSortbyDate', isSortByDate );
            this.getQuery();
        },
    },

    template: `<section class="email-app">
                    
                    <div v-if="!composedEmail"  class="flex sortAndFilter space-between align-center container" >
                         <p class="button is-small"  @click="composedEmail = true">Compose</p> 
                        <email-filter v-if="!selectedEmail" @filtered="setFilter"></email-filter>
                        <div class="email-sort flex space-between" v-if="!selectedEmail">     
                            <button   @click=sort(true)>sort by date</button>
                            <button  @click=sort(false)>sort by subject</button>
                        </div>
                    </div>  
                    <!-- <button>sort by title </button> -->
                    <!-- <button @click="composeEmail"> compose </button> -->
                    <email-compose @save="saveEmail"  @close="composedEmail=false" v-if="composedEmail"></email-compose> 
                    <email-details v-if="selectedEmail" @deleteEmail="deleteEmail" :email="selectedEmail" @close="closeEmail"></email-details>
                    <email-list v-if="!selectedEmail" :emails="emails"  @selected="selectEmail"></email-list>
                    
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