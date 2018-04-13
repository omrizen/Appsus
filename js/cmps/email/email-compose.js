


export default {

    data() {
        return {
            to: '', 
            subject: '', 
            content: '',
            
        }
    },
    methods: {
        close(){
            this.$emit();
        }
    },
    template: `
        <section class="container email-compose">
            <h1>New message</h1>
            <form >
                    <label>
                        To:
                        <input type="text" v-model="to"/>
                    </label>
                    <label>
                        Subject:
                        <input type="text" v-model="subject" />
                    </label>
                    <label>
                    <textarea v-model="content" rows="10" cols="50"></textarea>
                    <button type="submit" @click="close">send</button>
                    <button @click="close"><button>


            </form>
    </section>
                `
}
    





