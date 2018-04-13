import utilService from '../../services/util.service.js'
// import emailService from '../../services/email.service.js'

export default {
    props: { email: { type: Object, required: true } },
    
    data(){
        return {
            
        }
    },
    computed : {
    },

    template: `
        <section class="email-preview" >
            <div :class="{read: email.read}">
                <h1>From:{{email.from}}</h1>
                <p>{{email.content}}</p>
                <p>{{email.time}}</p>
            </div>
           
        </section>
    `,
};