import emailsService  from '../services/email.service.js'
import eventBus, {USR_MSG_DISPLAY} from '../services/event-bus.service.js'


export default {
    
    data(){
        return {
           msg: null
        }
    },
    created() {
        eventBus.$on(USR_MSG_DISPLAY, msg => {
            this.msg = msg;
            setTimeout(this.closeMsg, 2000);
        })
        
    },
    computed:{
        msgType() {
            return {
                    success: this.msg.type === 'success',
                    error: this.msg.type === 'fail'
                };
        }
    },
    methods:{
        closeMsg(){
            this.msg = null;
        }
    },
    template: `
        <section v-if="msg" class="user-msg email" :class="msgType">
            <p>{{msg.txt}}</p>
        </section>
    `,
}