import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
  masks: {
    input: "YYYY-MM-DD"
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
