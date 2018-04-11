import utilService from '../../services/util.service.js'

export default {
    props: { email: { type: Object, required: true } },
    computed: {

    },
    template: `
        <section class="email-preview">
           
                
                <h1>{{email.from}}</h1>
                <p>{{email.content}}</p>
                <p>{{email.time}}</p>
           
        </section>
    `,
};