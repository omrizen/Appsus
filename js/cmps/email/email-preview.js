import utilService from '../../services/util.service.js'
// import emailService from '../../services/email.service.js'

export default {
    props: { email: { type: Object, required: true } },
    
    data(){
        return {
        //   isRead: this.email.statusRead,
        }
    },
    computed : {
        isRead (){
            console.log (this.email.statusRead); 
           return this.email.statusRead

        }
    },

    template: `
        <section class="email-preview" >
            <div :class="isRead"   >
                <h1>From:{{email.from}}</h1>
                <p>{{email.content}}</p>
                <p>{{email.time}}</p>
            </div>
           
        </section>
    `,
};