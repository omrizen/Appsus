import utilService from '../../services/util.service.js'
// import emailService from '../../services/email.service.js'

export default {
    props: { email: { type: Object, required: true } },
    
    computed : {
        time (){
            var emailDate = moment(this.email.sentTime).format("MM/DD/YYYY");
            if (emailDate === moment(Date.now()).format("MM/DD/YYYY")) {
                 return moment(this.email.sentTime).format('LT');  
            }
            else return emailDate;
        }  
          
        
    },
    methods : {
        //  displayTime (){
        //     if (this.time === moment(Date.now()).format("MM/DD/YYYY")) {
        //         this.time = moment(this.email.sentTime).format('LT');  
        //     }
        // } 

    },

    template: `
        <section class="email-preview" >
            <div :class="{read: email.read}">
                <p>{{time}}</p>
                <h1>From:{{email.from}}</h1>
                <h1>Subject:{{email.subject}}</h1>
                <p>{{email.content}}</p>
                <p>{{email.time}}</p>
            </div>
           
        </section>
    `,
}