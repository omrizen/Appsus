import home from './pages/home.js'
import about from './pages/about.js'
import email from './pages/email/email-app.js'
import place from './pages/place/place-app.js'
// import keeper from './pages/about.js'







const routes = [
    {path: '/', component: home},
    {path: '/about', component: about},
    {path: '/misterEmail', component: email},
    {path: '/misterPlace/:placeId?', component: place},

  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;