


export default {

    data() {
        return {
            email: {
                to: '',
                subject: '',
                content: '',
            }
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        save() {
            this.$emit('save', this.email);
        }

    },
    template: `
        <section class="container email-compose">
            <form >
                <div class="field">
                    <label class="label">To</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input"  type="email" placeholder="Email input" value="hello@" v-model="email.to">
                        <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                        </span>
                    </div>
                    <!-- <p class="help is-danger">This email is invalid</p> -->
                </div>

                <div class="field">
                    <label class="label">Subject</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Text input" v-model="email.subject">
                    </div>
                </div>
                        

                <div class="field">
                    <label class="label">Message</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Text area"  v-model="email.content"></textarea>
                    </div>
                </div>
                
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" type="submit" @click="close(); save();">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-text" @click="close">Cancel</button>
                    </div>
                </div>
            </form>
    </section>
                `
}






