import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import PlacesSearch from "./components/Places/PlacesSearch";
import store from './store'

Vue.use(VueRouter);

import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/places', name: 'Places', component: PlacesSearch },
  ]
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
