import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import PlacesPage from "./PlacesPage";
Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/places', name: 'Places', component: PlacesPage },
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
