import utilService from '../../services/util.service.js'
// import emailService from '../../services/email.service.js'

export default {
    props: { email: { type: Object, required: true } },
    created () {
        console.log ((moment(this.email.sentTime).format("MM/DD/YYYY")));
        this.time = moment(this.email.sentTime).format("MM/DD/YYYY");
        this.displayTime();
        console.log ('momo')

    },
    data(){
        return {
            time: ''
            
        }
    },
    computed : {
          
        
    },
    method : {
         displayTime (){
            console.log ('this.time' ,this.time );
            if (this.time === moment(Date.now).format("MM/DD/YYYY")) {
                this.time = moment(this.email.sentTime.format).format('LT');  
            }
        } 

    },

    template: `
        <section class="email-preview" >
            <div :class="{read: email.read}">
                <p>{{time}}</p>
                <h1>From:{{email.from}}</h1>
                <p>{{email.content}}</p>
                <p>{{email.time}}</p>
            </div>
           
        </section>
    `,
};