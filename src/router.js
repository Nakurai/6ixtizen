import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import LandingPage from './views/landing-page.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/index.html',
      component: Home,
      alias: '/'
    },
    {
      path: '/landing-page',
      component: LandingPage,
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   try {
//     // if the user is using our app, then the route is loaded normally
//     if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
//       next();
//     }
//     // if it is the browser version, then we display the landing page encouraging them to download the app
//     else {
//       if (to.path === "/landing-page") {
//         next();
//       }
//       else {
//         next('/landing-page');
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// })

export default router