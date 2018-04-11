



export default {
    created() {
        // emailService.getEmails()
        // .then(emails => {
        //   this.emails = emails;
        //   this.setFilter(this.filter);
        // });
    },

    data() {
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
    template: `<section class="nav-bar">
        <router-link exact to="/">Home</router-link>
        <router-link to="/misterEmail">MisterEmail</router-link>
        <router-link to="/misterPlace">MisterPlace</router-link>
        <router-link to="/misterKeeper">MisterKeeper</router-link>
        <router-link to="/about">About</router-link>

    </section>`,
    
}