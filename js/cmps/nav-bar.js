



export default {
    created() {
       
  document.addEventListener('DOMContentLoaded', function () {

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {
  
          // Get the target from the "data-target" attribute
          var target = $el.dataset.target;
          var $target = document.getElementById(target);
  
          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });
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
        
        <nav class="navbar is-light nav-wrapper" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Logo" width="112" height="15">
    </a>
    <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
</a>
</div>

<!-- <div class="navbar-burger" >
  <span></span>
  <span></span>
  <span></span>
</div> -->

  <div id="navMenu" class="nav-center navbar-menu">
    <div class="navbar-start">
    <router-link exact to="/">
      <a class="navbar-item is-hoverable" >
        Home
      </a></router-link>
    <router-link exact to="/misterEmail">
      <a class="navbar-item is-hoverable" >
      MisterEmail
      </a></router-link>
    <router-link exact to="/misterPlace">
      <a class="navbar-item is-hoverable" >
      MisterPlace
      </a></router-link>
    <router-link exact to="/misterKeeper">
      <a class="navbar-item is-hoverable"  >
      MisterKeeper
      </a></router-link>
    
    </div>

    <div class="navbar-end">
      
    </div>
    
  </div>
</nav>

    </section>`,
    
}