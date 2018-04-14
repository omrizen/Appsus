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
            else return moment().startOf('day').fromNow(); 
        },
        content(){
            return this.email.content.substring(0,115);
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
            <div class="email-contents" :class="{read: email.read}">
            <p class="time">{{time}} &nbsp&nbsp{{email.from}}</p> 
                <p class="subject"><b>{{email.subject}}</b></p>
                <p class="content">{{content}}</p>
                   
                <!-- <p>{{email.time}}</p> -->
            </div>
           
        </section>
    `,
}

