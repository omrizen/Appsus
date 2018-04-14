/* */
import router from './routes.js'
import userMsg from './cmps/user-msg.js'
import navBar from './cmps/nav-bar.js'


new Vue({
    el: '#app',
    router,
    components: {
      userMsg,
      navBar
    }
  })


